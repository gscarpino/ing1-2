var User = require('./models/user');
var guiaDeBares = require('./guia_de_bares');

module.exports = function(app) {


    // USUARIOS
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

    app.get('/api/user/:email', function(req,res,next){
        console.log(req.params.email);
        if(req.params.email) {
            User.find({email: req.params.email}, function(error, users){
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
            function(results) {
                res.jsonp({
                            status: "ok",
                            bares: results
                        });
            });
    });

    // Agregar un bar
    app.post('/api/bares', function(req,res,next){
        if (req.body.nombre)
        {
            app.guiaDeBares.agregar(req.body, function(result) {
                res.jsonp({ status: "ok" });
            });
        }
        else {
            res.status(400).send("Error con parámetros");
        }
    });

    // Actualizar un bar
    app.put('/api/bares', function(req,res,next){
        console.log("No implementado aún.");
        res.jsonp({ status: "No implementado aún."});
    });

    // Eliminar un bar
    app.delete('/api/bares', function(req,res,next){
        console.log("Eliminando bar... ");
        app.guiaDeBares.eliminar(req.body, function(result) {
            res.jsonp({ status: "ok" });
        });
    });
}
