/*
| ----------------------------------------------------------------------
| PurchaseController
| ----------------------------------------------------------------------
*/

controllers.controller('PurchaseController', ['$rootScope', '$scope', '$http', '$location', '$state', '$deepStateRedirect', 'API_BASE_URL', 'notifier',
    function($rootScope, $scope, $http, $location, $state, $deepStateRedirect, API_BASE_URL, notifier) {

        // Retrieve the target quote from local storage.
        $scope.quote = angular.fromJson(localStorage.targetQuote);

        // Set order details visibility
        $scope.showDetails = false;

        /**
         * Launch the in app browser paypal checkout.
         * 
         * @return {Void}
         */
        $scope.purchase = function() {
            var url = API_BASE_URL + '/quotes/' + $scope.quote.quote_number + '/checkout';

            var inAppBrowser = window.open(url, '_blank', 'location=yes');

            inAppBrowser.addEventListener('loadstart', inAppLoadStart);
            inAppBrowser.addEventListener('loaderror', inAppLoadError);
            inAppBrowser.addEventListener('exit', inAppExit);
        }

        /**
         * Handle the in app browser load start event.
         *
         * @param {Object} event
         *
         * @return {Void}
         */
        function inAppLoadStart(event) {
            $scope.loading = true;
        }

        /**
         * View Order button handler
         * 
         * @return {Void}
         */
        $scope.onViewOrder = function() {
            $scope.showDetails = !$scope.showDetails;
        }

        /**
         * Check to see if the user purchased the quote. This is called
         * when the user exists the in app browser.
         * 
         * @param  {Object} event
         * 
         * @return {Void}
         */
        function inAppExit(event) {
            $http.get(API_BASE_URL + '/quotes/' + $scope.quote.id + '/orders')
                .error(function(response) {
                    $scope.loading = false;
                    notifier('An error occurred reloading your quote');
                })
                .success(function(response) {
                    $scope.loading = false;
                    $rootScope.last_order_number = response.data[0].order_number;
                    var userPurchasedQuote = response.data.length > 0;
                    if (userPurchasedQuote) {
                        $rootScope.setAnimation('front');
                        $state.go('app.jobs.quote-purchase-thanks');
                        // $deepStateRedirect.reset('app.jobs');
                    }
                });
        }

        /**
         * Handle the in app browser load error event.
         * 
         * @param  {Object} event
         * 
         * @return {Void}
         */
        function inAppLoadError(event) {
            // notifier('An unexpected error occurred loading PayPal checkout');
        }
    }
]);
