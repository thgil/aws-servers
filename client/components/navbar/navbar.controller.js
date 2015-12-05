'use strict';

angular.module('serverBytes')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }, {
      'title': 'Home 2',
      'state': 'main1'
    }];

    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
