/*
| ----------------------------------------------------------------------
| JobDetailController
| ----------------------------------------------------------------------
*/

controllers.controller('JobDetailController', ['$scope', '$http', 'API_BASE_URL', 'API_IP', 'notifier',
    function($scope, $http, API_BASE_URL, API_IP, notifier) {

        // Retrieve the target job from local storage.
        $scope.job = angular.fromJson(localStorage.targetJob);

        /**
         * Save a quote to local storage as a json string.
         * 
         * @param  {Object} quote
         * @return {Void}
         */
        $scope.setTargetQuote = function(quote) {
            localStorage.targetQuote = angular.toJson(quote);
        }

        /**
         * Send a message for the current job.
         * 
         * @return {Mixed}
         */
        $scope.sendMessage = function() {
            $scope.sendingMessage = true;

            if (!$scope.message) {
                $scope.sendingMessage = false;
                return notifier('Please enter a message');
            }

            $http.post(API_BASE_URL + '/jobs/' + $scope.job.id + '/messages', {
                    body: $scope.message
                })
                .error(function(response) {
                    $scope.sendingMessage = false;
                    notifier('Unable to send message at this time');
                })
                .success(function(response) {
                    $scope.sendingMessage = false;
                    $scope.job = response.data;
                    localStorage.targetJob = angular.toJson(response.data);
                    $scope.message = '';
                });
        }

        /**
         * Return url to the image
         */
        $scope.getFirstPhoto = function(image) {
            return API_IP + image.path;
        }
    }
]);
