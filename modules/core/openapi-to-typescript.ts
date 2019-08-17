import * as t from "io-ts-codegen";
import { ok } from "assert";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { pascalCase, paramCase } from "change-case";
import { sync as mkdirPSync } from "mkdirp";
import { sync as rimrafSync } from "rimraf";

interface StringSchema {
  type: "string";
}

interface NullSchema {
  type: "null";
}

interface NumberSchema {
  type: "number";
}

interface IntegerSchema {
  type: "integer";
}

interface BooleanSchema {
  type: "boolean";
}

interface ArraySchema {
  type: "array";
  items: JSONSchema;
  minItems?: number;
  uniqueItems?: boolean;
}

interface SchemaReference {
  $ref: string;
}

interface ObjectSchema {
  additionalProperties?: boolean;
  type: "object";
  properties: { [key: string]: JSONSchema };
  required?: Array<string>;
}

interface UnionType {
  type: string[];
}

type JSONSchema = UnionType | NullSchema | ArraySchema | StringSchema | NumberSchema | BooleanSchema | IntegerSchema | ObjectSchema | SchemaReference;

type OpenAPISchema = {
  definitions: {
    [key: string]: JSONSchema
  }
};

type ReferenceMap = {
  [key: string]: t.TypeReference
};

type DependencyMap = {
  [key: string]: string[]
};

type AddDependency = (dependency: string) => void;

type GetReferenced = (reference: SchemaReference, addDependency: AddDependency) => t.TypeReference;

function getRequiredProperties(schema: ObjectSchema): { [key: string]: true } {
  const required: { [key: string]: true } = {};
  if (schema.required) {
    schema.required.forEach(function(k) {
      required[k] = true;
    });
  }
  return required;
}

function toTypeCombinator(name: string, schema: ObjectSchema, getReferenced: GetReferenced, addDependency: AddDependency): t.Combinator {
  const required = getRequiredProperties(schema);
  return t.typeCombinator(
    Object.keys(schema.properties || {}).map(key => {
      const propertyType = to(`${name}_properties_${key}`, schema.properties[key], getReferenced, addDependency);
      return t.property(key, propertyType, !required.hasOwnProperty(key) || propertyType.kind === "BooleanType");
    }),
    pascalCase(name)
  );
}

function toArrayCombinator(name: string, schema: ArraySchema, getReferenced: GetReferenced, addDependency: AddDependency): t.Combinator {
  return t.arrayCombinator(to(`${name}_items`, schema.items, getReferenced, addDependency));
}

function isReference(schema: JSONSchema): schema is SchemaReference {
  return schema.hasOwnProperty("$ref");
}

export function to(name: string, schema: JSONSchema, getReferenced: GetReferenced, addDependency: AddDependency): t.TypeReference {
  if (isReference(schema)) {
    return getReferenced(schema, addDependency);
  }
  if (Array.isArray(schema)) {
    return t.unionCombinator(schema.map(value => to(name, value, getReferenced, addDependency)));
  }
  if (!schema.type && (schema.hasOwnProperty("additionalProperties") || schema.hasOwnProperty("properties"))) {
    return to(
      name,
      {
        type: "object",
        ...schema
      },
      getReferenced,
      addDependency
    );
  }
  if (!schema.type && schema.hasOwnProperty("items")) {
    return t.unionCombinator((schema as any).items.map(item => to(
      `${name}_item`,
      item,
      getReferenced,
      addDependency
    )), name);
  }
  if (Array.isArray(schema.type)) {
    return t.unionCombinator(schema.type.map(type => to(
      `${name}:${type}`,
      {
        ...(schema as any),
        type
      },
      getReferenced,
      addDependency
    )));
  }
  switch (schema.type) {
    case "null":
      return t.nullType;
    case "string":
      return t.stringType;
    case "integer":
      return t.unionCombinator([t.stringType, t.identifier("t.Int")]);
    case "number":
      return t.numberType;
    case "boolean":
      return t.booleanType;
    case "array":
      return toArrayCombinator(name, schema, getReferenced, addDependency);
    case "object":
      return toTypeCombinator(name, schema, getReferenced, addDependency);
  }
}

function fixSchemaInline(schema: any) {
  if (typeof schema.definitions.defs_pinned_info.additionalProperties === "object") {
    schema.definitions.defs_pinned_info = {
      ...schema.definitions.defs_pinned_info,
      ...schema.definitions.defs_pinned_info.additionalProperties
    };
  }
  if (Object.keys(schema.definitions.objs_comments.items).length === 0) {
    schema.definitions.objs_comments.items = {
      $ref: "#/definitions/objs_comment"
    };
  }
  if (schema.definitions.objs_channel.required.includes("name_normalized")) {
    const index = schema.definitions.objs_channel.required.indexOf("name_normalized");
    schema.definitions.objs_channel.required.splice(index, 1);
  }
}

function getPrefix(value: string): [string, string] {
  if (value.startsWith("defs_")) {
    return ["defs_", "Definitions."];
  }
  if (value.startsWith("objs_")) {
    return ["objs_", "Objects."];
  }
  return ["", ""];
}

