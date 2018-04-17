/**
 * Modelo municipios
 * @class municipios
 * @module models
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
  var municipios = sequelize.define("municipios",
    {
        //TODO Escribir atributos
        /**  cod_edo character varying(2) NOT NULL, -- Código del estado
          cod_mun character varying(3) NOT NULL, -- Código del municipio, es un código compuesto entre cod_edo y cod_mun
          nom_mun character varying(255) NOT NULL, -- Nombre del municipio
          */
      cod_mun:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
          notEmpty: true
        }

      },
      cod_edo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
        }
      },
      nom_mun:{
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
            municipios.belongsTo(models.estados,{
              foreingKey: "cod_edo",
              as: "estado"
            });
            municipios.hasMany(models.parroquias,{
              foreingKey:"cod_mun",
              as: "parroquia"
            })
              //TODO Agrega aquí tus relaciones
          }

          //TODO Escribir metodos
      }
    }
  );

    return municipios;
};