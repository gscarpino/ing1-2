angular.module('wifindAppControllers')
.controller('BuscadorDeBares', function($scope, $http, $mdToast) {
    $scope.distancia = 400;
    $scope.Bares = [];
    $scope.Filtros = [];

    buscarTodosLosBares(function(Bares) {
        $scope.Bares = Bares;
    });

    $scope.Filtros = filtrosDisponibles();

    ///////////////////////////
    //  Metodos de la clase  //
    ///////////////////////////

    function buscarBares(Ubicacion, Distancia, Filtro, callback) {
        var filtroJSON = Filtro.filtrar();
        console.log(filtroJSON);

        $http({
            method: 'POST',
            url: $scope.url + '/api/bares/buscar',
            data: {
                ubicacion: Ubicacion,
                distancia: Distancia
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

    function crearFiltroBusqueda(Caracteristica1, Caracterstica2) {
        // Filtro
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
        var filtroActual = null;
        console.log($scope.selectedFiltro);
        angular.forEach($scope.Filtros, function(filtro) {
            if (filtro.nombre == $scope.selectedFiltro.filtro) {
                filtroActual = new filtro.clase(new FiltroVacio(), $scope.selectedFiltro.value);
            }
        });

        buscarBares($scope.posicionActual, $scope.distancia, filtroActual, function(Bares) {
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
