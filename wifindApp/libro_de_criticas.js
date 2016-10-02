'use strict';

var ModelCritica = require('./models/critica');

class LibroDeCriticas {
    constructor() {
    }

    puntajesPromedio(bar, callback) {
        var promedios = {};
        ModelCritica.find({'barId': bar._id}, function(err, criticas){
            if(!err) {

                var acumulados = {}, cantidades = {};
                criticas.forEach(function(critica) {
                    critica.puntajes.forEach(function(puntajes) {
                        Object.keys(puntajes).forEach(function(caracteristica) {
                            if (Object.prototype.hasOwnProperty(promedios, caracteristica) )
                            {
                                acumulados[caracteristica] += puntajes[caracteristica];
                                cantidades[caracteristica] += 1;
                            }
                            else {
                                acumulados[caracteristica] = puntajes[caracteristica];
                                cantidades[caracteristica] = 1;
                            }
                        });
                    });
                });

                var promedios = {};
                Object.keys(acumulados).forEach(function(caracteristica) {
                    promedios[caracteristica] = acumulados[caracteristica] / cantidades[caracteristica];
                });
                callback(err, promedios);
            }
            else {
                callback(err);
            }
        });
    }
}

module.exports = LibroDeCriticas;
