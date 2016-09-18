
module.exports =
     function() {

        this.distanciaEntre = function(ubicacion1, ubicacion2) {
            var dist = this.distance(ubicacion1.latitud, ubicacion1.longitud, ubicacion2.latitud, ubicacion2.longitud) ;
            return dist;
        };

        // Funcion de distancia aproximada. No tiene en cuenta si
        // hay que doblar la calle o ese tipo de problemas de la vida real.
        // Es mas bien de juguete pero en nuestro contexto, sirve.
        this.distance = function (lat1, lon1, lat2, lon2) {
        	var radlat1 = Math.PI * lat1/180;
        	var radlat2 = Math.PI * lat2/180;
        	var theta = lon1-lon2;
        	var radtheta = Math.PI * theta/180;
        	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        	dist = Math.acos(dist);
        	dist = dist * 180/Math.PI;
        	dist = dist * 60 * 1.1515;
        	dist = dist * 1609.344; // a metros
        	return dist
        }
    };
