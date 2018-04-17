/**
 * Clase controller parroquias
 * @class parroquiasController
 * @module controllers
 */
 "use strict";
 var sequelize = require('../utils/sequelizeInstance');
 var parroquias = sequelize.import('../models/jcardenas/parroquias.js');
 class parroquiasController {
    /**
     * IO Constructor
     */
     constructor(){}

    /**
     * Metodo utilizado por HTTP POST
     * @method create
     * @param req
     * @param res
     */
     create(req,res){
      res.status(200).json(
      {
        sucess: true,
        messages: 'Estructura base POST',
        errors: null,
        data: [{}, {}, {}]
      }
      );
    }
    /**
     * Metodo utilizado por HTTP PUT
     * @method update
     * @param req
     * @param res
     */
     update(req,res){
      res.status(200).json(
      {
        sucess: true,
        messages: 'Estructura base PUT',
        errors: null,
        data: [{}, {}, {}]
      }
      );
    }
    /**
     * Metodo utilizado por HTTP DELETE
     * @method destroy
     * @param req
     * @param res
     */
     destroy(req,res){
      res.status(200).json(
      {
        sucess: true,
        messages: 'Estructura base DELETE',
        errors: null,
        data: [{}, {}, {}]
      }
      );
    }
    /**
     * Metodo utilizado por HTTP GET (GET_ONE)
     * @method findOne
     * @param req
     * @param res
     */
     findOne(req,res){
      let id = req.params.id;
      res.status(200).json(
      {
        sucess: true,
        messages: 'Estructura base GET ONE',
        errors: null,
        data: [{}, {}, {}]
      }
      );
    }
    /**
     * Metodo utilizado por HTTP GET (GET_ALL)
     * @method find
     * @param req
     * @param res
     */
     find(req,res){
      let id = req.params.id;
      parroquias.findAll({
        attributes: ['cod_par', 'nom_par', 'coo_par'],
        where: {
          cod_mun: id
        }
      }).then(result => {
        if (result.length > 0) {
          res.status(200).json({
            sucess: true,
            messages: 'Consulta Correcta',
            errors: null,
            data: result
          });
        } else {
          res.status(200).json({
            sucess: false,
            messages: 'Sin parroquias',
            errors: null,
            data: result
          });
        }
      });
    }
    /**
     * Metodo utilizado por HTTP OPTIONS
     * @method options
     * @param req
     * @param res
     */
     options(req,res){
      res.status(200).json(
      {
        sucess: true,
        messages: 'Estructura base OPTIONS',
        errors: null,
        data: [{}, {}, {}]
      }
      );
    }
  }

  module.exports = new parroquiasController();
