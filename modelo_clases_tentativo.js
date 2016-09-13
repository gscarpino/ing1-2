'use strict';

////////////////////////////////////////
//          CLASE USUARIO             //
////////////////////////////////////////

// Clase abstracta
class Usuario {
    constructor(ubicacion) {
        if (this.constructor === Usuario) {
            throw new TypeError('No se puede contruir la clase abstracta Usuario');
        }

        this._ubicacion = ubicacion;
    }

    buscarBar() {
        // TODO
        console.log('buscarBar');
    }
}

class UsuarioRegistrado extends Usuario {
    constructor(ubicacion, nombre) {
        super(ubicacion);
        this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }

    calificarBar(bar) {
        // TODO
        console.log('calificarBar');
    }
}

class UsuarioAnonimo extends Usuario {
    constructor(ubicacion) {
        super(ubicacion);
    }
}

////////////////////////////////////////
//          CLASE DBMANAGER           //
////////////////////////////////////////

class DBManager {
    constructor() {
        if (this.constructor === DBManager) {
            throw new TypeError('No se puede construir la clase abstracta DBManager');
        }
    }

    buscar() {
        throw new Error('No se puede llamar al método abstracto buscar');
    }

    guardar() {
        throw new Error('No se puede llamar al método abstracto guardar');
    }

    borrar() {
        throw new Error('No se puede llamar al método abstracto borrar');
    }
}

class UsuarioManager extends DBManager {
    buscar() {
        // TODO
        console.log('buscar');
    }

    guardar() {
        // TODO
        console.log('guardar');
    }

    borrar() {
        // TODO
        console.log('borrar');
    }
}

class BarManager extends DBManager {
    buscar() {
        // TODO
        console.log('buscar');
    }

    guardar() {
        // TODO
        console.log('guardar');
    }

    borrar() {
        // TODO
        console.log('borrar');
    }
}

////////////////////////////////////////
//          CLASE BAR                 //
////////////////////////////////////////

class Bar {
    constructor(nombre) {
        this._nombre = nombre;
    }

    estaCerca(ubicacion) {
        // TODO
        console.log('estaCerca');
    }
}

////////////////////////////////////////
//          CLASE UBICACION           //
////////////////////////////////////////

class Ubicacion {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
}

////////////////////////////////////////
//          CLASE ATRIBUTO            //
////////////////////////////////////////

class Atributo {
    constructor(nombre, significado_menor, significado_mayor) {
        this._nombre = nombre;
        this._significado_menor = significado_menor;
        this._significado_mayor = significado_mayor;
    }
}

////////////////////////////////////////
//          CLASE CALIFICACION        //
////////////////////////////////////////

class Calificacion {
    constructor(estrellas) {
        this._estrellas = estrellas;
    }

    cantidadEstrellas() {
        return this._estrellas;
    }
}