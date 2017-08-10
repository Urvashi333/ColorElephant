app.controller('LoginCtrl', [ '$scope', '$state', '$stateParams', '$window', 'loginData', '$filter', 'LoginService', 'sessionService', 'crAcl', 'DialogService', '$cookies',
  function($scope, $state, $stateParams,  $window, loginData, $filter, LoginService, sessionService, crAcl, DialogService, $cookies) {
    var userInfo = {};


      $scope.submit = function() {
        $scope.login_details.email = $filter('lowercase')($scope.login_details.email);
        state.go('app.employee-details.employee-form')
      }


      $scope.inputType = 'password';
      $scope.changeColor = "default";

    // Hide & show password function
    $scope.hideShowPassword = function() {
      if ($scope.inputType == 'password') {
        $scope.changeColor = "blue";
        $scope.inputType = 'text';
      } else {
        $scope.inputType = 'password';
        $scope.changeColor = "default";

      }
    };


  }
  ]);
