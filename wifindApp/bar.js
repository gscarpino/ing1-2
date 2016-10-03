'use strict';

class Bar {
    constructor(nombre, descripcion, ubicacion, direccion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.direccion = direccion;
    }

 	get nombre(){return this.nombre;}
 	get descripcion(){return this.descripcion;}
 	get ubicacion(){return this.ubicacion;}
 	get direccion(){return this.direccion;}
}

module.exports = Bar;