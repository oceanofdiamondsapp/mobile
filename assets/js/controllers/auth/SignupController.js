/*
| ----------------------------------------------------------------------
| SignupCtrl
| ----------------------------------------------------------------------
*/

controllers.controller('SignupController', ['$scope', '$http', '$location', 'API_BASE_URL', 'notifier', 'device',
    function($scope, $http, $location, API_BASE_URL, notifier, device) {

        /**
         * @type {Bool}
         */
        $scope.loading = false;

        /**
         * Terms checkbox status.
         *
         * @type {Bool}
         */
        $scope.doesAgree = false;

        /**
         * Boolean for whether or not the form is ready for submission.
         *
         * @param {Object} form
         *
         * @return {Bool}
         */
        $scope.formIsValid = function(form) {
            return $scope.doesAgree
                   && form.$valid
                   && $scope.user.password === $scope.user.password_confirmation;
        };

        /**
         * Attempt to signup the user.
         * 
         * @return {Void}
         */
        $scope.signup = function() {
            $scope.loading = true;

            var passwordsMatch = ($scope.user.password == $scope.user.password_confirmation);

            if (!passwordsMatch) {
                $scope.loading = false;
                return notifier('Passwords do not match', 'Error', 'OK');
            }

            if (!$scope.doesAgree) {
                $scope.loading = false;
                return notifier('Please agree to the terms', 'Error', 'OK');
            }

            $http.post(API_BASE_URL + '/accounts', $scope.user)
                .error(function(response) {
                    $scope.loading = false;
                    var message = response.error || 'Unable to create your account at this time';
                    notifier(message, 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.loading = false;

                    // Save the user to local storage.
                    localStorage.user = angular.toJson(response.data);

                    // Create auth string, save to local storage, and add it to http request header.
                    var authString = 'Basic ' + window.btoa($scope.user.email + ':' + $scope.user.password);
                    localStorage.authString = authString;
                    $http.defaults.headers.common['Authorization'] = authString;

                    // Register for push notifications
                    device.tokenHandler(window.localStorage['pn_reg_id']);

                    // Redirect user to app
                    $location.path('/app');
                });
        };
    }
]);
