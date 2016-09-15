'use strict';

////////////////////////////////////////
//          CLASE USUARIO             //
////////////////////////////////////////

// Clase abstracta
// class Usuario {
//     constructor(ubicacion) {
//         if (this.constructor === Usuario) {
//             throw new TypeError('No se puede contruir la clase abstracta Usuario');
//         }

//         this._ubicacion = ubicacion;
//     }

//     buscarBar() {
//         // TODO
//         console.log('buscarBar');
//     }
// }

class BuscadorDeBares{
    constructor(nombre,ubicacion) {
        this._nombre = nombre;
        this._ubicacion = ubicacion;
    }

    get nombre() {
        return this._nombre;
    }

    get ubicacion() {
        return this._ubicacion;
    }

    calificarBar(bar,puntajeWifi, puntajeEnchufes, conjuntoCalificacionOpcionales, comentario) {
        // TODO
        console.log('calificarBar');
    }
}

// class UsuarioAnonimo extends Usuario {
//     constructor(ubicacion) {
//         super(ubicacion);
//     }
// }

////////////////////////////////////////
//          CLASE DBMANAGER           //
////////////////////////////////////////

class Administrador {
    constructor() {
        if (this.constructor === Administrador) {
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

class AdministradorDeBuscadorDeBares extends Administrador {
    buscar(BuscadorDeBares) {
        // TODO
        console.log('buscar');
    }

    guardar(BuscadorDeBares) {
        // TODO
        console.log('guardar');
    }

    borrar(BuscadorDeBares) {
        // TODO
        console.log('borrar');
    }
}

class AdministradorDeBares extends Administrador {
    buscar(ubicacion, distancia) {
        // TODO
        console.log('buscar');
    }

    guardar(bar) {
        // TODO
        console.log('guardar');
    }

    borrar(bar) {
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

    promedioCaracteristica(caracteristica){
    	// TODO
        console.log('promedioCaracteristica');
    } 

    //Conjunto de caractersiticas??
}


////////////////////////////////////////
//  CLASE CalculadorDistancias        //
////////////////////////////////////////

class CalculadorDistancias {
    constructor() {
      //??
    }

    distanciaEntre(ubicacion1, ubicacion2) {
        // TODO
        console.log('distanciaENtre');
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
//          CLASE CARACTERISTICA      //
////////////////////////////////////////

//Clase Abstractca

class Caracteristica {
    constructor(nombre, significado_menor, significado_mayor) {
    	 if (this.constructor === Usuario) {
    	    throw new TypeError('No se puede contruir la clase abstracta Caracteristica');
     	}

        this._nombre = nombre;
        this._significado_menor = significado_menor;
        this._significado_mayor = significado_mayor;
    }
}

class CaracteristicaObligatoria extends Caracteristica {
    constructor(nombre, significado_menor, significado_mayor) {super(nombre, significado_menor, significado_mayor);}
}


class CaracteristicaOpcional extends Caracteristica{
   constructor(nombre, significado_menor, significado_mayor) {super(nombre, significado_menor, significado_mayor);}
}


////////////////////////////////////////
//          CLASE CALIFICACION        //
////////////////////////////////////////

class Calificacion {
    constructor(estrellas,caracterstica) {
        this._estrellas = estrellas;
        this.caracterstica = caracterstica	
    }

    cantidadEstrellas() {
        return this._estrellas;
    }
}


////////////////////////////////////////
//          CLASE CRITICA      		  //
////////////////////////////////////////
