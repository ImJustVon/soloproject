// routing
angular.module('crankSistersApp').config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register',
  }).when('/card', {
    templateUrl: 'views/card.html',
    controller: 'CardController as card',
  }).when('/user', {
    templateUrl: 'views/user.html',
    controller: 'UserController as user',
  }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login',
  });
});
