angular.module('crankSistersApp')
.controller('UserController', UserController);

function UserController($http, $location) {
  console.log('UserController loaded');
  var ctrl = this;
  ctrl.allCards = [];
  //gets all cards for the user then asigns them to the allCards array
  ctrl.getCards = function () {
    console.log('Clicked');
    $http.get('/card/all').then(function (response) {
      ctrl.allCards = response.data;
      console.log(ctrl.allCards);
    });
  };

  //deletes card from database
  ctrl.deleteCard = function (id) {
    $http.delete('/card/' + id).then(function (response) {
    });
  };

  //gets sepecific card from database
  ctrl.getCard = function (id) {
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

  //logout
  ctrl.logout = function () {
    console.log('trying to logout');
    $http.get('/logout').then(function (response) {
      $location.path('/login');
    });
  };
}
