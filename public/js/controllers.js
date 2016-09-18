angular.module('wifindAppControllers', [])

    .controller('UserCtrl', function($scope){
        console.log("Usuario");
    })

 .controller('InicioCtrl', function($scope,uiGmapGoogleMapApi){
        uiGmapGoogleMapApi.then(function(maps) {
            console.log("Google maps cargado!");
            $scope.currentPosition = { latitude: -34.588771, longitude: -58.430198 };
            $scope.map = { center: $scope.currentPosition , 
                           zoom: 13,
                           events: {
                                click: function (map, click, MouseEvent) {
                                    

                                    var e = originalEventArgs[0];
                                    var lat = e.latLng.lat(),lon = e.latLng.lng();
                                    var marker = {
                                        id: Date.now(),
                                        coords: {
                                            latitude: lat,
                                            longitude: lon
                                        }
                                    };
                                    $scope.map.markers.push(marker);
                                    console.log($scope.map.markers);
                                    $scope.$apply();
                                }
        }};

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                    $scope.map = { center: $scope.currentPosition , zoom: 13};
                });
            }
            console.log($scope.currentPosition);
                    
        });
        
        console.log("Inicio");
    })


    .controller('LoginCtrl', function($scope) {
        console.log('hola');
        $scope.map;
        $scope.showLogin = true;

        $scope.login = function() {
            $scope.showLogin = true;
        }

        $scope.register = function() {
            $scope.showLogin = false;
        }
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
