angular.module('wifindAppControllers')
.controller('Mapa', function($scope, uiGmapGoogleMapApi, $http, $mdToast) {
    $scope.Marcadores = [];
    var GoogleMapsApi = uiGmapGoogleMapApi;
    $scope.map = {};

    ///////////////////////////
    //  Metodos de la clase  //
    ///////////////////////////

    function obtenerUbicacion(Direccion, callback) {
        GoogleMapsApi.then(function(maps) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': Direccion}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                   var ubi = new Ubicacion(results[0].geometry.location.lat(),results[0].geometry.location.lng());

                    // $scope.$parent.address = results[0].formatted_address;
                    $scope.$parent.loading = false;
                    $scope.radius = 400;

                    $scope.$emit('direccionActual', results[0].formatted_address);
                    callback(ubi);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    $scope.$parent.loading = false;
                }
            });
        });
    }

    function obtenerDireccion(ubicacion) {
        GoogleMapsApi.then(function(maps) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'location': ubicacion}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.$emit('direccionActual', results[0].formatted_address);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    $scope.$parent.loading = false;
                }
            });
        });
    }

    function centrarUbicacion(ubicacion) {
        $scope.currentPosition = ubicacion;
        $scope.map.center = $scope.currentPosition;
        $scope.map.zoom = 17;

        // $scope.$apply();
        $scope.$emit('posicionActual', $scope.currentPosition);
    }

    function colocarMarcadores(Bares) {
        $scope.Marcadores = [];
        var id = 1;

        angular.forEach(Bares, function(Bar) {
            $scope.Marcadores.push({
                id: id,
                coords: Bar.ubicacion,
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
                    title: Bar.nombre,
                    description: Bar.descripcion,
                    location: Bar.direccion,
                    options: {
                        visible: false
                    }
                }
            });

            id++;
        });
    }

    //////////////////////
    //  Inicializacion  //
    //////////////////////

    function config() {
        $scope.distancia = 400;
        $scope.radius = $scope.distancia;
        GoogleMapsApi.then(function(map) {
            $scope.currentPosition = { latitude: -34.562087, longitude: -58.456724 };
            $scope.map = {
                center: $scope.currentPosition,
                zoom: 16,
                events: {
                    click: function(mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        $scope.currentPosition = {latitude: e.latLng.lat(), longitude: e.latLng.lng()};
                        $scope.Marcadores = [{
                            id: 0,
                            coords: $scope.currentPosition,
                        }];
                        $scope.$apply();
                        $scope.$emit('posicionActual', $scope.currentPosition);

                        obtenerDireccion(e.latLng);
                    }
                }
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                    $scope.map.center = $scope.currentPosition;
                });
            }

            $scope.$emit('posicionActual', $scope.currentPosition);
        });
    }

    config();

    ////////////////////////////////////
    // Comunicacion entre controllers //
    ////////////////////////////////////

    $scope.$on('ubicarDireccion', function(event, Direccion) {
        obtenerUbicacion(Direccion, function (ubicacion) {
            centrarUbicacion(ubicacion);
            $scope.$apply();
        });
    });

    $scope.$on('mostrarBaresEnMapa', function(event, Data) {
        $scope.radius = Data.Radio;
        colocarMarcadores(Data.Bares);
    });

    $scope.$on('centrarBarEnMapa', function(event, Bar) {
        $scope.radius = 0;
        colocarMarcadores([Bar]);
        ubicacionBar = Bar.ubicacion;
        centrarUbicacion(ubicacionBar);
    });

});
