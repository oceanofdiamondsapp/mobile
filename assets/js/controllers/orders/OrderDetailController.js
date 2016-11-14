/*
| ----------------------------------------------------------------------
| OrderDetailController
| ----------------------------------------------------------------------
*/

controllers.controller('OrderDetailController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        // Retrieve the targe job from local storage.
        $scope.order = angular.fromJson(localStorage.targetOrder);

        $scope.onTapTracking = function(){
        	if (!$rootScope.isURL($scope.order.tracking_url))
        		return;
        	window.open($scope.order.tracking_url, '_system');
        }

    }
]);
