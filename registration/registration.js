app.controller('RegisterCtrl', ['$scope', '$state', 'registerData', '$stateParams', '$cookies', '$filter', 'registerService', 'DialogService',
 function($scope, $state, registerData, $stateParams, $cookies, $filter, registerService, DialogService) {

  $scope.register={};

  var access_token = $cookies.get('register_access_token');

  if(access_token){
    $scope.othersEmailFeild=true;
    $scope.freelancerEmailFeild=false;

  } else{
    $scope.othersEmailFeild=false;
   $scope.freelancerEmailFeild=true;
  }

  if(registerData){
    $scope.register.email = registerData.data.email;
    $scope.firstName = registerData.data.first_name;
    $scope.lastName = registerData.data.last_name;

  }
  $scope.class = "default";
  $scope.inputType = 'password';
  $scope.hideShowPassword = function(){
    if ($scope.inputType == 'password'){
     $scope.class = "blue";
     $scope.inputType = 'text';
   } else{
    $scope.inputType = 'password';
    $scope.class = "default";
  }

};
$scope.inputType1 = 'password';
   $scope.show=function(event,pass){

        if(pass.match((/[a-z]/))){
         var elem2 = angular.element(document.querySelector('#lletter'))
         elem2.addClass('checkregister')

        }else{
         var elem2 = angular.element(document.querySelector('#lletter'))
         elem2.removeClass('checkregister')
       }

       if(pass.match((/[A-Z]/))){
        var elem3 = angular.element(document.querySelector('#uletter'))
        elem3.addClass('checkregister')
      }else{
        var elem3 = angular.element(document.querySelector('#uletter'))
        elem3.removeClass('checkregister')
      }

      if(pass.match((/[!@#$%^&*-]/))){
        var elem4 = angular.element(document.querySelector('#char'))
        elem4.addClass('checkregister')
      }else{
       var elem4 = angular.element(document.querySelector('#char'))
       elem4.removeClass('checkregister')
     }

     if(pass.match((/\d/))){
      var elem5 = angular.element(document.querySelector('#number'))
      elem5.addClass('checkregister')
    }else{
      var elem5 = angular.element(document.querySelector('#number'))
      elem5.removeClass('checkregister')
    }

    if ( pass.length == 8 ) {
     $('#length').addClass('checkregister');
   } else if(pass.length < 8){
     $('#length').removeClass('checkregister');
   }
 }

 $scope.submitForm = function(){

  if(access_token && $scope.register.email){

    if($scope.register.password === $scope.register.confirmPassword){

      $scope.register.email = $filter('lowercase')($scope.register.email);

      $scope.register.page_name = "first_time_login";
      registerService.postRegister($scope.register, access_token).then(function(response) {

        var message = 'Almost thereâ€¦ we sent you an email with the activation link. Please click on the link to finish your registration. Check your spam folder if you donâ€™t receive an email within the next hour.';
        DialogService.register_success_file(message);
        $state.go('access.login')

      });
    } else {
      var message = 'password and confirm password should match!';
      DialogService.invalid_file(message);
    }

  } else if(!access_token && $scope.register.email &&  $scope.freelancerEmailFeild){

    if($scope.register.password === $scope.register.confirmPassword){

      $scope.register.email = $filter('lowercase')($scope.register.email);

      $scope.register.emailVerified = false;
      $scope.register.market_visibility = true;
      $scope.register.internal_visibility = true;
      $scope.register.is_active = true;
      $scope.register.registration_status = true;

      registerService.postFreelancerRegister($scope.register).then(function(response) {
        if(response && response.status == 200){
          var message = 'Almost thereâ€¦ we sent you an email with the activation link. Please click on the link to finish your registration. Check your spam folder if you donâ€™t receive an email within the next hour.';
          DialogService.register_success_file(message);
          $state.go('access.login')
        } else if(response && response.data && response.data.error && response.data.error.statusCode == 422){

          var message = 'email id already exists';
          DialogService.invalid_file(message);

        }

      });

    } else{

      var message = 'password and confirm password should match!';
      DialogService.invalid_file(message);
    }
  } else{
    var message = 'invalid request';
    DialogService.invalid_file(message);
  }
}


}]);
