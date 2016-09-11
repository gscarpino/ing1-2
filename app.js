angular
  .module('wifindApp', ['ngMaterial'])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $window) {
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
  });