angular.module('crankSistersApp')
       .service('teamsHelp', TeamsService);

function TeamsService($http) {
  this.getTeams = function () {
    return $http.get('/teams').then(function (response) {
      console.log('response.data: ', response);
      return response.data;
    });
  };
}
