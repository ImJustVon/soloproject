angular.module('crankSistersApp')
.controller('AdminController', AdminController);

function AdminController($http) {
  var ctrl = this;

  ctrl.getCards = function () {
    $http.get('/admin/cards').then(function (response) {
      ctrl.cardsArray = response.data;
      console.log('ctrl.cardsArray: ', ctrl.cardsArray);
    });
  };

  ctrl.getAllUsers = function () {
    $http.get('/admin/users').then(function (response) {
      ctrl.count = response.data[0].count - 1;
      console.log('count of users: ', ctrl.count);
    });
  };

  ctrl.deleteCard = function (id) {
      $http.delete('/card/' + id).then(function (response) {
      });
    };

  ctrl.viewCard = function (id) {
    console.log(id);
    $http.get('/card/' + id).then(function (response) {
      ctrl.card = response.data[0];
      $http.get('/card/picture/' + ctrl.card.image_name).then(function (response) {
        ctrl.url = response.data;
        console.log(response);
      });

      console.log(ctrl.card);
    });
  };
}
