/*
| ----------------------------------------------------------------------
| AccountController
| ----------------------------------------------------------------------
*/

controllers.controller('AccountController', ['$rootScope', '$scope', '$state', '$http', 'API_BASE_URL', 'notifier',
    function($rootScope, $scope, $state, $http, API_BASE_URL, notifier) {

        // If a state was not provided, go to the account state.
        if ($state.current.name === 'app.account') {
            $state.go('app.account.overview');
        }

        // Retrieve the authenticated user from local storage.
        $scope.user = angular.fromJson(localStorage.user);

        /**
         * Display a confirm dialog to make sure the user wishes to logout.
         * 
         * @return {Void}
         */
        $scope.logout = function() {
            if (navigator.notification) {
                navigator.notification.confirm(
                    'Are you sure you want to logout?',
                    performLogout,
                    'Logout', ['Logout', 'Cancel']
                );
            } else {
                performLogout(confirm('Are you sure you want to logout?'));
            }
        }

        /**
         * Logout the current user.
         * 
         * @param  {Number} buttonIndex
         * @return {Void}
         */
        function performLogout(buttonIndex) {
            if (buttonIndex == 1) {
                $rootScope.$emit('userLoggedOut');
            }
        }

        /**
         * Update the user's password.
         * 
         * @return {Void}
         */
        $scope.updatePassword = function() {
            $scope.updatingPassword = true;

            $http.post(API_BASE_URL + '/accounts/' + $scope.user.id, {
                    method: '_PATCH',
                    password: $scope.password,
                    password_confirmation: $scope.passwordConfirmation
                })
                .error(function(response) {
                    $scope.updatingPassword = false;
                    notifier('Unable to update your password', 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.updatingPassword = false;
                    notifier('Your password has been updated', 'Success', 'OK');
                    var authString = 'Basic ' + window.btoa(response.data.email + ':' + $scope.password);
                    $http.defaults.headers.common['Authorization'] = authString;
                    localStorage.user = angular.toJson(response.data);
                    localStorage.authString = authString;
                    $scope.password = '';
                    $scope.passwordConfirmation = '';
                    $scope.formUpdatePassword.$setPristine();
                });
        }

        /**
         * Update the user's account.
         * 
         * @return {Void}
         */
        $scope.updateAccount = function() {
            $scope.updatingAccount = true;

            $http.post(API_BASE_URL + '/accounts/' + $scope.user.id, {
                    method: '_PATCH',
                    email: $scope.user.email,
                    name: $scope.user.name
                })
                .error(function(response) {
                    $scope.updatingAccount = false;
                    notifier('Unable to update your account', 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.updatingAccount = false;
                    notifier('Your account has been updated', 'Success', 'OK');
                    var authString = 'Basic ' + window.btoa(response.data.email + ':' + decodePassword());
                    $http.defaults.headers.common['Authorization'] = authString;
                    localStorage.authString = authString;
                    localStorage.user = angular.toJson(response.data);
                });
        }

        /**
         * Decode the base64 encoded password saved in local storage.
         * 
         * @return {String}
         */
        function decodePassword() {
            var authString = window.atob(localStorage.authString.replace('Basic ', ''));
            return authString.substr(authString.indexOf(':') + 1);
        }
    }
]);
