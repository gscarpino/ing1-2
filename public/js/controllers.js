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
                zoom: 16,
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
            console.log('Buscando bares...')
            $http({
                method: 'POST',
                url: $scope.url + '/api/bares/buscar',
                data: {
                    ubicacion: $scope.currentPosition,
                    distancia: 400
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
                $scope.map.zoom = 16;
            }, function errorCallback(response) {

            });
        };

        $scope.coordenadas = function(event) {
            if (event.which === 13) {
                $scope.loading = true;
                uiGmapGoogleMapApi.then(function(maps) {
                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode( { 'address': $scope.address}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $scope.currentPosition = {
                                latitude: results[0].geometry.location.lat(),
                                longitude: results[0].geometry.location.lng()
                            }
                            console.log(results[0].formatted_address);
                            $scope.map.center = $scope.currentPosition;
                            $scope.map.zoom = 18;
                            $scope.address = results[0].formatted_address;
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
                 if (status == google.maps.GeocoderStatus.OK) {
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
                url: $scope.url + '/api/user/email',
                data: {
                    email:$scope.regEmail
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
                url: $scope.url + '/api/user',
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

    .controller('BaresCtrl', function($scope, $http, $state, $mdToast, uiGmapGoogleMapApi) {
        $scope.bar = {
            nombre: "",
            direccion: "",
            ubicacion: { latitude: -34.549259, longitude: -58.466245 }
        }

        $scope.geocode = function(input, next) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( input, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    next(results);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    $scope.loading = false;
                }
            });
        }

        uiGmapGoogleMapApi.then(function(map) {
            $scope.map = {
                center: $scope.bar.ubicacion,
                zoom: 16,
                events: {
                    click: function(mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        $scope.bar.ubicacion = {latitude: e.latLng.lat(), longitude: e.latLng.lng()};
                        $scope.markers = [{
                            id: 0,
                            coords: $scope.bar.ubicacion
                        }];

                        $scope.geocode({'location' : e.latLng}, function(results){
                            $scope.bar.direccion = results[0].formatted_address;
                            $scope.$apply();
                        });
                    }
                }
            };
        });

        $scope.carecteristicas = [
            {
                nombre: "Tiene Wi-Fi?",
                descripcion: "El sitio cuanta con Wi-Fi gratuito disponible para los clientes.",
                check: true
            },
            {
                nombre: "Tiene enchufes?",
                descripcion: "El sitio cuanta con enchufes gratuito disponible para los clientes.",
                check: true
            }
        ];

        $scope.crearNuevoBar = function() {
            console.log("agregando bar...");
            console.log("nombre: " + $scope.bar.nombre );
            console.log("direccion: " + $scope.bar.direccion );
            console.log("ubicacion: ");
            console.log($scope.bar.ubicacion );
            console.log("descripcion: " + $scope.bar.descripcion );

            var nuevoBar = {
                nombre: $scope.bar.nombre,
                descripcion: $scope.bar.descripcion,
                ubicacion: $scope.bar.ubicacion,
                direccion: $scope.bar.direccion,
                wifi: $scope.carecteristicas[0].check,
                enchufes: $scope.carecteristicas[1].check,
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

        $scope.getCoordenadas = function(event) {
            if (event.which === 13) {
                $scope.loading = true;
                uiGmapGoogleMapApi.then(function(maps) {
                    $scope.geocode({'address': $scope.bar.direccion}, function(results) {
                            $scope.bar.ubicacion = {
                                latitude: results[0].geometry.location.lat(),
                                longitude: results[0].geometry.location.lng()
                            }

                            $scope.markers = [{
                                id: 0,
                                coords: $scope.bar.ubicacion
                            }];

                            $scope.bar.direccion = results[0].formatted_address;
                            $scope.map.center = $scope.bar.ubicacion;
                            $scope.map.zoom = 18;
                            $scope.loading = false;
                            $scope.$apply();
                    });
                });
            }
        }

        $scope.eliminarBar = function() {
            console.log("Eliminando bar...");
        }

        $scope.goToState = function(state) {
            $state.go(state);
        }
    });
