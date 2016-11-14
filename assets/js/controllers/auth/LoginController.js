/*
| ----------------------------------------------------------------------
| LoginController
| ----------------------------------------------------------------------
*/

controllers.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'API_BASE_URL', 'notifier', 'device',
    function($rootScope, $scope, $http, $location, API_BASE_URL, notifier, device) {

        $scope.user = {
            // email: "chriseen313@gmail.com",
            // password: "password"
        };
        
        /**
         * Attempt to login the user.
         * 
         * @return {Void}
         */
        $scope.login = function() {
            $scope.loading = true;

            var formIsValid = ($scope.user.email && $scope.user.password);

            if (!formIsValid) {
                $scope.loading = false;
                return notifier('The email and password fields are required', 'Error', 'OK');
            }

            var authString = 'Basic ' + window.btoa($scope.user.email + ':' + $scope.user.password);
            $http.defaults.headers.common['Authorization'] = authString;

            $http.post(API_BASE_URL + '/auth/login', $scope.user)
                .error(function(response) {
                    $scope.loading = false;
                    var message = response.error || 'Unable to log you in at this time';
                    notifier(message, 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.loading = false;
                    localStorage.user = angular.toJson(response.data);
                    localStorage.authString = authString;
                    device.tokenHandler(window.localStorage['pn_reg_id']);
                    $location.path('/app');
                });
        };

        $scope.onForgotPassword = function(){

            if (!navigator.notification || $scope.fp_loading) return;

            navigator.notification.prompt(
                "Please enter your email and we'll send you a link to reset your password.",
                function(data){
                    $scope.$apply(function(){
                        if (data.buttonIndex != 1) return;
                        if (!$rootScope.isValidEmail(data.input1)){
                            notifier('Please enter a valid email.', 'Error', 'OK');
                            return;
                        }

                        $scope.fp_loading = true;

                        $http.post(API_BASE_URL + '/auth/password/email', {
                            email: data.input1
                        })
                        .error(function(response) {
                            $scope.fp_loading = false;
                            var message = response.error || 'Unable to send a confirmation email at this time.';
                            notifier(message, 'Error', 'OK');
                        })
                        .success(function(response) {
                            $scope.fp_loading = false;
                            if (response.success){
                                var message = 'Confirmation email was sent successfully.';
                                notifier(message, 'Success', 'OK');
                            }
                        });
                    })
                },
                "Forgot Password"
            );
        }

    }
]);
