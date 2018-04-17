/**
 * Clase controller user
 * @class userController
 * @module controllers
 */
"use strict";

var sequelize = require('../utils/sequelizeInstance');
var users = sequelize.import('../models/jcardenas/usuarios.js');
var responseUtil = require('../utils/responseUtil')
var crypto = require('crypto');



class userController {
  /**
   * IO Constructor
   */
   constructor() {}

    /**
     * 
     */
     
  /**
   * Metodo utilizado por HTTP POST
   * @method create
   * @param req
   * @param res
   */
   allUsers(req, res) {
   	users.findAll().then(result => {
   		if (result !== null) {
   			res.status(200).json({
   				sucess: true,
   				messages: 'Consulta Correcta',
   				errors: null,
   				data: result
   			});
   		} else {
   			res.status(404).json({
   				sucess: true,
   				messages: 'No hay usuarios registrados en el sistema',
   				errors: null,
   				data: result
   			});
   		}

   	});
   }

  /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * @param res   */
   create(req, res) {    
   	var body = req.body;
   	var concatPass = body.username + body.password;
   	var passwordNew = crypto.createHash('md5').update(concatPass).digest("hex");

   	users.findOrCreate({
   		where: {
   			log_usu: body.username
   		},
   		defaults: {
   			nom_usu: body.firstname,
   			ape_usu: body.lastname,
   			log_usu: body.username,
   			pas_usu: passwordNew,
   			niv_adm: body.level
   		}
   	}).spread(function(result, created) {
   		if (created) {
   			res.status(200).json({
   				sucess: true,
   				messages: 'Usuario registrado',
   				errors: null,
   				data: created
   			});
   		} else {
   			res.status(404).json({
   				sucess: true,
   				messages: 'El nombre de usuario ingresado ya existe para otro usuario',
   				errors: null,
   				data: result
   			});
   		}
   	}).catch(err => {
   		res.status(404).json({
   			sucess: true,
   			messages: 'no encontrado',
   			errors: null,
   			data: err
   		});

   	});
   }

  /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * @param res   */
   update(req, res) {
   	var body = req.body;
   	var concatPass = body.username + body.password;
   	var passwordNew = crypto.createHash('md5').update(concatPass).digest("hex");

   	let updateValues = {
   		nom_usu: body.firstname,
   		ape_usu: body.lastname,
   		log_usu: body.username,
   		pas_usu: passwordNew,
   		niv_adm: body.level
   	};

   	users.findOne({
   		where: {
   			log_usu: body.username,
   			id_usu: {
   				$ne: req.params.id
   			}
   		}
   	}).then(result => {
   		if (result === null) {
   			users.update(updateValues, {
   				where: {
   					id_usu: req.params.id
   				}
   			}).then((result) => {
   				res.status(200).json({
   					sucess: true,
   					messages: 'Datos de usuario actualizado',
   					errors: null,
   					data: result
   				});
   			})
   		} else {
   			res.status(404).json({
   				sucess: true,
   				messages: 'El nombre de usuario ingresado ya existe para otro usuario',
   				errors: null,
   				data: result
   			});
   		}
   	}).catch(err => {
   		res.status(404).json({
   			sucess: true,
   			messages: 'No se pudo reaizar la actualizacion',
   			errors: null,
   			data: err
   		});
   	});

   }

  /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * 
   * @param res   */

   destroy(req, res) {
   	var userDestroy = JSON.parse("[" + req.body.users + "]")
   	users.destroy({
   		where: {
   			id_usu: {
   				$in: userDestroy
   			}
   		}
   	}).then(result => {
   		res.status(200).json({
   			sucess: true,
   			messages: 'Usuario(s) eliminado(s)',
   			errors: null,
   			data: result
   		});
   	}).catch(err => {
   		res.status(404).json({
   			sucess: true,
   			messages: 'No se pudo eliminar el/los usuario(s)',
   			errors: null,
   			data: err
   		});
   	});
   }

  /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * @param res   */
   findOne(req, res){
   	let id = req.params.id;

   	users.findOne({
   		where: {
   			id_usu: id,
   		}
   	}).then(result => {
   		res.status(200).json({
   			sucess: true,
   			messages: 'Usuario',
   			errors: null,
   			data: result
   		});
   	}).catch(err => {
   		res.status(404).json({
   			sucess: true,
   			messages: 'Usuario no existe',
   			errors: null,
   			data: err
   		});

   	});
   }

  /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * @param res   */

   search(req,res){

   	let search = req.query.busqueda;
   	console.log(req.query.busqueda);


   	users.findAll({
   		where: {
   			$or: [
   			{
   				nom_usu: {
   					$like: '%' + search + '%'
   				}
   			},
   			{
   				ape_usu: {
   					$like: '%' + search + '%'
   				}
   			},
   			{
   				log_usu: {
   					$like: '%' + search + '%'
   				}
   			}

   			]
   		}
   	}).then(result => {

   		if(result !== null){
   			res.status(200).json({
   				sucess: true,
   				messages: 'busqueda correcta',
   				errors: null,
   				data: result
   			});        
   			console.log(result);  
   		}else{
   			res.status(404).json({
   				sucess: true,
   				messages: 'No se encuantran datos asociados',
   				errors: null,
   				data: result
   			});  
   		}
   	}).catch(err => {
   		res.status(404).json({
   			sucess: true,
   			messages: 'Usuario no existe',
   			errors: null,
   			data: err
   		});

   	});
   }   
   
 }

 module.exports = new userController();    