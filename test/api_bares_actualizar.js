var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var database = require('../config/database');
var server = require('../config/server');

require('./api_bares_agregar');
require('./api_bares_buscar');

describe('API de Bares', function() {
    var url = 'http://' + server.ip + ':' + server.port;

    describe('Actualizar', function() {
        it('Debe actualizar todos los bares que están a menos de 200m.', function(done) {
            var datos_busqueda = {
                ubicacion: { latitude: -34.557279, longitude: -58.461108 },
                distancia: 200
            };

            // Pido todos los bares a menos de 200m
            request(url)
            .post('/api/bares/buscar')
            .send(datos_busqueda)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                should(res).have.property('status', 200);
                should(res.body).have.property('bares');
                // Actualizo cada bar
                var bares = res.body.bares;
                bares.forEach(function(bar){
                    bar.nombre = "PEPITO";
                    request(url)
                    .put('/api/bares/')
                    .send(bar)
                    .end(function(err_upd, res_upd) {
                        if (err_upd) {
                            throw err_upd
                        }
                        should(res_upd).have.property('status', 200);
                    });
                });

                // Pido otra vez, todos los bares a menos de 200m
                request(url)
                .post('/api/bares/buscar')
                .send(datos_busqueda)
                .end(function(err_final, res_final) {
                    if (err_final) {
                        throw err_final;
                    }
                    should(res_final).have.property('status', 200);
                    should(res_final.body).have.property('bares');
                    var bares_final = res_final.body.bares;
                    bares_final.forEach(function(bar){
                        should(bar).have.property('nombre', 'PEPITO');
                    });
                    done();
                });
            });

        });
    });
});
