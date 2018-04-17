"use strict";

const redis = require("redis");
const config = require("../config");

/**
 * Clase Utilitaria redis
 * @class redis
 * @module util
 */
class redisUtil {
    /**
     * IO Constructor
     */
    constructor(){
        let me = this;

        me.client = redis.createClient({
            host : config.oauth.REDIS.host,
            port : config.oauth.REDIS.port
        });
    }
    /**
     * Setea un valor en el servidor redis
     * @method set
     * @param {[type]} key [description]
     * @param {[type]} val [description]
     */
    set(key,val){
        let me = this;
        me.client ? (me.client.set(key,val)) : (callback('redis_not_started',null));
    }
    /**
     * Obtiene un key del storage
     * @param  {[type]}   key      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    get(key,callback){
        let me = this;
        me.client ? (me.client.get(key,callback)) : (callback('redis_not_started',null));
    }

}

module.exports = new redisUtil();
