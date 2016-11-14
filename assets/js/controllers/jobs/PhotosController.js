/*
| ----------------------------------------------------------------------
| PhotosController
| ----------------------------------------------------------------------
*/

controllers.controller('PhotosController', ['$scope', 'notifier',
    function($scope, notifier) {

    	$scope.photos = [];

        // Retrieve any photos taken by the user from local storage. 
        if (localStorage.jobPhotos)
        	$scope.photos = angular.fromJson(localStorage.jobPhotos);

        $scope.getDataUrl = function(photo){
        	return "data:image/jpeg;base64," + photo;
        }
    }
]);
