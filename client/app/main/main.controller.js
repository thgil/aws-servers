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
    if(this.canCollapse) { this.isCollapsed = !this.isCollapsed; }
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
        this.error = err.errors.email.message;
      }.bind(this));
    }
  }
}

angular.module('serverBytes')
  .controller('MainController', MainController)
  .directive('overwriteEmail', function() {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return {
      require: 'ngModel',
      restrict: '',
      link: function(scope, elm, attrs, ctrl) {
        if (ctrl) {
          ctrl.$validators.email = function(modelValue) {
            return ctrl.$isEmpty(modelValue) || re.test(modelValue);
          };
        }
      }
    };
  });
})();
