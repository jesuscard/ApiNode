"use strict"
/**
 * Modelo estados.js
 * @class estados.js
 * @module models
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
 module.exports = function(sequelize, DataTypes) {
  var estados = sequelize.define("estados",
  {
    /**TODO Escribir atributos
      cod_edo character varying(2) NOT NULL, -- Código del estado
      nom_edo character varying(100) NOT NULL, -- Nombre del estado     
    */
    cod_edo: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false,
      validate:{
        notEmpty: true
      }

    }, 
    nom_edo:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }


    } 
  },
  {
    schema : "jcardenas",
    classMethods: {
      associate: function (models) {
            //TODO Agrega aquí tus relaciones
            estados.hasMany(models.municipio,{
              foreingKey: "cod_edo",
              as: "municipio" 
            });
          }

        //TODO Escribir metodos
      }
    }
    );

  return estados;
};