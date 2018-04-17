/**
 * Objeto con las variables de configuracion principal de la aplicacion
 *
 * @author Jefferson Lara <jetox21@gmail.com>
 */
const path = require("path");
module.exports = {
    /**
     * Configuración de redis
     * @property REDIS
     * @type {Object}
     */
    REDIS:{
        host: '127.0.0.1',
        port: 6379
    },
    /**
     * Contiene las url de los servicios OAUTH
     * @property OAUTH_SERVER
     * @type {Object}
     */
    OAUTH_SERVER:{
        OAUTH_SERVICE_URL : 'http://localhost:9021/',
        CURRENT_CLIENT_KEY: 'Basic VEVTVDpURVNUMg==',
        OAUTH_AUTHORIZATION : 'oauth-lib/access-token-authorization',
        OAUTH_TOKEN : 'oauth-lib/access-token'
    },
}
