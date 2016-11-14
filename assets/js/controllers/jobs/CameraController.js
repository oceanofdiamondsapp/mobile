/*
| ----------------------------------------------------------------------
| CameraController
| ----------------------------------------------------------------------
*/

controllers.controller('CameraController', ['$scope', 'notifier',
    function($scope, notifier) {

        // Retrieve photos from local storage, or create an empty array.
        // We do this so that we don't overwrite what is stored in
        // local storage. Instead, we append new photos to what
        // is already in local storage.
        $scope.photos = angular.fromJson(localStorage.jobPhotos) || [];

        /**
         * Open the native camera app if available.
         * 
         * @return {Void}
         */
        $scope.addPhoto = function(sourceType) {
            if (!navigator.camera) {
                return notifier('Camera is not available', 'Unavailable');
            }

            var sourceType = (sourceType == 'camera' ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY);

            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: sourceType,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false
            });
        }

        /**
         * Save file URI to scope and local storage.
         * 
         * @param  {String} fileURI
         * @return {Void}
         */
        function cameraSuccess(fileURI) {
            $scope.photos.push(fileURI);
            localStorage.jobPhotos = angular.toJson($scope.photos);
            notifier('Photo added', 'Success', 'OK');
        }

        /**
         * Display the camera error message.
         * 
         * @param  {String} message
         * @return {Void}
         */
        function cameraError(message) {
            // notifier(message);
        }
    }
]);
