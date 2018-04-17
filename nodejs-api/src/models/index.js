/**
 * Exporta todos los modelos para poder ser usados con require
 * @copyright (c) SIGIS Soluciones Integrales GIS C.A
 */
'use strict';
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = require("../utils/sequelizeInstance");
var db        = {};

var handleModels = function (directory) {

    let stat = fs.lstatSync(directory);
    if ( stat.isDirectory() ) {
        let files = fs.readdirSync(directory);
        let fileListLen = files.length;
        for (let i = 0; i < fileListLen; i++) {
            let file = path.join(directory, files[i]);
            handleModels(file);
        }

    } else {
        if ( directory.indexOf(".") !== 0  && directory.indexOf("index.js") < 0 && directory.indexOf(".json") <= 0 ){
            var model = sequelize.import(directory);
            db[model.name] = model;
        }
    }
}

handleModels(__dirname);

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
