'use strict';

angular.module('awsServersApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main1', {
        url: '/1',
        templateUrl: 'app/main/main1.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
