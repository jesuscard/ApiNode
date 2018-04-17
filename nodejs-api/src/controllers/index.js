/**
 * Exporta todos los controladores para poder ser usados con require
 */
'use strict';
var fs = require('fs'),
    path = require('path'),
    controllers = {};

var handleController = function (directory) {

    let stat = fs.lstatSync(directory);
    if ( stat.isDirectory() ) {
        let files = fs.readdirSync(directory);
        let fileListLen = files.length;
        for (let i = 0; i < fileListLen; i++) {
            let file = path.join(directory, files[i]);
            handleController(file);
        }

    } else {
        if ( directory.indexOf(".") !== 0  && directory.indexOf("index.js") < 0 && directory.indexOf(".json") <= 0 ){
            var ctrl = require(directory);
            var nameCtrl = ctrl.name ||  path.basename(directory,".js");
            controllers[nameCtrl] = ctrl;
        }
    }
}

handleController(__dirname);

module.exports = controllers;