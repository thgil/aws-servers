'use strict';
(function() {

class MainController {

  constructor($scope, $http) {
    this.$http = $http;

    this.canCollapse = true;
    this.isCollapsed = true;
    this.submitted = false;
    this.thanks = false;
    this.email = '';
  }

  collapse() {
    if(this.canCollapse) this.isCollapsed = !this.isCollapsed;
  }

  submit(form) {
    this.submitted = true;
    if (form.$valid) {
      this.$http.post('/api/emails',
        { email: this.email })
      .success(function() {
        console.log('pass');
        this.thanks = true;
        this.collapse();
        this.canCollapse = false;
      }.bind(this))
      .catch(function(err) {
        console.log('err');
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('awsServersApp')
  .controller('MainController', MainController);

})();
