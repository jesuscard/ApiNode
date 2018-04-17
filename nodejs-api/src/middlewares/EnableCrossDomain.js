"use strict";
/**
 * 
 * @param  {ApiEnvironment} env Instancia de ApiEnvironment de la cual se obtienen 
 * valores como instancia de sequelize, memcache y otros
 * @return {Function} Retorna el middleware a ejecutar
 */
module.exports = function(env){
	/**
	 *
	 * Middleware express para habilitar soporte de cross domain, si sabe lo que hace
	 * puede incorporar más encabezados
	 * 
	 * @author Marco Villarreal
	 * @method EnableCrossDomain
	 * @param  {Request}  req  Objeto request de express
	 * @param  {Response} res  Objeto response de express
	 * @param  {Function} next Próximo middleware/callback en la ejecución Express
	 */
	return (req,res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
			
		if ( "OPTIONS" == req.method ) {
		   res.status(200).send("Ok");
		} else {
		  next();
		}
	};
};
