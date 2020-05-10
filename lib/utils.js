const path = require('path')

module.exports.TYPES_MAP = {
    integer: 'number',
    string: 'string',
    array: '[]',
    object: 'any',
    boolean:'boolean',
}

module.exports.projectPath = function (...restOfPath) {
    return path.join(process.cwd(),...restOfPath)
}
