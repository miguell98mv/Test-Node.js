'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routers/testNode_router'),
    favicon = require('express-favicon'), 
    publicDir = express.static(__dirname + "/public"),
    viewDir = __dirname + "/views",
    port = (process.env.PORT || 3000),
    faviconURL = __dirname + "/public/img/node-favicon.png",
    app = express();

    
app
    .set('views', viewDir)
    .set('view engine', 'pug')
    .set('port', port)
    .use(favicon(faviconURL))
    .use(publicDir)
    .use(bodyParser.urlencoded({ extended: false }))
    .use(routes);

var server = app.listen(app.get('port'), function () {
    console.log("Iniciando Express en el puerto " + app.get('port'));
});
