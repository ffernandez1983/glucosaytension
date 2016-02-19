// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "datos.db" }); //device
    }

    else{
      db = window.openDatabase("datos.db", '1', 'my', 1024 * 1024 * 100); // browser
    }

    $cordovaSQLite.execute(db, 'CREATE TABLE Medidas (id INTEGER PRIMARY KEY AUTOINCREMENT, glucosa INTEGER, tension INTEGER, fecha DATE)');

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.glucosa', {
    url: '/glucosa',
    views: {
      'tab-glucosa': {
        templateUrl: 'templates/tab-glucosa.html',
        controller: 'SaveCtrlG'
      }
    }
  })

  .state('tab.tension', {
    url: '/tension',
    views: {
      'tab-tension': {
        templateUrl: 'templates/tab-tension.html',
        controller: 'SaveCtrlT'
      }
    }
  })

  .state('tab.anotacionesglucosa', {
    url: '/anotacionesglucosa',
    views: {
      'tab-anotacionesglucosa': {
        templateUrl: 'templates/tab-anotacionesglucosa.html',
        controller: 'LoadCtrlG'
      }
    }
  })

  .state('tab.anotacionestension', {
    url: '/anotacionestension',
    views: {
      'tab-anotacionestension': {
        templateUrl: 'templates/tab-anotacionestension.html',
        controller: 'LoadCtrlT'
      }
    }
  })

//POR DEFECTO
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('/tab/dash');

});
