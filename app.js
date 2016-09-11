angular
  .module('wifindApp', ['ngMaterial','ui.router','uiGmapgoogle-maps'])

  .config(function($stateProvider,uiGmapGoogleMapApiProvider){

    var indexState = {
      name: 'index',
      url: '/',
      templateUrl: '/public/inicio.html',
      controller: 'InicioCtrl'	
    };

    var registerUserState = {
      name: 'Nuevo Usuario',
      url: '/user/new',
      templateUrl: '/public/user.new.html',
      controller: 'UserCtrl'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(registerUserState);
    
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAgYylgy22-FeNAyLki1roQQzxNhrAChOU',
        libraries: 'weather,geometry,visualization'
    });
  })

  .value('site',{name: 'WifindBar', protocol: 'http', domain: 'wifindbar.sytes.net', port: '5000'})

  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, site, $log, $window, $http, $mdToast, $state) {
    $state.transitionTo('index');
    $scope.url = site.protocol + "://" + site.domain + ":" + site.port; 
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
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
        console.log('User signed out.');
      });
    }

    function onSignIn(googleUser) {
      $scope.googleSignedIn = true;
      var profile = googleUser.getBasicProfile();
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      var user = {
        name: profile.getName(),
        email: profile.getEmail()
      }

      $http.post($scope.url + "/user/logged",user).then(function(response){
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
    
    $window.onSignIn = onSignIn
    
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
  })

  .controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {

      $scope.closeToast = function() {
        //if (isDlgOpen) return;

        $mdToast
          .hide()
          .then(function() {
            //isDlgOpen = false;
          });
      };
  })

  .controller('UserCtrl', function($scope){
    console.log("Usuario");
  })

  .controller('InicioCtrl', function($scope,uiGmapGoogleMapApi){
    uiGmapGoogleMapApi.then(function(maps) {
	console.log("Google maps cargado!");
	$scope.map = { center: { latitude: -34.397, longitude: 150.644 }, zoom: 8 };
        //$scope.center = { latitude: -34.397, longitude: 150.644};
        //$scope.zoom = 8 ;
    });
    console.log("Inicio");
  })
