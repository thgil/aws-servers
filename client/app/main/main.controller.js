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
    this.loading = false;
    this.error = {};
  }

  collapse() {
    if(this.canCollapse) this.isCollapsed = !this.isCollapsed;
  }

  submit(form) {
    this.submitted = true;

    if (form.$valid) {
      this.loading = true;
      this.$http.post('/api/emails',
        { email: this.email })
      .success(function() {
        this.loading = false;
        this.thanks = true;
        this.canCollapse = false;
      }.bind(this))
      .catch(function(err) {
        this.loading = false;

        err = err.data;
        this.error = {};
        form.email.$setValidity('mongoose', false);
        this.error = err.message;
        console.log(this.error);
      }.bind(this));
    }
  }
}

angular.module('awsServersApp')
  .controller('MainController', MainController);

})();
