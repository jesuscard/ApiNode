var i18n = require('i18n');
var config = require('../config');
/**
 * Contiene la inicializacion de i18n <https://www.npmjs.com/package/i18n>
 * @class globalizationInstance
 */
module.exports=(function () {
    /**
     * Configuracion de i18n
     */
    i18n.configure({
        locales:[ 'es', 'en'],
        directory: config.app.API_LOCATION + '/locales'
    });
    /**
     * @method translate
     * @param key
     * @returns {*}
     */
    i18n.translate = function(key){
        return i18n.__(key);
    }

    return i18n;
})();