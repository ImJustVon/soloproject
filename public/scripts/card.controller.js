angular.module('crankSistersApp')
.controller('CardController', CardController);

function CardController($http, $location) {
  console.log('CardController loaded');
  var ctrl = this;
  console.log(ctrl.img);
}
