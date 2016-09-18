var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var database = require('../config/database');
var server = require('../config/server');

describe('API de Bares', function() {
    var url = 'http://' + server.ip + ':' + server.port;

    before(function(done) {
        mongoose.connect(database.uri);
        done();
    });

    describe('Agregar', function() {
        it('Debe crear 3 bares correctamente.', function(done) {
            var bares = [
                {
                    nombre: "La Farola de Cabildo",
                    descripcion: "Un clasido de Buenos Aires.",
                    ubicacion: { latitud: -34.557279, longitud: -58.461108 },
                    direccion: "Av. Cabildo 2630, C1428AAV CABA"
                },
                {
                    nombre: "Café Martínez",
                    descripcion: "Cafe de Buenos Aires.",
                    ubicacion: { latitud: -34.556708, longitud: -58.461150},
                    direccion: "Av. Cabildo 2733, C1428AAJ CABA"
                },
                {
                    nombre: "Starbucks - Cabildo y Ruiz Huidobro",
                    descripcion: "Cafe caro y feo.",
                    ubicacion: { latitud: -34.544711, longitud: -58.471641 },
                    direccion: "Av. Cabildo 4300, C1429ABN CABA"
                }
            ];

            var countDone = 0;
            var isDone = function(cant) {
                if (cant > 2)
                {
                    done();
                }
            }

            bares.forEach(function(bar) {
                request(url)
                .post('/api/bares')
                .send(bar)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    should(res).have.property('status', 200);
                    isDone(++countDone);
                });
            });

        });
    });
});
