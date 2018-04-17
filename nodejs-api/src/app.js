'use strict';

var config = require('./config');
var sequelizeInstance = require('./utils/sequelizeInstance');
var globalization = require('./utils/globalizationInstance');
var log = require('loglevel');

var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var express = require('express');
var liveRoutes = require("light-routes");
var session = require('express-session');//Variable de sesion
var route = liveRoutes.init({
    pathControllers:path.join(__dirname,'controllers'),
    pathMiddlewares:path.join(__dirname,'middlewares'),
});

var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'qwertyuiop1234455',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

/**
 * Agrega los middlewares a usar por defecto segun el config de la aplicacion a las rutas creadas
 * en express
 *
 * @author Jeferson Lara <jetox21@gmail.com>
 */
function loadMiddDefault(){
    let midd = require('./middlewares'),
        loadMidd = config.app.MIDDLEWARES_AUTOLOAD,
        len = loadMidd.length;
    if(len > 0) {
        for (var i = 0; i < len; i++) {
            app.use(midd[loadMidd[i]]);
        }
    }
}

/**
 * Inicializa el servicio, publica las rutas
 * @method initService
 * @author Daniel Prato <daniel.prato@sigis.com.ve>
 */
function initService(){
    require('./routes')(route);
    log.setLevel(config.app.LOG_LEVEL);
    app.use(globalization.init);
    app.use(cors({origin: '*'}));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use('/',route.getPublish());

    loadMiddDefault();

    if(process.env.NODE_ENV == 'test'){
        app.listen(config.app.TEST_API_PORT, function () {
            log.info('Test server listening on port: ' + config.app.TEST_API_PORT);
        });
    }else{
        app.listen(config.app.API_PORT, function () {
            log.info('App listening on port: ' + config.app.API_PORT);
        });
    }
}

initService();

module.exports = app; // for testing
