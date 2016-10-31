angular.module('crankSistersApp')
.controller('CardController', CardController);

function CardController($http, $location) {
  console.log('CardController loaded');
  var ctrl = this;
  ctrl.check = function () {
    console.log(ctrl.img);
  };

  ctrl.postCard = function () {
    $http.post('/card', {
      file: ctrl.img,
    });
  };
}
