var bares = require('./models/bar'),
    User = require('./models/user');

var guiaDeBares = require('./guia_de_bares');

module.exports = function(app) {


    // USUARIOS
    app.post('/user/logged', function(req,res,next){
    console.log(req.body);
      if(req.body.email) {
        User.find({email: req.body.email}, function(error, users){
          if(error){
            return res.status(500).send("Error interno");
          }

          if(!users){
            user = new users(req.body);
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
      else {
        res.status(400).send("Error con parámetros");
      }
    });


    // BARES
    app.post('/api/bares/buscar', function(req,res,next){
        console.log("Buscando bares... ");
        console.log("Body: ");
        console.log(req.body);
        var ubicacion = req.body.ubicacion;
        console.log("Ubicacion: " + ubicacion);

        if (!app.guiaDeBares) console.log("guiaDeBares es nil");

        var resultados = app.guiaDeBares.buscar(ubicacion, 400);
        res.jsonp({
                    status: "ok",
                    bares: resultados
                });
    });

    app.post('/api/bares', function(req,res,next){
        console.log("Agregando bar... ");
        res.jsonp({
                    status: "ok",
                    bares: []
                });
    });

    app.delete('/api/bares', function(req,res,next){
        console.log("Eliminando bar... ");
        res.jsonp({
                    status: "ok",
                    bares: []
                });
    });
}
