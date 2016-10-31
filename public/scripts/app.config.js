// routing
angular.module('crankSistersApp').config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    // controller: 'HomeController as home'
  }).when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register',
  }).when('/card', {
    templateUrl: 'views/card.html',
    controller: 'CardController as card',
  }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login',
  });
});
