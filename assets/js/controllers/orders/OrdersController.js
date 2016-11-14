/*
| ----------------------------------------------------------------------
| OrdersController
| ----------------------------------------------------------------------
*/

controllers.controller('OrdersController', ['$scope', '$state', '$http', 'API_BASE_URL', 'notifier',
    function($scope, $state, $http, API_BASE_URL, notifier) {

        // If not state was provided, go to the orders state.
        if ($state.current.name === 'app.orders') {
            $state.go('app.orders.all');
        }

        // Instantiate an orders model.
        $scope.orders = [];

        // Get all orders for the authenticated user.
        $http.get(API_BASE_URL + '/orders')
            .error(function(response) {
                notifier('Unable to retrieve orders at this time');
            })
            .success(function(response) {
                $scope.orders = response.data;
            });

        /**
         * Save a order to local storage.
         * 
         * @param {Object} order
         */
        $scope.setTargetOrder = function(order) {
            localStorage.targetOrder = angular.toJson(order);
        }
    }
]);
