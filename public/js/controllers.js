angular.module('wifindAppControllers', [])

    .controller('UserCtrl', function($scope){
        console.log("Usuario");
    })

    .controller('InicioCtrl', function($scope,uiGmapGoogleMapApi){
        uiGmapGoogleMapApi.then(function(maps) {
            console.log("Google maps cargado!");
            $scope.map = { center: { latitude: -34.397, longitude: 150.644 }, zoom: 8 };
            //$scope.center = { latitude: -34.397, longitude: 150.644};
            //$scope.zoom = 8 ;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log(pos);
                });
            }
        });
        console.log("Inicio");
    })

    .controller('BaresCtrl', function($scope, $http) {

        $scope.barData = {}

        $scope.buscarBares = function(ubicacion, distancia) {
            console.log("Buscando bares...");
        }

        $scope.agregarBar = function() {
            console.log("agregando bar...");
        }

        $scope.eliminarBar = function() {
            console.log("Eliminando bar...");
        }

    });
