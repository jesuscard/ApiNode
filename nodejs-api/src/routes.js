"use strict";
/**
 * Metodo para la publicacion de rutas
 * @example
 *
 *  routes.publish('GET,POST,PUT,DELETE,..',
 *              'nombre_endpoint',
 *              'nombre_controller?nombre_metodo',
 *               arreglos_middlewares)
 *
 *  NOTA: 'el arreglo middlewares recibe el nombre de los archivos en la carpeta middlewares
 *         o los nombres de metodos existente en el controlador referenciado en la ruta.
 *         El arreglo de middlewares no es requerido'
 *
 * @packages
 * @author Jefferson Lara
 * @date 08-10-2016
 * @param routes {object}
 */
var responseUtil = require('./utils/responseUtil');
var config = require('./config');

module.exports = function (routes) {

    /**
     * @api {get} / Request base route
     * @apiVersion 0.0.1
     * @apiName GetBaseRoute
     * @apiGroup Base
     *
     * @apiSuccess {String} code HTTP response code.
     * @apiSuccess {Object} data response data.
     * @apiSuccess {String} data.inner The port in which the api was started.
     * @apiSuccess {String} error if errors found.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 200,
     *       "data": {
     *          "inner":"Api started on port 120"
     *       },
     *       "error": null
     *     }
     */
    routes.publish('get','/',function (req,res) {
        responseUtil.sendResponse(res,200,{
            "inner":"Api started on port " + config.API_PORT
        });
    },null);
    //Crea tus rutas ac
    routes.publish('post', '/login','loginController?auth');
    //Rutas para usuarios
    routes.publish('get', '/users','userController?allUsers');
    routes.publish('post', '/users','userController?create');
    routes.publish('put', '/users/:id','userController?update');
    routes.publish('delete', '/users','userController?destroy');
    routes.publish('get', '/users/:id','userController?findOne');
    routes.publish('get', '/search', 'userController?search');

    //Rutas para estados
    routes.publish('get', '/estados','estadosController?find');

    //consulta de municipios por estados
    routes.publish('get', '/municipios/:id', 'municipiosController?find');
    //consulta de parroquias por municipios
    routes.publish('get', '/parroquias/:id', 'parroquiasController?find');
}; 