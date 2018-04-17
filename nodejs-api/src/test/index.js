/**
 * Exporta todas las pruebas para ser usadas con require
 * @copyright (c) SIGIS Soluciones Integrales GIS C.A
 */
'use strict';
var fs = require('fs'),
    path = require('path'),
    tests = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== -1) && (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var fnc = require(path.join(__dirname,file));
        var nameTests = file.substring(0,file.indexOf('.'));
        tests[nameTests] = fnc;
    })

module.exports = tests;
