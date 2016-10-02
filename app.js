angular
    .module('wifindApp', ['ngMaterial','ui.router','uiGmapgoogle-maps', 'wifindAppControllers', 'wifindAppServices'])

    .config(function($stateProvider,uiGmapGoogleMapApiProvider){
        var indexState = {
            name: 'Inicio',
            url: '/',
            templateUrl: '/public/inicio.html',
            controller: 'BuscadorDeBares'
        };

        var registerUserState = {
            name: 'Nuevo Usuario',
            url: '/user/new',
            templateUrl: '/public/sign-up/login.html',
            controller: 'LoginCtrl'
        };

        var nuevoBarState = {
            name: 'Nuevo Bar',
            url: '/bares/new',
            templateUrl: '/public/bar.new.html',
            controller: 'FormularioBar'
        };

        $stateProvider.state(indexState);
        $stateProvider.state(registerUserState);
        $stateProvider.state(nuevoBarState);

        uiGmapGoogleMapApiProvider.configure({
            // key verdadera del sitio
            // key: 'AIzaSyAgYylgy22-FeNAyLki1roQQzxNhrAChOU',
            key: 'AIzaSyBtW3QzoRs2i6j5_VnsBz-0w618rE20wjw',
            libraries: 'weather,geometry,visualization'
        });
    })

    // .value('site',{name: 'WifindBar', protocol: 'http', domain: 'wifindbar.sytes.net', port: '5000'})
    .value('site',{name: 'WifindBar', protocol: 'http', domain: 'localhost', port: '5000'})

    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, site, $log, $window, $http, $mdToast, $state) {
        $state.go('Inicio');
        $scope.url = site.protocol + "://" + site.domain + ":" + site.port;
        $scope.googleSignedIn = false;

        $scope.isRegistered = false;

        $scope.print = function(){
            console.log(Date.now());
        };

        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

        $scope.signOut = function() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                $scope.googleSignedIn = false;
                $scope.isRegistered = false;
                console.log('User signed out.');
            });
        }

        function onSignIn(googleUser) {
            $scope.googleSignedIn = true;
            $scope.isRegistered = true;
            var profile = googleUser.getBasicProfile();
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
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

        $scope.goToState = function(state) {
            $state.go(state);
        }

        $window.onSignIn = onSignIn;
    })

    .controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
        $scope.closeToast = function() {
            //if (isDlgOpen) return;

            $mdToast
            .hide()
            .then(function() {
                // isDlgOpen = false;
            });
        };
    })
