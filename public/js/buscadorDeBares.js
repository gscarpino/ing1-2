angular.module('wifindAppControllers')
.controller('BuscadorDeBares', function($scope, $http, $mdToast) {
    $scope.distancia = 400;

    // Metodos de la clase
    
    function buscarBares(Ubicacion, Distancia, Filtro, callback) {
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

    }

    function ubicarBarEnMapa(Bar) {

    }

    function crearFiltroBusqueda(Caracteristica1,Caracterstica2) {
        // Filtro    
    }

    function filtrosDisponibles() {
        // Collection<Filtro>
    }

    // Funciones de vista

    $scope.buscarDireccion = function(event) {
        if (event.which === 13) {
            $scope.loading = true;
            $scope.$broadcast('ubicarDireccion', $scope.address);
        }
    };
    
    $scope.baresCercanos = function() {
        buscarBares($scope.posicionActual, $scope.distancia, null, function(Bares) {
            $scope.$broadcast('mostrarBaresEnMapa', { Bares: Bares, Radio: $scope.distancia });
        });
    };

    $scope.$on('posicionActual', function(event, Ubicacion) {
        $scope.posicionActual = Ubicacion;
    });
})