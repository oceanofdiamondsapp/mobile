/*
| ----------------------------------------------------------------------
| CreateJobController
| ----------------------------------------------------------------------
*/

controllers.controller('CreateJobController', ['$rootScope', '$scope', '$http', '$state', '$deepStateRedirect', 'API_BASE_URL', 'notifier',
    function($rootScope, $scope, $http, $state, $deepStateRedirect, API_BASE_URL, notifier) {

        // If a state was not provided, go to the create-job state.
        if ($state.current.name === 'app.create-job') {
            $state.go('app.create-job.start');
        }

        // Instantiate an empty job model.
        $scope.job = {
            nickname: '',
            metal_type_ids: [],
            stones: [],
            carat: '',
            budget: '',
            deadline: '',
            ship_to_state: '',
            notes: ''
        };

        // Set no stones selected to true.
        $scope.noStones = false;

        // Set the terms checkbox to false.
        $scope.terms = {
            checked: false
        };

        // Set quote details visibility
        $scope.showDetails = false;

        /**
         * Toggle a metal selection on and off.
         * 
         * @param  {Number} metal
         * @return {Void}
         */
        $scope.toggleMetal = function(metal) {
            var index = $scope.job.metal_type_ids.indexOf(metal);

            if (index > -1) {
                $scope.job.metal_type_ids.splice(index, 1);
            } else {
                $scope.job.metal_type_ids.push(metal);
            }
        };

        /**
         * Toggle a stone selection on and off.
         * 
         * @param  {Number} stone
         * @return {Void}
         */
        $scope.toggleStone = function(stone) {
            var index = $scope.job.stones.indexOf(stone);

            if (index > -1) {
                $scope.job.stones.splice(index, 1);
            } else {
                $scope.job.stones.push(stone);
            }

            $scope.noStones = false;
        };

        /**
         * Clear all selected stones.
         * 
         * @return {Void}
         */
        $scope.clearStones = function() {
            $scope.job.stones = [];
            $scope.noStones = true;
        };

        /**
         * Submit the new job form.
         * 
         * @param  {Boolean} doesAgree
         * @return {Mixed}
         */
        $scope.submit = function() {
            $scope.loading = true;

            if (!$scope.terms.checked) {
                $scope.loading = false;
                return notifier('Please agree to the terms.');
            }

            var photos = angular.fromJson(localStorage.jobPhotos);

            $http.post(API_BASE_URL + '/jobs', {
                    job: $scope.job,
                    photos: photos
                })
                .error(function(response) {
                    $scope.loading = false;
                    var message = response.error || 'Unable to create job at this time';
                    notifier(message);
                })
                .success(function(response) {
                    $scope.loading = false;
                    $scope.job.job_number = response.data.job_number;
                    $rootScope.setAnimation('front');
                    $state.go('app.create-job.thanks');
                    // $deepStateRedirect.reset('app.create-job');
                });
        };

        /**
         * Converts to budget string
         * 
         * @return {Void}
         */
        $scope.getBudgetString = function(price) {
            switch (price){
                case "100": return "< $100"; break;
                case "500": return "$100 - $500"; break;
                case "1000": return "$501 - $1000"; break;
                case "2000": return "$1001 - $2000"; break;
                case "3000": return "$2001 - $3000"; break;
                case "4000": return "$3001 - $4000"; break;
                case "5000": return "$4001 - $5000"; break;
                case "9999": return "> $5000"; break;
                default: break;
            };
        }

        /**
         * Cancel the creation of a new job.
         * 
         * @return {Void}
         */
        $scope.cancel = function() {
            resetForm();
            $rootScope.setAnimation('slide-back');
            $state.go('app.create-job.start');
        }

        /**
         * View Quote button handler
         * 
         * @return {Void}
         */
        $scope.onViewQuote = function() {
            $scope.showDetails = !$scope.showDetails;
        }

        /**
         * New Quote button handler
         * 
         * @return {Void}
         */
        $scope.onNewQuote = function() {
            resetForm();
            $rootScope.setAnimation('slide-back');
        }

        /**
         * Clear the form and send the user to the start view.
         * 
         * @return {Void}
         */
        function resetForm() {
            $scope.job = {
                nickname: '',
                metal_type_ids: [],
                stones: [],
                carat: '',
                budget: '',
                deadline: '',
                ship_to_state: '',
                notes: ''
            };

            if (localStorage.jobPhotos) {
                localStorage.removeItem('jobPhotos');
            }

            $scope.noStones = true;

            $scope.terms = {
                checked: false
            };
        }
    }
]);
