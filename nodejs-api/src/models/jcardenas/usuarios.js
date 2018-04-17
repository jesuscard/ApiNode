"use strict"
/**
 * Modelo usuarios
 * @class usuarios
 * @module models
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {

  var usuarios = sequelize.define("usuarios",
    {
        //TODO Escribir atributos
      id_usu: {          
          type: DataTypes.INTEGER,
          fieldName : 'id_usu',
          primaryKey: true,
          autoIncrement: true
      },
      nom_usu: {
          type:  DataTypes.STRING,
          fieldName: 'nom_usu',
          allowNull: false,
          validate:{
            notEmpty:{msg: 'Por favor, introduzca un nombre'}
          }

      },
      ape_usu: {
          type:  DataTypes.STRING,
          fieldName: 'ape_usu',
          allowNull: false,
          validate:{
            notEmpty:{msg: 'Por favor, introduzca apellido'}
          }

      },
      log_usu: {
          type:  DataTypes.STRING,
          fieldName: 'log_usu',
          unique: true,
          allowNull: false,
          validate:{
            notEmpty: {msg: 'Por favor, introduzca un usuario'},
          }
      },
      pas_usu: {
          type:  DataTypes.STRING,
          fieldName: 'pas_usu',
          allowNull: false,
          validate:{
            notEmpty:{msg: 'Por favor, introduzca un contraseña'}
          }
      },
      niv_adm: {
          type:  DataTypes.BOOLEAN,
          fieldName: 'niv_adm'
      },
    },
      {
          schema : "jcardenas",
          classMethods: {
              associate: function (models) {
                  //TODO Agrega aquí tus relaciones
              }

              //TODO Escribir metodos
          }
      }
  );

  return usuarios;
};