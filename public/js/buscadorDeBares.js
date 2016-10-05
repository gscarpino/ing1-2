angular.module('wifindAppControllers')
.controller('BuscadorDeBares', function($scope, $http, $mdToast) {
    $scope.distancia = 400;
    $scope.Bares = [];
    $scope.Filtros = [];
    $scope.selectedFiltro1 = { filtro: null, value: null};
    $scope.selectedFiltro2 = { filtro: null, value: null};

    buscarTodosLosBares(function(Bares) {
        $scope.Bares = Bares;
    });

    $scope.Filtros = filtrosDisponibles();

    ///////////////////////////
    //  Metodos de la clase  //
    ///////////////////////////

    function buscarBares(Ubicacion, Distancia, Filtro, callback) {
        var filtroJSON = Filtro.filtrar();

        $http({
            method: 'POST',
            url: $scope.url + '/api/bares/buscar',
            data: {
                ubicacion: Ubicacion,
                distancia: Distancia,
                filtros: filtroJSON
            }
        }).then(function successCallback(response) {
            var Bares = response.data.bares;
            callback(Bares);
        });
    }

    function buscarTodosLosBares(callback) {
        $http({
            method: 'POST',
            url: $scope.url + '/api/bares/buscar'
        }).then(function successCallback(response) {
            var Bares = response.data.bares;
            callback(Bares);
        });
    }

    function listarBaresEnMapa(Bares) {
        $scope.$broadcast('mostrarBaresEnMapa', { Bares: Bares, Radio: $scope.distancia });
    }

    function ubicarBarEnMapa(Bar) {
        $scope.$broadcast('centrarBarEnMapa', Bar);
    }

    function crearFiltroBusqueda(Caracteristicas) {
        var combinado = new FiltroVacio();

        angular.forEach(Caracteristicas, function(Caracteristica) {
            combinado = new Caracteristica.filtro(combinado, Caracteristica.valor);
        });

        return combinado;
    }

    function filtrosDisponibles() {
        // Collection<Filtro>
        return [
            {
                nombre: 'Wifi',
                clase: FiltroWifi
            },
            {
                nombre: 'Enchufes',
                clase: FiltroEnchufes
            },
            {
                nombre: 'Higiene',
                clase: FiltroHigiene
            }
        ];
    }

    /////////////////////////////
    //  Conexion con la vista  //
    /////////////////////////////

    $scope.buscarDireccion = function(event) {
        if (event.which === 13) {
            $scope.loading = true;
            $scope.$broadcast('ubicarDireccion', $scope.address);
        }
    };

    $scope.baresCercanos = function() {
        var filtrosParaAplicar = [];

        angular.forEach($scope.Filtros, function(filtro) {
            if (filtro.nombre == $scope.selectedFiltro1.filtro) {
                filtrosParaAplicar.push({
                    filtro: filtro.clase,
                    valor: Number($scope.selectedFiltro1.value)
                })
            }

            if (filtro.nombre == $scope.selectedFiltro2.filtro) {
                filtrosParaAplicar.push({
                    filtro: filtro.clase,
                    valor: Number($scope.selectedFiltro2.value)
                })
            }
        });

        var filtroCombinado = crearFiltroBusqueda(filtrosParaAplicar);

        buscarBares($scope.posicionActual, $scope.distancia, filtroCombinado, function(Bares) {
            listarBaresEnMapa(Bares);
        });
    };

    $scope.ubicarUnBar = function(Bar) {
        ubicarBarEnMapa(Bar);
    }

    ////////////////////////////////////
    // Comunicacion entre controllers //
    ////////////////////////////////////

    $scope.$on('posicionActual', function(event, Ubicacion) {
        $scope.posicionActual = Ubicacion;
    });

    $scope.$on('direccionActual', function(event, direccion) {
        $scope.address = direccion;
        $scope.$apply();
    });
})
