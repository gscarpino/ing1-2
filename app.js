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

    //Este controller podria representar la clase "AdministradorDeSesion" que es conocida por el buscadorDeBares (que para mi deberia tener otro nombre, algo relacionado con la interfaz de usuario)
    //SI fuese asi, habria que ver como acomodar alguna de las funciones que quedan colgadas aca.
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, site, $log, $window, $http, $mdToast, $state) {
        $state.go('Inicio');
        $scope.url = site.protocol + "://" + site.domain + ":" + site.port;
       

        $scope.print = function(){
            console.log(Date.now());
        };

        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

        $scope.goToState = function(state) {
            $state.go(state);
        }

        
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
