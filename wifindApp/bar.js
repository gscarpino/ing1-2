'use strict';

class Bar {
    constructor(id, nombre, descripcion, ubicacion, direccion, promedios) {
        this._id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.direccion = direccion;
        this.promedios = promedios;
    }


    // get id(){return this._id;}
    // get nombre(){return this.nombre;}
 // 	get descripcion(){return this.descripcion;}
 // 	get ubicacion(){return this.ubicacion;}
 // 	get direccion(){return this.direccion;}
    // get promedios(){return this.promedios;}

}

module.exports = Bar;
