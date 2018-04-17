/**
 * Clase controller login
 * @class loginController
 * @module controllers
 */
"use strict";

var sequelize = require('../utils/sequelizeInstance');
var users = sequelize.import('../models/jcardenas/usuarios.js');
var responseUtil = require('../utils/responseUtil')
var crypto = require('crypto');



class loginController {
  /**
   * IO Constructor
   */
  constructor() {}

    /**
   * Metodo utilizado por HTTP POST
   * @method auth
   * @param req
   * @param res   */

  auth(req, res) {
    var body = req.body;
    var concatPass = body.password;
    var passwordNew = crypto.createHash('md5').update(concatPass).digest("hex");

    if ((body.username !== '' && body.username) || (body.password !== '' && body.password)) {
      users.findOne({
        where: {
          log_usu: body.username,
          pas_usu: passwordNew
        }
      }).then(result => {
        //      delete result.password;
        if (result !== null) {
          res.status(200).json({
            sucess: true,
            messages: 'Se ha ingresado correctamente',
            errors: null,
            data: result
          });
        } else {
          res.status(404).json({
            sucess: true,
            messages: 'Usuario y/o contraseña incorrecto',
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
    } else {
      responseUtil.sendResponse(res, 401, null, 'no tiene datos');
    }
  }

}

module.exports = new loginController();