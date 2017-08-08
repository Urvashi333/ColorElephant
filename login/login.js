app.controller('LoginCtrl', [ '$scope', '$state', '$stateParams', '$window', 'loginData', '$filter', 'LoginService', 'sessionService', 'crAcl', 'DialogService', '$cookies',
  function($scope, $state, $stateParams,  $window, loginData, $filter, LoginService, sessionService, crAcl, DialogService, $cookies) {
    var userInfo = {};

    if (loginData && loginData.data) {
      if (loginData.data.role_name == 'candidate' || loginData.data.role_name == 'freelancer') {
        crAcl.setRole("ROLE_CANDIDATE");
          $state.go('app.candidate-dashboard');
      } else if (loginData.data.role_name == 'resource manager') {
        crAcl.setRole("ROLE_RM");
          $state.go('app.rm-dashboard');
      } else if (loginData.data.role_name == 'admin') {
        crAcl.setRole("ROLE_ADMIN");
        $state.go('app.admin-dashboard');
      } else if (loginData.data.role_name == 'super admin') {
        crAcl.setRole("ROLE_SUPER_ADMIN");
        $state.go('app.super-admin-dashboard.manage-users');
      }
    }
    $scope.setsession = function(data, rememberme) {

      if (data) {
          // handling session after login
          userInfo.tocken_id = data.data.tokenInformation.id;
          userInfo.name = data.data.userInformation.first_name;
          userInfo.role = data.data.userInformation.role_name;
          userInfo.user_id = data.data.userInformation.id;
          userInfo.company_id = data.data.userInformation.companyId;
          userInfo.thumbnail_image = data.data.userInformation.thumbnail_image;
          userInfo.profile_activation_status =  data.data.userInformation.profile_activation_status;
          if(data.data.profile_id){
            userInfo.profile_id = data.data.profile_id;
          }
          if(data.data.userInformation.role_name === 'freelancer'){
            userInfo.freelancer_request_for_profile_activation = data.data.userInformation.freelancer_request_for_profile_activation
          }

          var myJSON = JSON.stringify(userInfo);

          var expireDate = new Date();

          if(rememberme){
            expireDate.setDate(expireDate.getDate() + 15);
          } else {
            expireDate.setDate(expireDate.getTime() + 3 * 3600 * 1000);
          }
          sessionService.set('user', myJSON, expireDate);

          $cookies.put('profileStatus',data.data.userInformation.profile_activation_status)
          if(data.data.userInformation.role_name === 'freelancer'){
            $cookies.put('freelancerProfileStatus', data.data.userInformation.freelancer_request_for_profile_activation)
          }

          if (data.data.userInformation.role_name == 'candidate' || data.data.userInformation.role_name == 'freelancer') {
            crAcl.setRole("ROLE_CANDIDATE");
            if(data.data.userInformation.profile_activation_status === true){
              $state.go('app.candidate-dashboard');
            } else{
              $state.go('app.profile.contact-details');
            }
          } else if (data.data.userInformation.role_name == 'resource manager') {
            crAcl.setRole("ROLE_RM");
            if(data.data.userInformation.profile_activation_status === true){
              $state.go('app.rm-dashboard');
            } else {
              $state.go('app.profile.contact-details');
            }
          } else if (data.data.userInformation.role_name == 'admin') {
            crAcl.setRole("ROLE_ADMIN");
            $state.go('app.admin-dashboard');
          } else if (data.data.userInformation.role_name == 'super admin') {
            crAcl.setRole("ROLE_SUPER_ADMIN");
            $state.go('app.super-admin-dashboard.manage-users');
          }
        }
      }

      $scope.submit = function() {
        $scope.login_details.email = $filter('lowercase')($scope.login_details.email);
        LoginService.checkLoginDetails($scope.login_details).then(function(data) {

          if (data && data.status == 200 && data.data.dataStatus != 0) {
            if (data.data && data.data.tokenInformation.id) {
              $scope.setsession(data, $scope.login_details.rememberme);
            }
          } else if(data && data.data && data.data.dataStatus == 0 ){
            DialogService.invalid_file(data.data.message);
          } else {
            var message = "something went wrong, please try again sometime later!";
            DialogService.invalid_file(message);
          }
        })
      }

      $scope.checkUser = function(){

        var user =   sessionService.get('user');
        if(user && user.tocken_id){
          $state.reload();
        }
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
