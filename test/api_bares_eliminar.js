var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var database = require('../config/database');
var server = require('../config/server');

require('./api_bares_agregar');
require('./api_bares_buscar');
require('./api_bares_actualizar');

describe('API de Bares', function() {
    var url = 'http://' + server.ip + ':' + server.port;

    describe('Eliminar', function() {
        it('Debe eliminar todos los bares a menos de 5000m.', function(done) {
            var datos_busqueda = {
                ubicacion: { latitude: -34.557270, longitude: -58.461100 },
                distancia: 5000
            };

            request(url)
            .post('/api/bares/buscar')
            .send(datos_busqueda)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                should(res).have.property('status', 200);
                should(res.body).have.property('bares');
                var bares = res.body.bares;

                bares.forEach(function(bar){
                    request(url)
                    .delete('/api/bares/' + bar._id)
                    .send()
                    .end(function(err_delete, res_delete) {
                        if (err_delete) {
                            throw err_delete
                        }
                        should(res_delete).have.property('status', 200);
                    });
                });

                request(url)
                .post('/api/bares/buscar')
                .send(datos_busqueda)
                .end(function(err_final, res_final) {
                    if (err_final) {
                        throw err_final;
                    }
                    should(res_final).have.property('status', 200);
                    should(res_final.body).have.property('bares');
                    should(res_final.body.bares).have.length(0);
                    done();
                });
            });
        });
    });

});
