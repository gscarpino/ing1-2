var Bar = require('./bar'),
    ModelBar = require('./models/bar');

module.exports =
     function(bar, calculadorDistancias) {
        this.calculadorDistancias = calculadorDistancias;

        // metodos
        this.agregar = function(bar, successCb) {
            bar = new ModelBar( {nombre: bar.nombre, descripcion: bar.descripcion, ubicacion: bar.ubicacion, direccion: bar.direccion } );
            bar.save(function(er){
                console.log("Nuevo bar registrado");
                callback();
            });
        };

        this.buscar = function(ubicacion, distancia, callback) {
            var bares_encontrados = [];
            var calcDist = this.calculadorDistancias;

            ModelBar.find({}, function(error, bares){
                if(error){
                    // TODO refactor this
                    return res.status(500).send("Error interno");
                }
                // console.log(bares);

                bares.forEach(function(bar) {
                    if (calcDist.calcular(bar.ubicacion, ubicacion) <= distancia){
                        bares_encontrados.push(bar);
                    }
                });
                callback(bares_encontrados);
            });
        };

        this.eliminar = function(bar, callback) {
            console.log("Eliminando bar");
            // ModelBar.remove( {"id": bar.id} );
            callback();
        };

    };
