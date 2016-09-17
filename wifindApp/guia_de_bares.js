var bar = require('./bar'),

var GuiaDeBares = new function(bares) {
    this.bares = bares;

    this.agregar = function(bar) {

    };

    this.buscar = function(ubicacion, distancia) {
        // stubbed
        var bar1 = new Bar("La Farola de Cabildo", "Un clasido de Buenos Aires.", {"latitud": -34.557279, "longitud": -58.461108}, "Av. Cabildo 2630, C1428AAV CABA");
        var bar2 = new Bar("La Farola de Cabildo", "Un clasido de Buenos Aires.", {"latitud": -34.557279, "longitud": -58.461108}, "Av. Cabildo 2630, C1428AAV CABA");

        var bares_encontrados = [bar1, bar2];
        return bares_encontrados;
    };

    this.eliminar = function(bar) {
        this.bares.remove( {"id": bar.id} );
    };

};

module.exports = GuiaDeBares
