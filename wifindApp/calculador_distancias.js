'use strict';
var http = require('http');

class CalculadorDistancias {
    constructor() {
    	 if (this.constructor === CalculadorDistancias) {
    	    throw new TypeError('No se puede contruir la clase abstracta CalculadorDistancias');
     	}
    }

    distanciaEntre(ubicacion1, ubicacion2) {
        var dist = this.distance(ubicacion1.latitude, ubicacion1.longitude, ubicacion2.latitude, ubicacion2.longitude);
        return dist;
    }

    distance(lat1, lon1, lat2, lon2) {
        throw new Error('No se puede llamar al método abstracto distance');
    }
}

class DistanciaHaversine extends CalculadorDistancias {
    // Funcion de distancia aproximada. No tiene en cuenta si
    // hay que doblar la calle o ese tipo de problemas de la vida real.
    // Es mas bien de juguete pero en nuestro contexto, sirve.
    distance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1609.344; // a metros
        return dist;
    }
}

class DistanciaGoogleApi extends CalculadorDistancias {
    // Distancia calculada usando la api de google 
    // que utiliza las rutas de las calles como si 
    // uno viajara en un vehiculo (distancia real)
    distance(lat1, lon1, lat2, lon2) {
        return http.get({
            host: 'maps.googleapis.com',
            path: '/maps/api/distancematrix/json?origins='+lat1+','+lon1+'&destinations='+lat2+','+lon2+'&key=AIzaSyBtW3QzoRs2i6j5_VnsBz-0w618rE20wjw' 
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsedData = JSON.parse(body);
                return parsedData.rows.elements[0].distance.value;
            });
        });
    }
}

module.exports = DistanciaHaversine;