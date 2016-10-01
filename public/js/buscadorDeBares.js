angular.module('wifindAppControllers')
.controller('BuscadorDeBares', function($scope, $http, $mdToast) {
    $scope.buscarBares = function() {
        $scope.markers = [];
        console.log('Buscando bares...')
        $http({
            method: 'POST',
            url: $scope.url + '/api/bares/buscar',
            data: {
                ubicacion: $scope.currentPosition,
                distancia: $scope.distancia
            }
        }).then(function successCallback(response) {
            var Bares = response.data.bares;
            $scope.radius = $scope.distancia;
            $scop.$broadcast('mostrarBaresEnMapa', Bares);
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
                        $scope.map.zoom = 17;
                        $scope.address = results[0].formatted_address;
                        $scope.loading = false;
                        $scope.$apply();
                        $scope.buscarCercanos();
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