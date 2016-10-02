'use strict';

var Bar = require('./bar'),
    ModelBar = require('./models/bar');

class GuiaDeBares {
    constructor(bar, calculadorDistancias) {
        this.calculadorDistancias = calculadorDistancias; 
    }

    agregar(bar, callback) {
        bar = new ModelBar( {nombre: bar.nombre, descripcion: bar.descripcion, ubicacion: bar.ubicacion, direccion: bar.direccion, wifi: bar.wifi, enchufes: bar.enchufes} );
        bar.save(function(err){
            console.log("Nuevo bar registrado");
            callback(err);
        });
    }

    buscar(ubicacion, distancia, callback) {
        var bares_encontrados = [];
        var calcDist = this.calculadorDistancias;

        ModelBar.find({}, function(err, bares){
            if(!err) {
                bares.forEach(function(bar) {
                    if (distancia) {
                        var dist = calcDist.distanciaEntre(bar.ubicacion, ubicacion);
                        if (dist <= distancia){
                            bares_encontrados.push(bar);
                        }
                    } else {
                        bares_encontrados.push(bar);
                    }
                });
                callback(err, bares_encontrados);
            }
            else {
                callback(err);
            }
        });
    }

    actualizar(editedBar, callback) {
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
    }

    eliminar(id, callback) {
        console.log("Eliminando bar");
        if (id) {
            ModelBar.remove( {_id: id}, function(err) {
                callback(err);
            });
        }
        else {
            callback({name: "Campo id invalido."});
        }
    }
}

module.exports = GuiaDeBares;