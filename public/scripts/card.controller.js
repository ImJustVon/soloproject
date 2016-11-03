angular.module('crankSistersApp')
.controller('CardController', CardController);

function CardController($http, $location, teamsHelp, Upload) {
  console.log('CardController loaded');
  var ctrl = this;

  ctrl.check = function () {
    console.log(ctrl.img);
  };

  ctrl.getTeams = function () {
    teamsHelp.getTeams().then(function (list) {
      console.log('list: ', list);
      ctrl.teamsList = list;
    });
  };

  //posts the card object to the server with the file object embeded

  ctrl.postCard = function () {
    Upload.upload({
      url: '/card',
      method: 'post',
      data: ctrl.upload,
    });
  };

  //   ctrl.postCard = function () {
  //     console.log(ctrl.file);
  //     $http.post('/card', { file: ctrl.file });
  //   };
}
