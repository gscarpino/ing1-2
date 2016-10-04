'use strict';

var BarModel = require('./models/bar');

class LibroDeCriticas {
    constructor() {
    }

    puntajesPromedio(bar) {
        var acumulados = {}, cantidades = {};
        bar.criticas.forEach(function(critica) {
            var puntajes = critica.puntajes.toObject();
            Object.keys(puntajes).forEach(function(caracteristica) {
                var puntaje = puntajes[caracteristica];
                if (Object.prototype.hasOwnProperty(promedios, caracteristica) )
                {
                    acumulados[caracteristica] += puntaje;
                    cantidades[caracteristica] += 1;
                }
                else {
                    acumulados[caracteristica] = puntaje;
                    cantidades[caracteristica] = 1;
                }
            });
        });

        var promedios = {};
        Object.keys(acumulados).forEach(function(caracteristica) {
            promedios[caracteristica] = acumulados[caracteristica] / cantidades[caracteristica];
        });
        return promedios;
    };

}

module.exports = LibroDeCriticas;
