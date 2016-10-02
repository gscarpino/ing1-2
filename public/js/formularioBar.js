angular.module('wifindAppControllers')

    .controller('FormularioBar', function($scope, $http, $state, $mdToast, uiGmapGoogleMapApi) {
        $scope.bar = {
            nombre: "",
            direccion: "",
            ubicacion: { latitude: -34.549259, longitude: -58.466245 }
        }

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

        // $scope.getCoordenadas = function(event) {
        //     if (event.which === 13) {
        //         $scope.loading = true;
        //         uiGmapGoogleMapApi.then(function(maps) {
        //             $scope.geocode({'address': $scope.bar.direccion}, function(results) {
        //                     $scope.bar.ubicacion = {
        //                         latitude: results[0].geometry.location.lat(),
        //                         longitude: results[0].geometry.location.lng()
        //                     }
        //
        //                     $scope.markers = [{
        //                         id: 0,
        //                         coords: $scope.bar.ubicacion
        //                     }];
        //
        //                     $scope.bar.direccion = results[0].formatted_address;
        //                     $scope.map.center = $scope.bar.ubicacion;
        //                     $scope.map.zoom = 18;
        //                     $scope.loading = false;
        //                     $scope.$apply();
        //             });
        //         });
        //     }
        // }

        $scope.buscarDireccion = function(event) {
            if (event.which === 13) {
                $scope.loading = true;
                $scope.$broadcast('ubicarDireccion', $scope.bar.direccion);
            }
        };

        $scope.goToState = function(state) {
            $state.go(state);
        }

        ////////////////////////////////////
        // Comunicacion entre controllers //
        ////////////////////////////////////

        $scope.$on('posicionActual', function(event, ubicacion) {
            console.log('posicionActual');
            $scope.bar.ubicacion = ubicacion;
        });

        $scope.$on('direccionActual', function(event, direccion) {
            console.log('direccionActual: ' + direccion);
            $scope.bar.direccion = direccion;
            $scope.$apply();
        });

    });
