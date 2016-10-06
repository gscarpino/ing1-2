angular.module('wifindAppControllers')

    .controller('FormularioBar', function($scope, $http, $state, $mdToast) {
        $scope.nombre = "";
        $scope.direccion = "";
        $scope.ubicacion = new Ubicacion(-34.549259, -58.466245);

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
            console.log('registrarNuevoBar');
            $scope.$broadcast('registrarNuevoBar');
        }
        
        $scope.buscarDireccion = function(event) {
            if (event.which === 13) {
                $scope.loading = true;
                $scope.$broadcast('ubicarDireccion', $scope.direccion);
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
            $scope.ubicacion = ubicacion;
        });

        $scope.$on('direccionActual', function(event, direccion) {
            console.log('direccionActual: ' + direccion);
            $scope.direccion = direccion;
            $scope.$apply();
        });

    });
