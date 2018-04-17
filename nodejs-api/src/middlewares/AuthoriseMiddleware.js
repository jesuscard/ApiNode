"use strict";
const HTTP = require('request');
const responseUtil = require('../utils/responseUtil');
//const redisUtil = require('../utils/redisUtil');
const log = require('loglevel');
const config = require('../config');
const TOKEN_TYPE = 'Bearer ';
const REDIS_TOKEN_KEY = 'LocalToken';
const GRANT_TYPE = 'client_credentials';
/**
 * Clase middleware Authorize
 * @class AuthorizeMiddleware
 * @module middlewares
 */
module.exports = function (req,res,next) {
    let localToken = null;
    let method = req.method;
    let targetPath = req.url;
    let authorization = req.get('Authorization');

    redisUtil.get(REDIS_TOKEN_KEY,function(err,reply){
        if(!err){
            try{
                localToken = JSON.parse(reply);
            }catch(e){
                log.error(e);
                localToken = null;
            }
        }

        let doAuthorization = (localToken)=>{
            HTTP.post({
                url: config.oauth.OAUTH_SERVER.OAUTH_SERVICE_URL + config.oauth.OAUTH_SERVER.OAUTH_AUTHORIZATION,
                form: {
                    targetUrl : targetPath,
                    clientAuthorization : authorization
                },
                headers:{
                    Authorization : localToken
                }
            }, (err, httpResponse, body)=>{
                body = JSON.parse(body);

                if(httpResponse.statusCode == 200){
                    if(!err && body && !body.error && body.data && body.data.code && body.data.code == 200){
                        next();
                    }else{
                        responseUtil.sendResponse(res,401,null,body.data.error);
                    }
                }else{
                    responseUtil.sendResponse(res,500,null,body.error);
                }
            });
        };

        if(!localToken){
            log.info('Buscando token remoto');
            HTTP.post({
                url: config.oauth.OAUTH_SERVER.OAUTH_SERVICE_URL + config.oauth.OAUTH_SERVER.OAUTH_TOKEN,
                form: {
                    grant_type : GRANT_TYPE
                },
                headers:{
                    Authorization : config.oauth.OAUTH_SERVER.CURRENT_CLIENT_KEY
                }
            },(err, httpResponse, body)=>{
                if(httpResponse.statusCode == 200){
                    body = JSON.parse(body);
                    if(body && body.data){
                        localToken = body.data;
                        redisUtil.set(REDIS_TOKEN_KEY,JSON.stringify(localToken));
                        doAuthorization(TOKEN_TYPE + localToken.access_token);
                    }
                }else{
                    responseUtil.sendResponse(res,500,null,'error_auth');
                }
            });
        }else{
            log.info('Usando token local');
            doAuthorization(TOKEN_TYPE + localToken.access_token);
        }
    });

}
