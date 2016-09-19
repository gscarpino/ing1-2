angular.module('wifindAppControllers', [])

    .controller('UserCtrl', function($scope){
        console.log("Usuario");
    })

    .controller('InicioCtrl', function($scope, uiGmapGoogleMapApi, $http, $mdToast) {
        $scope.markers = [];

        uiGmapGoogleMapApi.then(function(map) {
            $scope.currentPosition = { latitude: -34.549259, longitude: -58.466245 };
            $scope.map = {
                center: $scope.currentPosition,
                zoom: 13,
                events: {
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
                },
                userMarker: {
                    stroke: { color: '#3F51B5' },
                    fill: { color: '#3F51B5' }
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
            $scope.markers = [];

            $http({
                method: 'POST',
                url: 'http://localhost:5000/api/bares/buscar',
                data: {
                    ubicacion: $scope.currentPosition,
                    distancia: 800
                }
            }).then(function successCallback(response) {
                var bares = response.data.bares;

                bares.forEach(function(bar) {
                    $scope.markers.push({
                        id: bar._id,
                        coords: bar.ubicacion,
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
                            title: bar.nombre,
                            description: bar.descripcion,
                            location: bar.direccion,
                            options: {
                                visible: false
                            }
                        }
                    });
                });
            }, function errorCallback(response) {

            });
        };

        $scope.coordenadas = function(event) {
            if (event.which === 13) {
                $scope.loading = true;
                uiGmapGoogleMapApi.then(function(maps) {
                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode( { 'address': $scope.address}, function(results, status) {
                        if (status == 'OK') {
                            $scope.currentPosition = {
                                latitude: results[0].geometry.location.lat(),
                                longitude: results[0].geometry.location.lng()
                            }
                            $scope.map.center = $scope.currentPosition;
                            $scope.loading = false;
                            $scope.$apply();
                        }
                        else {
                            alert('Geocode was not successful for the following reason: ' + status);
                            $scope.loading = false;
                        }
                    });
                });
            }
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

    .controller('LoginCtrl', function($scope,$http) {

        console.log('Login');
        $scope.showLogin = true;

        $scope.login = function() {
            $scope.showLogin = true;
            console.log("logueando...")
             $http({
                method: 'POST',
                url: 'http://localhost:5000/api/user/:email',
                data: {
                    email: $scope.regEmail
                }

            }).then(function successCallback(response) {
                console.log("listo")

            }, function errorCallback(response) {
                console.log("error!")
            });
        }

        $scope.register = function() {
            $scope.showLogin = false;
            console.log("Registrando...");
                $http({
                method: 'POST',
                url: 'http://localhost:5000/api/user',
                data: {
                    email: $scope.userEmail,
                    nombre:$scope.userName,
                    password:$scope.userPass
                }
            }).then(function successCallback(response) {
                console.log("listo")

            }, function errorCallback(response) {
                console.log("error!")
            });

        }
    })

    .controller('BaresCtrl', function($scope, $http, $state, $mdToast) {

        $scope.crearNuevoBar = function() {
            console.log("agregando bar...");
            console.log("nombre: " + $scope.bar.nombre );
            console.log("direccion: " + $scope.bar.direccion );
            console.log("descripcion: " + $scope.bar.descripcion );

            var nuevoBar = {
                nombre: $scope.bar.nombre,
                descripcion: $scope.bar.descripcion,
                ubicacion: { latitude: -34.557279, longitude: -58.461108 },
                direccion: $scope.bar.direccion
            };

            $http.post($scope.url + "/api/bares", nuevoBar).then(function(response){
                    $mdToast.show({
                        hideDelay   : 1500,
                        position    : 'top right',
                        controller  : 'ToastCtrl',
                        templateUrl : 'toast-template.html'

                    })
                    .then(function() {
                        $state.go('Inicio');
                    });

                },
                function(error){
                    console.log("Error", error);
                });
        }

        $scope.eliminarBar = function() {
            console.log("Eliminando bar...");
        }

        $scope.goToState = function(state) {
            $state.go(state);
        }
    });
