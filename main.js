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

    app.post('/user/logged', function(req,res){
        if(req.body.email){
	    models.users.find({email: req.body.email}, function(error, users){
		if(error){
		    return res.status(500).send("Error interno");
		}

		if(!users){
		    user = new models.users(req.body);
		    user.save(function(er){
			console.log("Nuevo usuario registrado");
			res.jsonp({status: "ok"});	
		    });
		}
		else{
		    console.log("Usuario ya registrado");
		    res.jsonp({status: "ok"});
		}
	    });
	}
	else{
	    res.status(400).send("Error con parámetros");
	}
    });
