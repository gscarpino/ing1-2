var Bar = require('./bar');

module.exports =
     function(bares, calculadorDistancias) {
        this.bares = bares;
        this.calculadorDistancias = calculadorDistancias;

        // metodos
        this.agregar = function(bar) {

        };

        this.buscar = function(ubicacion, distancia) {
            // stubbed
            var bar1 = new Bar("La Farola de Cabildo", "Un clasido de Buenos Aires.", {latitud: -34.557279, longitud: -58.461108}, "Av. Cabildo 2630, C1428AAV CABA");
            var bar2 = new Bar("Café Martínez", "Cafeteria de Buenos Aires.", {latitud: -34.556708, longitud: -58.461150}, "Av. Cabildo 2733, C1428AAJ CABA");

            var bares_encontrados = [bar1, bar2];
            return bares_encontrados;
        };

        this.eliminar = function(bar) {
            this.bares.remove( {"id": bar.id} );
        };

    };
