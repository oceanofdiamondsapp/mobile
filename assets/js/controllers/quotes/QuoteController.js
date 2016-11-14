/*
| ----------------------------------------------------------------------
| QuoteController
| ----------------------------------------------------------------------
*/

controllers.controller('QuoteController', ['$rootScope', '$scope', '$state', '$http', 'API_BASE_URL', 'notifier',
    function($rootScope, $scope, $state, $http, API_BASE_URL, notifier) {

        // Fetch the target quote from local storage.
        $scope.quote = angular.fromJson(localStorage.targetQuote);

        // Fetch the target job from local storage.
        $scope.job = angular.fromJson(localStorage.targetJob);

        // Set the declineTypeId model value.
        $scope.declineTypeId = null;

        /**
         * Decline the quote.
         * 
         * @return {Boolean|Void}
         */
        $scope.decline = function() {
            $scope.loading = true;

            // Double check that decline type id has been selected.
            if ($scope.declineTypeId === null) {
                $scope.loading = false;
                return notifier('Please select a decline reason', 'Oops', 'OK');
            }

            // Set up the route url.
            var route = API_BASE_URL + '/quotes/' + $scope.quote.id + '/decline';

            // Send the decline http request.
            $http.post(route, {
                    decline_type_id: $scope.declineTypeId
                }).error(function(response) {
                    $scope.loading = false;
                    var message = response || 'Unable to decline the quote at this time';
                    notifier(message);
                })
                .success(function(response) {
                    $scope.loading = false;
                    $rootScope.setAnimation('slide-back');
                    $state.go('app.jobs.all');
                });
        }

        $scope.getJewelryName = function(id){
            var jNames = [
                "Bracelet",
                "Brooch",
                "Charms",
                "Earrings",
                "Necklace & Pendants",
                "Rings",
                "Wedding Bands"
            ];

            return jNames[id-1];
        }
    }
]);
