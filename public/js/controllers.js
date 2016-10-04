angular.module('wifindAppControllers')
  .value('site',{name: 'WifindBar', protocol: 'http', domain: 'localhost', port: '5000'})
    .controller('LoginCtrl', function($scope,$http,site,$mdToast,$window) {

        console.log('Login');
        $scope.showLogin = true;
        $scope.googleSignedIn = false;
        $scope.isRegistered = false;


        function onSignIn(googleUser) {
        	console.log('hola');
            $scope.googleSignedIn = true;
            $scope.isRegistered = true;

            var profile = googleUser.getBasicProfile();
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            $scope.userName = profile.getEmail()
            var user = {
                nombre: profile.getName(),
                email: profile.getEmail()
            };

            $http.post($scope.url + "/api/user/logged",user).then(function(response){
                    $mdToast.show({
                        hideDelay   : 1500,
                        position    : 'top right',
                        controller  : 'ToastCtrl',
                        templateUrl : 'toast-template.html'
                    });
                },
                function(error){
                    console.log("Error", error);
                });
        }
         $scope.signOut = function() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                $scope.googleSignedIn = false;
                $scope.isRegistered = false;
                console.log('User signed out.');
            });
        }

        $window.onSignIn = onSignIn;
        
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
