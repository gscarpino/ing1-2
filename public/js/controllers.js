angular.module('wifindAppControllers', [])

    .controller('UserCtrl', function($scope){
        console.log("Usuario");
    })

    .controller('InicioCtrl', function($scope, uiGmapGoogleMapApi, $http) {
        uiGmapGoogleMapApi.then(function(map) {
            $scope.currentPosition = { latitude: -34.588771, longitude: -58.430198 };
            $scope.map = { center: $scope.currentPosition , zoom: 13,
                events:{
                    click: function(mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        $scope.currentPosition = {latitude: e.latLng.lat(), longitude: e.latLng.lng()};
                        console.log($scope.currentPosition);
                        $scope.markers = [{
                            id: 0,
                            coords: $scope.currentPosition,
                        }];
                        $scope.$apply();
                    }
                }
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    // $scope.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };

                    $scope.map.center = $scope.currentPosition;
                });
            }
        });

        $scope.buscarCercanos = function() {
            $http({
                method: 'POST',
                url: 'http://localhost:5000/api/bares/buscar',
                data: {
                    ubicacion: $scope.currentPosition,
                    distancia: 100400
                }
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {

            });

            var bares = [
                {
                    nombre: "La Farola de Cabildo",
                    descripcion: "Un clasido de Buenos Aires.",
                    ubicacion: { latitud: -34.557279, longitud: -58.461108 },
                    direccion: "Av. Cabildo 2630, C1428AAV CABA"
                },
                {
                    nombre: "Café Martínez",
                    descripcion: "Cafe de Buenos Aires.",
                    ubicacion: { latitud: -34.556708, longitud: -58.461150},
                    direccion: "Av. Cabildo 2733, C1428AAJ CABA"
                },
                {
                    nombre: "Starbucks - Cabildo y Ruiz Huidobro",
                    descripcion: "Cafe caro y feo.",
                    ubicacion: { latitud: -34.544711, longitud: -58.471641 },
                    direccion: "Av. Cabildo 4300, C1429ABN CABA"
                }
            ];

            bares.forEach(function(bar) {
            $http({
                method: 'POST',
                url: 'http://localhost:5000/api/bares',
                data: bar
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {

            });
            });

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
