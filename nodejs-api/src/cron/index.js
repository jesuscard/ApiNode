/**
 * Exporta todos los cron para poder ser usados con require
 * @copyright (c) SIGIS Soluciones Integrales GIS C.A
 */
'use strict';
var fs = require('fs'),
    path = require('path'),
    crons = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== -1) && (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var fnc = require(path.join(__dirname,file));
        var nameCrons = file.substring(0,file.indexOf('.'));
        crons[nameCrons] = fnc;
    })

module.exports = crons;
