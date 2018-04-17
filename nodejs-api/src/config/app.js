/**
 * Objeto con las variables de configuracion principal de la aplicacion
 *
 * @author Jefferson Lara <jetox21@gmail.com>
 */
const path = require("path");
module.exports = {
    /**
     * Varibale que contiene la ruta base de la aplicacion
     *
     * @var APP_BASE
     * @type String
     */
    API_LOCATION:path.join(__dirname,'../'),
    /**
     * Propiedad que describe el puerto sobre el cual correra la app
     * @property API_PORT {Number}
     */
    API_PORT : 9021,
    /**
     * Propiedad que describe el puerto sobre el cual se hacen pruebas unitarias NO PUEDE SER EL MISMO QUE API_PORT
     * @property API_PORT {Number}
     */
    TEST_API_PORT : 9022,
    /**
     * Log level <https://github.com/pimterry/loglevel>
     * @property LOG_LEVEL
     */
    LOG_LEVEL: 'trace',
    /**
     * Email que se usa para debugear
     * @property DEBUG_MAIL
     */
    DEBUG_MAIL : 'daniprato9210@gmail.com',
    /**
     * Varible que especifica si el servidor va a tener multiples hilos de conexion
     *
     * @var MULTI_THREAD
     * @type Object
     */
    MULTI_THREAD:{
        ACTIVE:false,
        POOL:3
    },
    /**
     * Arreglo con todos los nombres de midlewares que van a ser precargados a las rutas ceeadas
     * en exress
     *
     * @var MIDDLEWARES_AUTOLOAD
     * @type Array
     */
    MIDDLEWARES_AUTOLOAD : ['EnableCrossDomain']

}
