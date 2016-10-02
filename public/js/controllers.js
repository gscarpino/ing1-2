angular.module('wifindAppControllers')

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
