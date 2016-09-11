var express = require('express'),
    app = express()
    moment = require('moment'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

    mongoose.connect("mongodb://localhost:27017/admin");

    mongoose.connection.on("error", console.error.bind(console,'connection error: '));

    mongoose.connection.once("open", function(){
	   console.log("Connected to MongoDB");
    });

    app.use(function(req,res,next){
    	console.log("[" + moment(Date.now()).format("DD/MM/YYYY HH:mm:ss") + "]: " + req.method + " " + req.originalUrl);
    	next();
    });

    app.use(bodyParser.json({}));


    app.get('/', function(req, res){
	   res.sendFile('/var/www/public/index.html');
    });

    app.get('/static/*', function(req, res){
        console.log(req.params);
        res.sendFile('/var/www/' + req.params['0']);
    });


    app.get('/*', function(req, res){
        //console.log(req.params);
        res.sendFile('/var/www/' + req.params['0']);
    });


    app.listen(5000, "192.168.0.105",function(){
	   console.log("Server listenning at port 5000");
    }); 

    app.post('/user/new', function(req,res){
        console.log(req.body);
        res.jsonp({status: "ok"});
    });