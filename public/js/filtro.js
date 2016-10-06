'use strict';

class Filtro {
    constructor() {
        if (this.constructor === Filtro) {
            throw new TypeError('No se puede construir la clase abstracta Filtro');
        }
    }

    filtrar() {
        throw new Error('No se puede llamar al método abstracto filtrar');
    }
}

class FiltroVacio extends Filtro {
    filtrar() {
        return {};
    }
}

class FiltroAdicional extends Filtro {
    constructor(Filtro, Value) {
        super();
        if (this.constructor === FiltroAdicional) {
            throw new TypeError('No se puede construir la clase abstracta FiltroAdicional');
        }

        this.filtroExtra = Filtro;
        this.value = Value;
    }

    filtrar() {
        return this.filtroExtra.filtrar();
    }
}

class FiltroEnchufes extends FiltroAdicional {
    filtrar() {
        var baseFilter = super.filtrar();
        baseFilter.enchufes = this.value;

        return baseFilter;
    }
}

class FiltroHigiene extends FiltroAdicional {
    filtrar() {
        var baseFilter = super.filtrar();
        baseFilter.higiene = this.value;

        return baseFilter;
    }
}

class FiltroWifi extends FiltroAdicional {
    filtrar() {
        var baseFilter = super.filtrar();
        baseFilter.wifi = this.value;

        return baseFilter;
    }
}

class FiltroPrecios extends FiltroAdicional {
    filtrar() {
        var baseFilter = super.filtrar();
        baseFilter.precios = this.value;

        return baseFilter;
    }
}