app.controller('RegisterCtrl', ['$scope', '$state', 'registerData', '$stateParams',
  function($scope, $state, registerData, $stateParams) {

    $scope.register = {};


    $scope.class = "default";
    $scope.inputType = 'password';
    $scope.hideShowPassword = function() {
      if ($scope.inputType == 'password') {
        $scope.class = "blue";
        $scope.inputType = 'text';
      } else {
        $scope.inputType = 'password';
        $scope.class = "default";
      }

    };
    $scope.inputType1 = 'password';
    $scope.show = function(event, pass) {

      if (pass.match((/[a-z]/))) {
        var elem2 = angular.element(document.querySelector('#lletter'))
        elem2.addClass('checkregister')

      } else {
        var elem2 = angular.element(document.querySelector('#lletter'))
        elem2.removeClass('checkregister')
      }

      if (pass.match((/[A-Z]/))) {
        var elem3 = angular.element(document.querySelector('#uletter'))
        elem3.addClass('checkregister')
      } else {
        var elem3 = angular.element(document.querySelector('#uletter'))
        elem3.removeClass('checkregister')
      }

      if (pass.match((/[!@#$%^&*-]/))) {
        var elem4 = angular.element(document.querySelector('#char'))
        elem4.addClass('checkregister')
      } else {
        var elem4 = angular.element(document.querySelector('#char'))
        elem4.removeClass('checkregister')
      }

      if (pass.match((/\d/))) {
        var elem5 = angular.element(document.querySelector('#number'))
        elem5.addClass('checkregister')
      } else {
        var elem5 = angular.element(document.querySelector('#number'))
        elem5.removeClass('checkregister')
      }

      if (pass.length == 8) {
        $('#length').addClass('checkregister');
      } else if (pass.length < 8) {
        $('#length').removeClass('checkregister');
      }
    }

    $scope.submitForm = function() {


      if ($scope.register.password === $scope.register.confirmPassword) {

        alert('Almost thereâ€¦ we sent you an email with the activation link. Please click on the link to finish your registration. Check your spam folder if you donâ€™t receive an email within the next hour.');
        $state.go('access.login')

      }
    } else {
      alert('password and confirm password should match!');
    }
  }
]);
