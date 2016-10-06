'use strict';

class Ubicacion {
    constructor(lat, lon) {
        this._lat = lat;
        this._lon = lon;
    }
    get latitud() {
        return this._lat;
    }
    get latitude() {
        return this._lat;
    }
    get lat() {
        return this._lat;
    }

	get longitud() {
        return this._lon;
    }
    get longitude() {
        return this._lon;
    }
    get lon() {
        return this._lon;
    }

    // just for Google Maps
    set latitude(lat) {
        this._lat = lat;
    }

    set longitude(lon) {
        this._lon = lon;
    }
}
