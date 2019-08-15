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
    Object.keys(schema.definitions)
        .map(function (key) {
        var reference = "#/definitions/" + key;
        return {
            name: getName(reference),
            type: getReferenced({ $ref: reference }, true)
        };
    })
        .map(function (_a) {
        var name = _a.name, type = _a.type;
        var runtime = t.printRuntime(type);
        var splitName = name.split(".");
        var path = directory;
        if (splitName.length === 2) {
            path = directory + "/" + change_case_1.paramCase(splitName[0]);
        }
        mkdirp_1.sync(path);
        var typeName = splitName[splitName.length - 1];
        var file = [
            "import * as t from \"io-ts\";",
            "",
            "export const " + typeName + " = " + runtime + ";"
        ].join("\n");
        fs_1.writeFileSync(path + "/" + (change_case_1.paramCase(typeName) + ".ts"), file);
    });
}
exports.generate = generate;
if (!fs_1.existsSync("./slack_web_openapi_v2.json")) {
    console.log("./slack_web_openapi_v2.json does not exist, please download this from https://raw.githubusercontent.com/slackapi/slack-api-specs/master/web-api/slack_web_openapi_v2.json");
    process.exit(1);
}
var json = fs_1.readFileSync("./slack_web_openapi_v2.json", "utf-8");
generate("./src/slack--web-openapi.v2", JSON.parse(json));
