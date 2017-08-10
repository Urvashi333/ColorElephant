angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'pages/app.html'
                    })
                    .state('app.login', {
                        url: '/login',
                        templateUrl: 'pages/login/login.html',
                        controller:'LoginCtrl'
                    })

                    .state('app.registration', {
                        url: '/registration',
                        abstract:true,
                        templateUrl: 'pages/registration/.html',
                        controller: 'RegisterCtrl',

                    })

                    .state('app.employee-form', {
                        url: '/employee-form',
                        abstract:true,
                        templateUrl: 'pages/employee-details/employee-form.html',
                        controller: 'RegisterCtrl',
                    })
}]);
