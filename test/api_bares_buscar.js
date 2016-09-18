var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var database = require('../config/database');
var server = require('../config/server');
require('./api_bares_agregar');

describe('API de Bares', function() {
    var url = 'http://' + server.ip + ':' + server.port;

    describe('Buscar', function() {
        it('Debe encontrar 2 bares de 3, correctamente.', function(done) {
            var datos_busqueda = {
                ubicacion: { latitude: -34.557279, longitude: -58.461108 },
                distancia: 400
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
                should(res.body.bares).have.length(2);
                done();
            });
        });
    });
});
