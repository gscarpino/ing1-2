var Bar = require('./bar'),
    ModelBar = require('./models/bar');

module.exports =
     function(bar, calculadorDistancias) {
        this.calculadorDistancias = calculadorDistancias;

        // metodos
        this.agregar = function(bar, callback) {
            bar = new ModelBar( {nombre: bar.nombre, descripcion: bar.descripcion, ubicacion: bar.ubicacion, direccion: bar.direccion, wifi: bar.wifi, enchufes: bar.enchufes} );
            bar.save(function(err){
                console.log("Nuevo bar registrado");
                callback(err);
            });
        };

        this.buscar = function(ubicacion, distancia, callback) {
            var bares_encontrados = [];
            var calcDist = this.calculadorDistancias;

            ModelBar.find({}, function(err, bares){
                if(!err) {
                    bares.forEach(function(bar) {
                        console.log(bar.nombre);
                        var dist = calcDist.distanciaEntre(bar.ubicacion, ubicacion);
                        console.log(dist);
                        if (dist <= distancia){
                            bares_encontrados.push(bar);
                        }
                    });
                    callback(err, bares_encontrados);
                }
                else {
                    callback(err);
                }
            });
        };

        this.actualizar = function(editedBar, callback) {
            console.log("Actualizando bar");
            if (editedBar._id) {
                ModelBar.update(
                    {_id: editedBar._id},
                    { $set: {
                        nombre: editedBar.nombre, descripcion: editedBar.descripcion,
                        direccion: editedBar.direccion, ubicacion: editedBar.ubicacion }
                    },
                    callback
                );
            }
            else {
                callback({name: "Se requiere el campo _id"});
            }
        };

        this.eliminar = function(id, callback) {
            console.log("Eliminando bar");
            if (id) {
                ModelBar.remove( {_id: id}, function(err) {
                    callback(err);
                });
            }
            else {
                callback({name: "Campo id invalido."});
            }
        };

    };
