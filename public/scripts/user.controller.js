angular.module('crankSistersApp')
.controller('UserController', UserController);

function UserController($http) {
  console.log('UserController loaded');
  var ctrl = this;
  ctrl.allCards = [];

  //gets all cards for the user then asigns them to the allCards array
  ctrl.getCards = function () {
    console.log('Clicked');
    $http.get('/card/all').then(function (response) {
      ctrl.allCards = response.data;

      // for(var i = 0, i < ctrl.allCards.length, i++) {
      //   ctrl.allCards[i].created = ctrl.allCards[i].created.toDateString();
      // }
    });
  };
}
