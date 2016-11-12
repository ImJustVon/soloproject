angular.module('crankSistersApp')
.controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  console.log('RegisterController loaded');
  var ctrl = this;

  //registers user and saves them in the users table
  ctrl.register = function () {
    console.log('registering new user');
    $http.post('/register', {
      username: ctrl.data.username,
      password: ctrl.data.password,
      token: ctrl.data.token,
    }).then(function () {
      $location.path('/home');
    }, function (error) {

      console.log('error registering', error);
    });
  };
}
