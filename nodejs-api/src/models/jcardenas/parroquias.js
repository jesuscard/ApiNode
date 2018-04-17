/**
 * Modelo parroquias
 * @class parroquias
 * @module models
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
 module.exports = function(sequelize, DataTypes) {
  var parroquias = sequelize.define("parroquias",
  {
  //TODO Escribir atributos
  /**
    *   cod_edo character varying(2) NOT NULL, -- cod_edo is a varchar(2) NOT NULL
    cod_mun character varying(3) NOT NULL, -- cod_mun is a varchar(3) NOT NULL
    cod_par character varying(3) NOT NULL, -- cod_par is a varchar(3) NOT NULL
    nom_par character varying(255) NOT NULL, -- nom_par is a varchar(255) NOT NULL
    coo_par geometry(MultiPolygon,4326), -- coo_par is a polygon
    */
    cod_par:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      validate:{
        notEmpty: true
      }

    },
    cod_edo:{
      type: DataTypes.STRING(2),
      validate:{
        notEmpty: true
      }
    },
    cod_mun:{
      type: DataTypes.STRING(3),
      validate:{
        notEmpty: true
      }

    },
    nom_par:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
        }    
    },
    coo_par:{
      type: DataTypes.GEOMETRY('POINT', 4326)
    }
   
  },
  {
      schema : "jcardenas",
      classMethods: {
        associate: function (models) {
            parroquias.belongsTo(models.municipios,{
              foreingKey: "cod_mun",
              as: "municipio"
            });
        //TODO Agrega aquí tus relaciones
      }

    //TODO Escribir metodos
  }
  }
  );

  return parroquias;
};