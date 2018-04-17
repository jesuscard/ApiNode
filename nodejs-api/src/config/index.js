/**
 * Exporta todos los configs para poder ser usados con require
 * @author Jefferson Lara <jefferson.lara@sigis.com.ve>
 */
var fs = require('fs'),
    path = require('path'),
    configs = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== -1) && (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var fnc = require(path.join(__dirname,file));
        var nameConfig = file.substring(0,file.indexOf('.'));
        configs[nameConfig] = fnc;
    })

module.exports = configs;