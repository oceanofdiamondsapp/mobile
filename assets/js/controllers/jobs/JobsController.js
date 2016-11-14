/*
| ----------------------------------------------------------------------
| JobsController
| ----------------------------------------------------------------------
*/

controllers.controller('JobsController', ['$scope', '$http', '$state', 'API_BASE_URL', 'API_IP', 'notifier',
    function($scope, $http, $state, API_BASE_URL, API_IP, notifier) {

        // If no state was provided, go to the jobs state.
        if ($state.current.name === 'app.jobs') {
            $state.go('app.jobs.all');
        }

        // Instantiate an empty jobs model.
        $scope.jobs = [];

        // Show a placeholder for jobs until the loaded value is changed to true.
        $scope.loaded = false;

        // Provide the view with the base API IP.
        $scope.API_IP = API_IP;

        // Get all jobs for the authenticated user.
        $http.get(API_BASE_URL + '/jobs')
            .error(function(response) {
                notifier('Unable to retrieve your jobs at this time');
            })
            .success(function(response) {
                $scope.jobs = response.data;
                $scope.loaded = true;
            });

        /**
         * Save a job to local storage.
         * 
         * @param {Object} job
         */
        $scope.setTargetJob = function(job) {
            localStorage.targetJob = angular.toJson(job);
        }

        /**
         * Return url to the first image
         */
        $scope.getFirstPhoto = function(job) {
            return API_IP + job.images[0].path;
        }
    }
]);
