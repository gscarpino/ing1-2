var User = require('./models/user');
var guiaDeBares = require('./guia_de_bares');

module.exports = function(app) {


    /////////////////////////////////////////////////////////////////
    // BARES
    /////////////////////////////////////////////////////////////////

    // Para usuarios registrados con Gmail (API de Google)
    app.post('/api/user/logged', function(req,res,next){
        console.log(req.body);
        if(req.body.email) {
            User.find({email: req.body.email}, function(error, users){
                if(error){
                    return res.status(500).send("Error interno");
                }

                if(users.length > 0) {
                    console.log("Usuario ya registrado");
                    console.log(users);
                    res.jsonp({status: "ok"});
                }
                else{
                    user = new User( {email: req.body.email,  nombre: req.body.nombre});
                    user.save(function(er){
                        console.log("Nuevo usuario registrado");
                        res.jsonp({status: "ok"});
                    });
                }
            });
        }
        else {
            res.status(400).send("Error con parámetros");
        }
    });

    // Para registrar nuevos usuarios
    app.post('/api/user', function(req,res,next){
        console.log(req.body);
        if(req.body.email) {
            User.find({email: req.body.email}, function(error, users){
                if(error){
                    return res.status(500).send("Error interno");
                }

                if(users.length > 0) {
                    console.log("Usuario ya registrado");
                    return res.status(400).send("El usuario ya esta registrado");
                }
                else{
                    user = new User( {email: req.body.email,  nombre: req.body.nombre, password: req.body.password});
                    user.save(function(er){
                        console.log("Nuevo usuario registrado");
                        res.jsonp({status: "ok"});
                    });
                }
            });
        }
        else {
            res.status(400).send("Error con parámetros");
        }
    });

    // Para buscar usuarios
    app.post('/api/user/email', function(req,res,next){
        if(req.body.email) {
            User.find({email: req.body.email}, function(error, users){
                if(error){
                    return res.status(500).send("Error interno");
                }

                if(users.length > 0) {
                    console.log(users);
                    res.jsonp({status: "ok", usuario: users[0] });
                }
                else{
                    return res.status(404).send("Usuario no encontrado");
                }
            });
        }
        else {
            res.status(400).send("Error con parámetros");
        }
    });

    /////////////////////////////////////////////////////////////////
    // BARES
    /////////////////////////////////////////////////////////////////

    // Buscar bares
    app.post('/api/bares/buscar', function(req,res,next){
        var ubicacion = req.body.ubicacion;
        var resultados = app.guiaDeBares.buscar(req.body.ubicacion, req.body.distancia,
            function(err, results) {
                if (!err) {
                    res.jsonp({
                            status: "ok",
                            bares: results
                        });
                }
                else {
                    res.status(500).send("Error interno: " + err.name);
                }
            });
    });

    // Agregar un bar
    app.post('/api/bares', function(req,res,next){
        if (req.body.nombre) {
            app.guiaDeBares.agregar(req.body, function(err, result) {
                if (!err) {
                    res.jsonp({ status: "ok" });
                }
                else {
                    res.status(500).send("Error interno: " + err.name);
                }
            });
        }
        else {
            res.status(400).send("Error con parámetros");
        }
    });

    // Actualizar un bar
    app.put('/api/bares', function(req,res,next){
        app.guiaDeBares.actualizar(req.body, function(err, result) {
            if (!err) {
                res.jsonp({ status: "ok" });
            }
            else {
                res.status(500).send("Error interno: " + err.name);
            }
        });
    });

    // Eliminar un bar
    app.delete('/api/bares/:_id', function(req,res,next){
        app.guiaDeBares.eliminar(req.params._id, function(err, result) {
            if (!err) {
                res.jsonp({ status: "ok" });
            }
            else {
                res.status(500).send("Error interno: " + err.name);
            }
        });
    });
}
