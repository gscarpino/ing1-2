var bares = require('./models/bar'),
    users = require('./models/user');


module.exports = function(app) {

    app.post('/user/logged', function(req,res){
      if(req.body.email){
        users.find({email: req.body.email}, function(error, users){
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

}
