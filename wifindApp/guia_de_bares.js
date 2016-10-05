'use strict';

var Bar = require('./bar'),
    BarModel = require('./models/bar');

class GuiaDeBares {
    constructor(calculadorDistancias, libroDeCriticas) {
        this.calculadorDistancias = calculadorDistancias;
        this.libroDeCriticas = libroDeCriticas;
    }

    agregar(bar, callback) {
        bar = new BarModel( {nombre: bar.nombre, descripcion: bar.descripcion, ubicacion: bar.ubicacion, direccion: bar.direccion, wifi: bar.wifi, enchufes: bar.enchufes} );
        bar.save(function(err){
            console.log("Nuevo bar registrado");
            callback(err);
        });
    }

    buscar(ubicacion, distancia, filtros, callback) {
        var calcDist = this.calculadorDistancias;
        var libroDeCriticas = this.libroDeCriticas;
        BarModel.find({}, function(err, bares){
            if(!err) {
                var bares_cercanos = [];
                bares.forEach(function(barSchema) {
                    if (distancia) {
                        var dist = calcDist.distanciaEntre(barSchema.ubicacion, ubicacion);
                        if (dist <= distancia){
                            bares_cercanos.push(barSchema);
                        }
                    } else {
                        bares_cercanos.push(barSchema);
                    }
                });

                if (filtros && Object.keys(filtros).length !== 0) {
                    var bares_encontrados = [];
                    bares_cercanos.forEach(function(barSchema) {
                        console.log(barSchema.nombre);
                        console.log(filtros);
                        var promedios = libroDeCriticas.puntajesPromedio(barSchema);
                        Object.keys(filtros).forEach(function(filtro) {
                            if (promedios.hasOwnProperty(filtro))
                            {
                                console.log(filtro);
                                console.log(promedios[filtro]);
                                console.log(filtros[filtro]);
                                if (promedios[filtro] >= filtros[filtro])
                                {
                                    var bar = new Bar(barSchema._id, barSchema.nombre,
                                        barSchema.descripcion, barSchema.ubicacion, barSchema.direccion, promedios);
                                    bares_encontrados.push(bar);
                                }
                            }
                        });
                    });
                    callback(err, bares_encontrados);
                }
                else {
                    callback(err, bares_cercanos);
                }
            }
            else {
                callback(err);
            }
        });
    }

    actualizar(editedBar, callback) {
        console.log("Actualizando bar");
        if (editedBar._id) {
            BarModel.update(
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
    }

    eliminar(id, callback) {
        console.log("Eliminando bar");
        if (id) {
            BarModel.remove( {_id: id}, function(err) {
                callback(err);
            });
        }
        else {
            callback({name: "Campo id invalido."});
        }
    }
}

module.exports = GuiaDeBares;
