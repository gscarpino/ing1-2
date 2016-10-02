'use strict';

class Ubicacion {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
    get latitud() {
        return this.lat;
    }
	get longitud() {
        return this.lon;
    }   
}

