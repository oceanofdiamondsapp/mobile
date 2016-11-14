/*
| ----------------------------------------------------------------------
| AppController
| ----------------------------------------------------------------------
*/

controllers.controller('AppController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $scope.pageClass = ['panel-tour-darkblue',
                            'panel-tour-blue',
                            'panel-tour-darkgreen',
                            'panel-tour-green',
                            'panel-tour-red'];

        $scope.galleryImages = new Array(25);

        $scope.launchReturnPolicyModal = function() {
            window.open('#/modals/return-policy', '_blank', 'location=no');
        }

        $scope.launchPrivacyPolicyModal = function() {
            window.open('#/modals/privacy-policy', '_blank', 'location=no');
        }

        $scope.onCloseSplash = function(){
            localStorage.doneSplash = true;
        }

        /*
        | Handle the backbutton event.
        */
        document.addEventListener("backbutton", function () {
            if (($state.current.name !== "auth.login") && ($state.current.name !== "app"))
                window.history.go(-1);
        });
    }
]);
