/**
 * Clase Utilitaria responseUtil
 * @class responseUtil
 * @module util
 * @author Daniel Prato <daniel.prato@sigis.com.ve>
 */
"use strict";

class responseUtil {
    /**
     * IO Constructor
     * @constructor
     */
    constructor(){}

    /**
     * Centraliza el manejo de respuestas en el api
     * @method sendResponse
     * @param res {Object}
     * @param status {integer}
     * @param data {Object}
     * @param error {Object}
     */
    sendResponse(res,status,data,error){
        res.status(status).send({
            code : status,
            data : typeof data != 'undefined' ? data : null,
            error : typeof error != 'undefined' ? error : null
        });
    }

}

module.exports = new responseUtil();
