angular.module('wifindAppControllers', [])

    .controller('UserCtrl', function($scope){
        console.log("Usuario");
    })

    .controller('InicioCtrl', function($scope,uiGmapGoogleMapApi){
        uiGmapGoogleMapApi.then(function(map) {
            $scope.currentPosition = { latitude: -34.588771, longitude: -58.430198 };
            $scope.map = { center: $scope.currentPosition , zoom: 13,
                events:{
                    click: function(mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        $scope.$apply();
                    }
                }
            };
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };

                    $scope.map.center = $scope.currentPosition;
                });
            }
        });
        //
        $scope.buscarCercanos = function() {
            $scope.markers = [{
                id: 0,
                coords: $scope.currentPosition,
                options: {
                    icon: {
                        url: 'img/bar-icon.png',
                        scaledSize: {
                            height: 40,
                            width: 40
                        }
                    }
                },
                window: {
                    title: 'Bar prueba',
                    options: {
                        visible: false
                    }
                }
            }];
        }

    })

    .controller('BuscarDir',function($scope,uiGmapGoogleMapApi){
         console.log("convertir a coordenada");
         uiGmapGoogleMapApi.then(function(maps) {
         var map = $scope.map;
         var geocoder = new google.maps.Geocoder();
         var address = document.getElementById('address').value;
             geocoder.geocode( { 'address': address}, function(results, status) {
                 if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    })

    .controller('LoginCtrl', function($scope) {
        console.log('hola');
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
