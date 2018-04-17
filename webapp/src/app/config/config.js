"use strict"
/**
 * Contiene la configuración de la aplicación.
 * 
 * @class config
 * @copyright (c) Soluciones Integrales GIS, C.A. 
 */
var config = {
   /**
    * Url del servicio RESTFull.
    * 
    * @property {string}
    */
   apiURL: "http://localhost:9021",
   /**
    * Identificador único de la aplicación
    * 
    * @property {string}
    */
   appUUID: "ve.com.sigis.webapp-entrenamiento-jcardenas",
   /**
    * Idioma de la aplicación debe especificar un idioma válido que haya definido previamente
    * en el archivo locales.json
    * 
    * @property language
    * @type {String}
    * 
    */
   language:"es",
    /**
    * Formato de fecha usado para visualizar por el usuario, usado 
    * por el método formatDate en AppBehavior
    * 
    * @property dateFormat
    * @type {String}
    */
   dateFormat: "DD/MM/YYYY",
   /**
    * Formato de timestamp usado para visualizar por el usuario, usado 
    * por el método formatTimestamp en AppBehavior
    * 
    * @property timestampFormat
    * @type {String}
    */
   timestampFormat: "DD/MM/YYYY hh:mm:ss",
    /**
    * Formato de fechas amigables usado para visualizar por el usuario, usado 
    * por el método formatHumanDate en AppBehavior
    * El formato por defecto propone: Día Nombre de mes abreviado. Año Hora:Minutos
    * 
    * Ejemplo del formato:
    *   13 Feb. 2017 08:26
    *
    * @property humanDateFormat
    * @type {String}
    * @default DD MMM. YYYY hh:mm
    *
    */
   humanDateFormat: "DD MMM. YYYY hh:mm"
};