"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var t = require("io-ts-codegen");
var assert_1 = require("assert");
var fs_1 = require("fs");
var change_case_1 = require("change-case");
var mkdirp_1 = require("mkdirp");
function getRequiredProperties(schema) {
    var required = {};
    if (schema.required) {
        schema.required.forEach(function (k) {
            required[k] = true;
        });
    }
    return required;
}
function toTypeCombinator(name, schema, getReferenced) {
    var required = getRequiredProperties(schema);
    var type = t.typeCombinator(Object.keys(schema.properties || {}).map(function (key) {
        return t.property(key, to(name + ":properties:" + key, schema.properties[key], getReferenced), !required.hasOwnProperty(key));
    }));
    if (schema.additionalProperties !== false) {
        return type;
    }
    return t.exactCombinator(type);
}
function toArrayCombinator(name, schema, getReferenced) {
    return t.arrayCombinator(to(name + ":items", schema.items, getReferenced));
}
function isReference(schema) {
    return schema.hasOwnProperty("$ref");
}
function to(name, schema, getReferenced) {
    if (isReference(schema)) {
        return getReferenced(schema);
    }
    if (Array.isArray(schema)) {
        return t.unionCombinator(schema.map(function (value) { return to(name, value, getReferenced); }));
    }
    if (!schema.type && (schema.hasOwnProperty("additionalProperties") || schema.hasOwnProperty("properties"))) {
        return to(name, __assign({ type: "object" }, schema), getReferenced);
    }
    if (!schema.type && schema.hasOwnProperty("items")) {
        return to(name, __assign({ type: "array" }, schema), getReferenced);
    }
    if (Array.isArray(schema.type)) {
        return t.unionCombinator(schema.type.map(function (type) { return to(name + ":" + type, __assign({}, schema, { type: type }), getReferenced); }));
    }
    switch (schema.type) {
        case "null":
            return t.nullType;
        case "string":
            return t.stringType;
        case "integer":
            return t.identifier("t.Int");
        case "number":
            return t.numberType;
        case "boolean":
            return t.booleanType;
        case "array":
            return toArrayCombinator(name, schema, getReferenced);
        case "object":
            return toTypeCombinator(name, schema, getReferenced);
    }
    console.log(name, JSON.stringify(schema));
}
exports.to = to;
function fixSchemaInline(schema) {
    if (typeof schema.definitions.defs_pinned_info.additionalProperties === "object") {
        schema.definitions.defs_pinned_info = __assign({}, schema.definitions.defs_pinned_info, schema.definitions.defs_pinned_info.additionalProperties);
    }
    if (Object.keys(schema.definitions.objs_comments.items).length === 0) {
        schema.definitions.objs_comments.items = {
            $ref: "#/definitions/objs_comment"
        };
    }
}
function getPrefix(value) {
    if (value.startsWith("defs_")) {
        return ["defs_", "Definitions."];
    }
    if (value.startsWith("objs_")) {
        return ["objs_", "Objects."];
    }
    return ["", ""];
}
function getName(reference) {
    var split = reference.split("/");
    assert_1.ok(split[0] === "#");
    assert_1.ok(split[1] === "definitions");
    assert_1.ok(typeof split[2] === "string");
    var prefix = getPrefix(split[2]);
    return "" + prefix[1] + change_case_1.pascalCase(split[2].substr(prefix[0].length));
}
function generate(directory, schema) {
    fixSchemaInline(schema);
    var referenceMap = {};
    function getReferenced(reference, returnType) {
        if (returnType === void 0) { returnType = false; }
        if (referenceMap[reference.$ref]) {
            if (returnType) {
                return referenceMap[reference.$ref];
            }
            return t.identifier(getName(reference.$ref));
        }
        // Must be like #/definitions/defs_user_id
        var split = reference.$ref.split("/");
        assert_1.ok(split[0] === "#");
        assert_1.ok(split[1] === "definitions");
        assert_1.ok(typeof split[2] === "string");
        var found = schema.definitions[split[2]];
        if (!found) {
            throw new Error("Could not find " + reference.$ref);
        }
        referenceMap[reference.$ref] = to(reference.$ref, found, getReferenced);
        return getReferenced(reference, returnType);
    }
    var allTypes = Object.keys(schema.definitions)
        .map(function (key) {
        var reference = "#/definitions/" + key;
        var name = getName(reference);
        var splitName = name.split(".");
        var namespace = splitName.length === 2 ? splitName[0] : "";
        var typeName = splitName[splitName.length - 1];
        return {
            namespace: namespace,
            typeName: typeName,
            name: name,
            type: getReferenced({ $ref: reference }, true)
        };
    });
    function getFile(fileNamespace, typeName, file) {
        var imports = [
            "import * as t from \"io-ts\";"
        ];
        var namespaces = allTypes
            .map(function (_a) {
            var name = _a.name;
            return name;
        })
            .filter(function (name) { return file.includes(name); })
            .reduce(function (map, name) {
            var _a;
            var split = name.split(".");
            var namespace = split.length === 2 ? split[0] : "";
            return __assign({}, map, (_a = {}, _a[namespace] = (map[namespace] || []).concat(split[split.length - 1]), _a));
        }, {});
        var resultType = file;
        Object.keys(namespaces)
            .forEach(function (namespace) {
            if (namespace === fileNamespace || namespace === "") {
                if (namespace !== "") {
                    resultType = resultType.replace(namespace + ".", "");
                }
                namespaces[namespace]
                    .forEach(function (name) {
                    imports.push("import { " + name + " } from \"./" + change_case_1.paramCase(name) + "\";");
                });
            }
            else {
                imports.push("import * as " + namespace + " from \"../" + change_case_1.paramCase(namespace) + "\";");
            }
        });
        var exportedTypeName = typeName;
        if (fileNamespace === "Definitions" && ["Channel", "Team"].includes(exportedTypeName)) {
            exportedTypeName = exportedTypeName + "Reference";
        }
        return imports.concat([
            "",
            "export const " + exportedTypeName + " = " + resultType + ";"
        ]).join("\n");
    }
    // Write each types file
    allTypes
        .forEach(function (_a) {
        var namespace = _a.namespace, typeName = _a.typeName, type = _a.type;
        var runtime = t.printRuntime(type);
        var path = directory;
        if (namespace !== "") {
            path = directory + "/" + change_case_1.paramCase(namespace);
        }
        mkdirp_1.sync(path);
        var file = getFile(namespace, typeName, runtime);
        fs_1.writeFileSync(path + "/" + (change_case_1.paramCase(typeName) + ".ts"), file, "utf-8");
    });
    allTypes.map(function (_a) {
        var namespace = _a.namespace;
        return namespace;
    })
        .filter(function (namespace, index, array) {
        var before = array.slice(0, index);
        return !before.includes(namespace);
    })
        .forEach(function (namespace, namespaceIndex, namespaces) {
        var index = allTypes
            .filter(function (_a) {
            var other = _a.namespace;
            return other === namespace;
        })
            .map(function (_a) {
            var typeName = _a.typeName;
            return "export * from \"./" + change_case_1.paramCase(typeName) + "\";";
        })
            .concat(namespace === "" ? [
            namespaces.filter(function (value) { return value; }).map(function (value) { return "export * from \"./" + change_case_1.paramCase(value) + "\";"; }).join("\n")
        ] : [])
            .join("\n") + "\n";
        var path = directory;
        if (namespace !== "") {
            path = directory + "/" + change_case_1.paramCase(namespace);
        }
        fs_1.writeFileSync(path + "/index.ts", index, "utf-8");
    });
}
exports.generate = generate;
if (!fs_1.existsSync("./slack_web_openapi_v2.json")) {
    console.log("./slack_web_openapi_v2.json does not exist, please download this from https://raw.githubusercontent.com/slackapi/slack-api-specs/master/web-api/slack_web_openapi_v2.json");
    process.exit(1);
}
var json = fs_1.readFileSync("./slack_web_openapi_v2.json", "utf-8");
generate("./src/slack--web-openapi.v2", JSON.parse(json));