function getName(reference: string): string {
  const split = reference.split("/");
  ok(split[0] === "#");
  ok(split[1] === "definitions");
  ok(typeof split[2] === "string");
  const prefix = getPrefix(split[2]);
  let typeName = pascalCase(split[2].substr(prefix[0].length));
  if (prefix[1] === "Definitions." && ["Channel", "Team"].includes(typeName)) {
    typeName = `${typeName}Reference`;
  }
  return `${prefix[1]}${typeName}`;
}

export function generate(directory: string, schema: OpenAPISchema) {
  fixSchemaInline(schema);
  const referenceMap: ReferenceMap = {};
  const dependencyMap: DependencyMap = {};

  function getReferenced(reference: SchemaReference, addDependency: AddDependency, returnType: boolean = false): t.TypeReference {
    if (referenceMap[reference.$ref]) {
      if (returnType) {
        return referenceMap[reference.$ref];
      }
      addDependency(reference.$ref);
      return t.identifier(getName(reference.$ref));
    }
    // Must be like #/definitions/defs_user_id
    const split = reference.$ref.split("/");
    ok(split[0] === "#");
    ok(split[1] === "definitions");
    ok(typeof split[2] === "string");
    const found = schema.definitions[split[2]];
    if (!found) {
      throw new Error(`Could not find ${reference.$ref}`);
    }
    const name = getName(reference.$ref);
    dependencyMap[name] = [];
    referenceMap[reference.$ref] = to(reference.$ref, found, getReferenced, dependency => {
      if (dependency === reference.$ref) {
        return;
      }
      dependencyMap[name].push(getName(dependency));
    });
    return getReferenced(reference, addDependency, returnType);
  }

  const allTypes = Object.keys(schema.definitions)
    .map(key => {
      const reference = `#/definitions/${key}`;
      const name = getName(reference);
      const splitName = name.split(".");
      const namespace = splitName.length === 2 ? splitName[0] : "";
      const typeName = splitName[splitName.length - 1];
      return {
        namespace,
        typeName,
        name,
        type: getReferenced({ $ref: reference }, () => {}, true)
      };
    });

  function getFile(fileName: string, fileNamespace: string, typeName: string, file: string): string {

    const imports = [
      `import * as t from "io-ts";`
    ];

    const namespaces: Record<string, string[]> = allTypes
      .filter(({ name }) => dependencyMap[fileName].includes(name))
      .map(({ name }) => name)
      .filter(name => file.includes(name))
      .reduce(
        (map: Record<string, string[]>, name: string) => {
          const split = name.split(".");
          const namespace = split.length === 2 ? split[0] : "";
          return {
            ...map,
            [namespace]: (map[namespace] || []).concat(split[split.length - 1])
          };
        },
        {}
      );

    let resultType: string = file.replace(/'([^']+)'/g, `"$1"`);

    Object.keys(namespaces)
      .forEach((namespace) => {
        if (namespace === fileNamespace) {
          namespaces[namespace]
            .forEach(name => {
              if (namespace) {
                const toReplace = `${namespace}.${name}`;
                while (resultType.includes(toReplace)) {
                  resultType = resultType.replace(toReplace, name);
                }
              }
              imports.push(`import { ${name} } from "./${paramCase(name)}";`);
            });
        } else if (namespace) {
          imports.push(`import * as ${pascalCase(namespace)} from "../${paramCase(namespace)}";`);
        } else {
          namespaces[namespace]
            .forEach(name => {
              imports.push(`import { ${name} } from "../${paramCase(name)}";`);
            });
        }
      });

    return imports.concat([
      ``,
      `export const ${typeName} = ${resultType};`
    ]).join("\n");
  }

  // Blast the entire directory
  rimrafSync(directory);

  // Write each types file
  allTypes
    .forEach(({ name, namespace, typeName, type }) => {
      const runtime = t.printRuntime(type);
      let path = directory;
      if (namespace !== "") {
        path = `${directory}/${paramCase(namespace)}`;
      }
      mkdirPSync(path);
      const file = getFile(name, namespace, typeName, runtime);
      writeFileSync(`${path}/${paramCase(typeName) + ".ts"}`, file, "utf-8");
    });

  allTypes.map(
    ({ namespace }) => namespace
  )
    .filter((namespace, index, array) => {
      const before = array.slice(0, index);
      return !before.includes(namespace);
    })
    .forEach(
      (namespace, namespaceIndex, namespaces) => {

        const index = allTypes
          .filter(({ namespace: other }) => other === namespace)
          .map(({ typeName }) => `export * from "./${paramCase(typeName)}";`)
          .concat(
            namespace === "" ? [
              namespaces.filter(value => value).map(value => `export * from "./${paramCase(value)}";`).join("\n")
            ] : []
          )
          .join("\n") + "\n";

        let path = directory;
        if (namespace !== "") {
          path = `${directory}/${paramCase(namespace)}`;
        }
        writeFileSync(`${path}/index.ts`, index, "utf-8");
      }
    );

}

if (!existsSync("./slack_web_openapi_v2.json")) {
  console.log("./slack_web_openapi_v2.json does not exist, please download this from https://raw.githubusercontent.com/slackapi/slack-api-specs/master/web-api/slack_web_openapi_v2.json");
  process.exit(1);
}

const json = readFileSync("./slack_web_openapi_v2.json", "utf-8");

generate("./src/slack--web-openapi.v2", JSON.parse(json));



