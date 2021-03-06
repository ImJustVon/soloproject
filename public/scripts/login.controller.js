angular.module('crankSistersApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function () {
    console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password,
    }).then(function (response) {
      console.log(response);
      if (response.data.group === 'admin') {
        $location.path('/admin');
      } else {
        $location.path('/user');
      }
    }, function (error) {

      console.log('error loggin in', error);
    });
  };
}
