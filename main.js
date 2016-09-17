    var dir_root = '/home/ecoronel/Exactas/isw2/tp/wifind-bar/';

    var express = require('express'),
        app = express(),
        moment = require('moment'),
        bodyParser = require('body-parser'),
        serverConfig = require('./config/server'),
        database = require('./config/database'),
        mongoose = require('mongoose');

    var GuiaDeBares = require('./wifindApp/guia_de_bares');

    mongoose.connect(database.uri);

    mongoose.connection.on("error", console.error.bind(console,'connection error: '));

    mongoose.connection.once("open", function(){
        console.log("Connected to MongoDB");
    });

    //
    app.guiaDeBares = new GuiaDeBares(mongoose.models.Bares);

    app.use(function(req,res,next){
        console.log("[" + moment(Date.now()).format("DD/MM/YYYY HH:mm:ss") + "]: " + req.method + " " + req.originalUrl);
        next();
    });

    /*app.use(bodyParser.urlencoded({
        extended: true
    }));*/

    app.use(bodyParser.json());

    require('./wifindApp/routes')(app);

    app.get('/', function(req, res){
        res.sendFile(dir_root + 'public/index.html');
    });

    app.get('/static/*', function(req, res){
        console.log(req.params);
        res.sendFile(dir_root + req.params['0']);
    });

    app.get('/*', function(req, res){
        //console.log(req.params);
        res.sendFile(dir_root + req.params['0']);
    });

    app.listen(serverConfig.port, serverConfig.ip, function(){
        console.log("Server listenning at port " + serverConfig.port);
    });
