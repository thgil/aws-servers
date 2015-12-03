'use strict';
(function() {

class MainController {

  constructor($scope) {
    this.isCollapsed = false;
  }

  click() {
    this.test = !this.test;
    console.log(this.test);
  }
}

angular.module('awsServersApp')
  .controller('MainController', MainController);

})();
