/**
 * Clase controller municipios
 * @class municipiosController
 * @module controllers
 */
 "use strict";

 var sequelize = require('../utils/sequelizeInstance');
 var municipios = sequelize.import('../models/jcardenas/municipios.js');


 class municipiosController {
    /**
     * IO Constructor
     */
     constructor(){}

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
    municipios.findAll({
      where: {
        cod_edo: id
      }
    }).then(result => {
      console.log('resultadooooo',result.length);
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
          messages: 'Sin municipios',
          errors: null,
          data: result
        });
      }
    }).catch(err => {
      res.status(404).json({
        sucess: true,
        messages: 'No se puede realizar la consulta',
        errors: null,
        data: err
      });

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

  module.exports = new municipiosController();
