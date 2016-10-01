angular.module('wifindAppControllers', [])
.controller('Mapa', function($scope, uiGmapGoogleMapApi, $http, $mdToast) {
    $scope.markers = [];
    $scope.map = {};
    
    config();

    function config() {
        $scope.distancia = 400;
        $scope.radius = $scope.distancia;
        uiGmapGoogleMapApi.then(function(map) {
            $scope.currentPosition = { latitude: -34.562087, longitude: -58.456724 };
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
                    $scope.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                    $scope.map.center = $scope.currentPosition;
                });
            }
        });
    }
    
    function obtenerUbicacion(Direccion) {
        if (event.which === 13) {
            $scope.loading = true;
            uiGmapGoogleMapApi.then(function(maps) {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': $scope.address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var Ubicacion = {
                            lat: results[0].geometry.location.lat(),
                            lon: results[0].geometry.location.lng()
                        };

                        $scope.address = results[0].formatted_address;
                        $scope.loading = false;
                        $scope.$apply();
                        // $scope.buscarCercanos();
                        
                        return Ubicacion;
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                        $scope.loading = false;
                    }
                });
            });
        }
    }

    function obtenerDireccion(Ubicacion) {
        // NO SE QUE HACE ESTA FUNCION
    }

    function centrarUbicacion(Ubicacion) {
        $scope.currentPosition = {
            latitude: Ubicacion.lat,
            longitude: Ubicacion.lon
        }
        $scope.map.center = $scope.currentPosition;
        $scope.map.zoom = 17;
    }

    function agregarMarcadores(Bares) {
        $scope.markers = [];

        angular.forEach(Bares, function(Bar) {
            $scope.markers.push({
                // id: id,
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
        });
    }

    $scope.$on('obtenerUbicacion', function(Direccion) {
        var Ubicacion = obtenerUbicacion(Direccion);
        centrarUbicacion(Ubicacion);
    });

    $scope.$on('mostrarBaresEnMapa', function(Bares) {
        agregarMarcadores(Bares);
    });
});