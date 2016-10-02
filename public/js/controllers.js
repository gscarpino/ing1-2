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
