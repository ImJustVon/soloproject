angular.module('crankSistersApp')
.controller('AdminController', AdminController);

function AdminController($http) {
  var ctrl = this;

  ctrl.getCards = function () {
    $http.get('/card/all', function (response) {
      ctrl.cardsArray = response.data;
    });
  };

  ctrl.getAllUsers = function () {
    $http.get('/users', function (response) {
      ctrl.count = response.data;
    });
  };
}
