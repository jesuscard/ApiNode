/**
 * Exporta todos los middlewares para poder ser usados con require
 */
'use strict';
var fs = require('fs'),
    path = require('path'),
    middlewares = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== -1) && (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var fnc = require(path.join(__dirname,file));
        var nameMiddlewares = file.substring(0,file.indexOf('.'));
        middlewares[nameMiddlewares] = fnc;
    })

module.exports = middlewares;
