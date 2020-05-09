const axios = require('axios');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const rimraf = require('rimraf');
const {TYPES_MAP} = require("./utils");
const prettier = require("prettier");

let dataUrl = "http://localhost:8081/v1/v2/api-docs";
let tagRequestMap = new Map();
let supportMethods = ["get", "post", "put", "delete", "head", "options", "patch"];
let srcData;

function initialize() {
    rimraf.sync("./output/");
    fs.mkdirSync(path.join(__dirname, "./output/"))
    fs.mkdirSync(path.join(__dirname, "./output/controllers/"))
    fs.mkdirSync(path.join(__dirname, "./output/definitions/"))
}

async function build() {
    initialize();
    let response = await axios.get(dataUrl);
    loadTags(response.data);
    srcData = response.data;
    loadRequests(response.data);
    tagRequestMap.forEach((methodRequests, tagName) => {
        const tagContext = makeContext();
        renderTag(tagName, methodRequests.map(request => makeRequest(request, tagContext)), tagContext.imports)
    })
    Object.keys(response.data.definitions).forEach(definationName => {
        renderDefinition(definationName, response.data.definitions[definationName])
    })

}

function makeContext() {
    return {
        imports: []
    }
}

function loadTags(data) {
    data.tags.forEach(tag => {
        tagRequestMap.set(tag.name, [])
    })
}

function loadRequests(data) {
    Object.keys(data.paths).forEach(pathKey => {
        const path = data.paths[pathKey];
        Object.keys(path).forEach(method => {
            let methodRequest = path[method];
            tagRequestMap.get(methodRequest.tags[0]).push(Object.assign(methodRequest, {path: pathKey, method},))
        })
    })
}

function renderWithPrettier(template, data) {
    const result = mustache.render(template, data);
    return prettier.format(result, {semi: false, parser: "babel"});
}

function renderTag(tagName, methodRequests, imports) {
    const renderResult = renderWithPrettier(fs.readFileSync(path.join(__dirname, "./template/controllerTemplate.ts.mustache"), "utf8"), {
        methodRequests,
        imports
    });
    fs.writeFileSync(path.join(__dirname, `./output/controllers/${tagName}.ts`), renderResult)
}

function renderDefinition(definationName, definition) {
    const renderResult = renderWithPrettier(fs.readFileSync(path.join(__dirname, "./template/definition.ts.mustache"), "utf8"),makeDefinition(definationName, definition))
    fs.writeFileSync(path.join(__dirname, `./output/definitions/${definationName}.ts`), renderResult)
}

function makeRequest(request, tagContext) {
    const parameters = request.parameters ? makeParameters(request.parameters, tagContext) : [];
    return {
        requestName: request.summary[0].toUpperCase() + request.summary.slice(1, request.summary.length),
        parameters: parameters,
        parametersInQuery: parameters.filter(item => item.in === 'query'),
        parametersInBody: parameters.filter(item => item.in === 'body'),
        url: makeRequestUrl(request),
        method: request.method,
        capitalizedMethod: request.method[0].toUpperCase() + request.method.slice(1, request.method.length),
    }
}

function makeRequestUrl(request) {
    return srcData.basePath + request.path
}

function makeParameters(parameters, tagContext) {
    return parameters.map(param => {
        return {
            paramName: param.name,
            paramRequired: param.required ? "" : "?",
            paramType: TYPES_MAP.hasOwnProperty(param.type) ? TYPES_MAP[param.type] : findSchemaType(param.schema.$ref, tagContext),
            ...param
        }
    })
}

function makeDefinition(definationName, definition) {
    const context = makeContext()
    return {
        definationName: definationName,
        properties: makeProperties(definition.properties, context),
        imports: context.imports
    }
}

function makeProperties(properties, context) {
    return Object.keys(properties).map(key => {
        const property = properties[key]
        return {
            keyName: key,
            type: TYPES_MAP.hasOwnProperty(property.type) ? TYPES_MAP[property.type] : findSchemaType(property.$ref, context),
        }
    })
}


function findSchemaType(ref, context) {
    let refName = ref.split("/")[ref.split("/").length - 1]
    context.imports.push({
        importName: refName,
        importPath: "./" + refName
    })
    return refName
}

build();
