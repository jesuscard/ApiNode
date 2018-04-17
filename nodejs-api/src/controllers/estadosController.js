/**
 * Clase controller estados
 * @class estadosrController
 * @module controllers
 */
"use strict";

var sequelize = require('../utils/sequelizeInstance');
var estados = sequelize.import('../models/jcardenas/estados.js');


class estadosController {
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
    allEstados(){
        estados.findAll().then(result => {
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
    estados.findAll().then(result => {
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
          messages: 'Sin estados',
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

module.exports = new estadosController();
