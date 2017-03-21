/*
|---------------------------------------------------------------------
| Modules
|---------------------------------------------------------------------
*/

var app = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngCordova',
    'ct.ui.router.extras',
    'controllers',
    'services',
    'filters'
]);

var controllers = angular.module('controllers', []);
var services = angular.module('services', []);
var filters = angular.module('filters', []);


/*
|---------------------------------------------------------------------
| Constants
|---------------------------------------------------------------------
|
| Should move this to a GET request when starting up the app so that
| the client is always in sync with the server.
|
*/

/*
| Define the stone type ids. Must match the values stored in the stone table. 
| Potentially convert this to an http request.
*/
app.constant('STONES', {
    1: {
        description: 'Diamond'
    },
    2: {
        description: 'Ruby'
    },
    3: {
        description: 'Sapphire'
    },
    4: {
        description: 'Emerald'
    },
});

/*
| Define the metal type ids. Must match the values stored in the metals table.
| Potentially convert this to an http request.
*/
app.constant('METALS', {
    1: {
        description: 'Silver'
    },
    2: {
        description: 'Yellow Gold'
    },
    3: {
        description: 'Rose Gold'
    },
    4: {
        description: 'White Gold'
    },
    5: {
        description: 'Platinum'
    },
});

/*
| The API base url and ip addres. This makes it easy to change the url if
| needed since many controllers reference these.
*/
// 162.243.36.221
// 104.131.116.54
// 172.20.2.133
app.constant('API_IP', 'http://104.131.116.54');
app.constant('API_BASE_URL', 'http://104.131.116.54/api/v1');


/*
|---------------------------------------------------------------------
| Routes
|---------------------------------------------------------------------
*/

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider

            /*
            |---------------------------------------------------------------------
            | Tour
            |---------------------------------------------------------------------
            */

            .state('tour', {
                url: '/tour',
                templateUrl: 'partials/tour/layout.html',
                controller: 'AppController',
                abstract: true,
                protected: false
            })
            .state('tour.inspiration', {
                url: '/inspiration',
                templateUrl: 'partials/tour/inspiration.html',
                protected: false
            })
            .state('tour.make-it-yours', {
                url: '/make-it-yours',
                templateUrl: 'partials/tour/make-it-yours.html',
                protected: false
            })
            .state('tour.quote', {
                url: '/quote',
                templateUrl: 'partials/tour/quote.html',
                protected: false
            })
            .state('tour.checkout', {
                url: '/checkout',
                templateUrl: 'partials/tour/checkout.html',
                protected: false
            })
            .state('tour.extras', {
                url: '/extras',
                templateUrl: 'partials/tour/extras.html',
                controller: 'AppController',
                protected: false
            })

            /*
            |---------------------------------------------------------------------
            | Auth
            |---------------------------------------------------------------------
            */

            .state('auth', {
                url: '/auth',
                templateUrl: 'partials/auth/layout.html',
                controller: 'AppController',
                abstract: true,
                protected: false,
            })
            .state('auth.signup', {
                url: '/signup',
                templateUrl: 'partials/auth/signup.html',
                controller: 'SignupController',
                protected: false
            })
            .state('auth.login', {
                url: '/login',
                templateUrl: 'partials/auth/login.html',
                controller: 'LoginController',
                protected: false
            })

            /*
            |---------------------------------------------------------------------
            | Application Layout
            |---------------------------------------------------------------------
            */

            .state('app', {
                url: '/',
                templateUrl: 'partials/layout.html',
                controller: 'AppController',
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Job Creation
            |---------------------------------------------------------------------
            */

            .state('app.create-job', {
                url: 'jobs/create',
                deepStateRedirect: false,
                sticky: true,
                views: {
                    'view-create-job@app': {
                        templateUrl: 'partials/jobs/create/layout.html',
                        controller: 'CreateJobController',
                    }
                },
                protected: true
            })
            .state('app.create-job.start', {
                url: '/start',
                templateUrl: 'partials/jobs/create/start.html',
                protected: true
            })
            .state('app.create-job.details', {
                url: '/details',
                templateUrl: 'partials/jobs/create/details.html',
                protected: true
            })
            .state('app.create-job.review', {
                url: '/review',
                templateUrl: 'partials/jobs/create/review.html',
                protected: true
            })
            .state('app.create-job.thanks', {
                url: '/thank-you',
                templateUrl: 'partials/jobs/create/thanks.html',
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Jobs
            |---------------------------------------------------------------------
            */

            .state('app.jobs', {
                url: 'jobs',
                deepStateRedirect: false,
                sticky: true,
                views: {
                    'view-jobs@app': {
                        templateUrl: 'partials/jobs/layout.html',
                        controller: 'JobsController'
                    }
                },
                protected: true
            })
            .state('app.jobs.all', {
                url: '/',
                templateUrl: 'partials/jobs/all.html',
                controller: 'JobsController',
                protected: true
            })
            .state('app.jobs.show', {
                url: '/:id',
                templateUrl: 'partials/jobs/show.html',
                controller: 'JobDetailController',
                protected: true
            })
            .state('app.jobs.quote', {
                url: '/:job_id/quotes/:quote_id',
                templateUrl: 'partials/quotes/show.html',
                controller: 'QuoteController',
                protected: true
            })
            .state('app.jobs.quote-decline', {
                url: '/:job_id/quotes/:quote_id/decline',
                templateUrl: 'partials/quotes/decline.html',
                controller: 'QuoteController',
                protected: true
            })
            .state('app.jobs.quote-purchase', {
                url: '/:job_id/quotes/:quote_id/purchase',
                templateUrl: 'partials/quotes/purchase.html',
                controller: 'PurchaseController',
                protected: true
            })
            .state('app.jobs.quote-purchase-thanks', {
                url: '/purchase/thank-you',
                templateUrl: 'partials/quotes/thanks.html',
                controller: 'PurchaseController',
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Orders
            |---------------------------------------------------------------------
            */

            .state('app.orders', {
                url: 'orders',
                deepStateRedirect: false,
                sticky: true,
                views: {
                    'view-orders@app': {
                        templateUrl: 'partials/orders/layout.html',
                        controller: 'OrdersController'
                    }
                },
                protected: true
            })
            .state('app.orders.all', {
                url: '/',
                templateUrl: 'partials/orders/all.html',
                controller: 'OrdersController',
                protected: true
            })
            .state('app.orders.show', {
                url: '/:id',
                templateUrl: 'partials/orders/show.html',
                controller: 'OrderDetailController',
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Account
            |---------------------------------------------------------------------
            */

            .state('app.account', {
                url: 'account',
                deepStateRedirect: false,
                sticky: true,
                views: {
                    'view-account@app': {
                        templateUrl: 'partials/account/layout.html',
                        controller: 'AccountController',
                    }
                },
                protected: true
            })
            .state('app.account.overview', {
                url: '/',
                templateUrl: 'partials/account/overview.html',
                controller: 'AccountController',
                protected: true
            })
            .state('app.account.edit', {
                url: '/edit',
                templateUrl: 'partials/account/edit.html',
                controller: 'AccountController',
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Static Pages
            |---------------------------------------------------------------------
            */

            .state('app.diamond-education', {
                url: 'diamond-education',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/diamond-education.html',
                    }
                },
                protected: true
            })
            .state('app.contact', {
                url: 'contact',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/contact.html',
                    }
                },
                protected: true
            })
            .state('app.about', {
                url: 'about',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/about.html',
                    }
                },
                protected: true
            })
            .state('app.return-policy', {
                url: 'return-policy',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/return-policy.html',
                    }
                },
                protected: true
            })
            .state('app.privacy-policy', {
                url: 'privacy-policy',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/privacy-policy.html',
                    }
                },
                protected: true
            })
            .state('app.gallery', {
                url: 'gallery',
                views: {
                    'view-page@app': {
                        templateUrl: 'partials/pages/gallery.html',
                        controller: 'AppController'
                    }
                },
                protected: true
            })

            /*
            |---------------------------------------------------------------------
            | Modals
            |---------------------------------------------------------------------
            */

            .state('modals', {
                url: '/modals',
                templateUrl: 'partials/pages/modal.html',
                abstract: true,
                protected: false
            })
            .state('modals.privacy-policy', {
                url: '/privacy-policy',
                templateUrl: 'partials/pages/privacy-policy.html',
                protected: false
            })
            .state('modals.return-policy', {
                url: '/return-policy',
                templateUrl: 'partials/pages/return-policy.html',
                protected: false
            });
        
        $urlRouterProvider.otherwise("/");
    }
]);

/*
|---------------------------------------------------------------------
| Run
|---------------------------------------------------------------------
*/

app.run(['$rootScope', '$state', '$animate', '$timeout', '$window', '$location', '$http', '$templateCache', '$deepStateRedirect', '$cordovaPushV5', 'API_BASE_URL',
    function($rootScope, $state, $animate, $timeout, $window, $location, $http, $templateCache, $deepStateRedirect, $cordovaPushV5, API_BASE_URL) {

        // Add the state to root scope so we can show the sticky ui-view.
        $rootScope.$state = $state;

        // Show the main navigation menu by default.
        $rootScope.navIsVisible = true;

        // Add push notification handlers
        document.addEventListener("deviceready", function() {

            var isLoggedIn = angular.fromJson(localStorage.user)?true:false;
            var pnRegId = window.localStorage['pn_reg_id'];

            var options = {
                android: {
                    senderID: "355956398580",
                    forceShow: true
                },
                ios: {
                    alert: true,
                    badge: true,
                    sound: true,
                    clearBadge: true
                }
            };

            if (!window.PushNotification) return;

            $cordovaPushV5.initialize(options).then(function() {
                $cordovaPushV5.onNotification();
                $cordovaPushV5.onError();

                $cordovaPushV5.register().then(function(registrationId) {
                    if (isLoggedIn){
                        if (pnRegId !== registrationId){
                            // resend reg_id and update local reg_id only on success
                        }
                    }else{
                        window.localStorage['pn_reg_id'] = registrationId;
                    }
                    console.log("pn_reg_id: " + registrationId);
                });
            });

            // triggered every time notification received
            $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){

            });

            // triggered every time error occurs
            $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
                alert(e.message);
            });
        }, false);

        /*
        | Monitor the state change start event. We want to run the following 
        | every time the state starts to change.
        |
        | 1. Retrieve authenticated user from local storage.
        | 2. If no authenticated user, redirect to login page.
        | 3. If an auth string is found in local storage, add it to all
        |    http requests.
        | 4. Jump to the top of the window.
        | 5. Show or hide the main navigation menu.
        */
        $rootScope.$on('$stateChangeStart', function(event, next) {
            // Go to window top.
            window.scrollTo(0, 0);

            switch (next.name){
                case "tour.inspiration":
                    $rootScope.pageTour = 0;
                    break;
                case "tour.make-it-yours":
                    $rootScope.pageTour = 1;
                    break;
                case "tour.quote":
                    $rootScope.pageTour = 2;
                    break;
                case "tour.checkout":
                    $rootScope.pageTour = 3;
                    break;
                case "tour.extras":
                    $rootScope.pageTour = 4;
                    break;
                default:
                    break;
            }
            // Get the authenticated user from localStorage if one exists.
            var user = angular.fromJson(localStorage.user) || null;
            var doneSplash = localStorage.doneSplash;

            if (!doneSplash && (next.name == "app")){
                $location.path('/tour/inspiration');
            }else if (!user && next.protected) {
                $location.path('/auth/login');
            }

            // Add basic auth headers to all http requests.
            if (localStorage.authString) {
                $http.defaults.headers.common['Authorization'] = localStorage.authString;
            }

            // Show or hide the main navigation menu.
            $rootScope.navIsVisible = next.name == 'app';
        });

        /*
        | Explicitly attach FastClick to all elements that require it.
        | If FastClick is attached before the elements are rendered,
        | it does not work properly.
        |
        | Also, attaching it to the body as directed by the docs does
        | not seem to work in this app. Elements below the "fold"
        | do not get the benefit of FastClick.
        */

        $rootScope.$on('$stateChangeSuccess', function() {
            setTimeout(function() {
                var elements = document.querySelectorAll('input, button, select, label, textarea, a');

                for (var i = 0; i < elements.length; i++) {
                    FastClick.attach(elements[i]);
                }
            }, 750);
        });

        // $rootScope.$on('$stateChangeSuccess', function () {
        //     setTimeout(function () {
        //         FastClick.attach(document.body);
        //     }, 750);
        // });

        /**
         * Set the animation class.
         * 
         * @param {String} animation
         */
        $rootScope.setAnimation = function(animation) {
            $rootScope.animation = animation;

            setTimeout(function() {
                $rootScope.animation = "";
            }, 350);
        };

        /**
         * Get padded string
         */
        $rootScope.padding =  function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },

        /**
         * Get Mmm DD, YYYY date string
         */
        $rootScope.getDateString = function(dt, hasSep){

            if (!dt) return "";

            if (typeof hasSep === "undefined") hasSep = true; else hasSep = false;

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var val = Date.parse(dt);
            var retVal = monthNames[val.getMonth()] + " " + $rootScope.padding(val.getDate(), 2) + (hasSep?", ":" ") + val.getFullYear();

            return retVal;
        };

        /**
         * Check if valid email address
         */
        $rootScope.isValidEmail = function(email){
            return /^([\w]+(?:\.[\w]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(email);
        };

        $rootScope.isURL = function(str) {

            if (!str) return false;

            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            return pattern.test(str);
        }

        /**
         * Handle the user logged out event.
         */
        $rootScope.$on('userLoggedOut', function () {

            if ($rootScope.lo_loading) return;

            $rootScope.lo_loading = true;

            $http.post(API_BASE_URL + '/auth/logout', {
                device_id: window.device?device.uuid:null
            })
            .error(function(response) {
            })
            .success(function(response) {
            })
            .finally(function(){

                $rootScope.lo_loading = false;
                // Clear authorization header
                $http.defaults.headers.common['Authorization'] = '';

                // Reset deep states
                $deepStateRedirect.reset('app.create-job');
                $deepStateRedirect.reset('app.jobs');
                $deepStateRedirect.reset('app.orders');
                $deepStateRedirect.reset('app.account');

                // Clear localStorage, except tour flag
                for (key in localStorage)
                    if ((key !== "doneSplash") && (key != "pn_reg_id"))
                        delete localStorage[key];

                // Redirect to login page
                $rootScope.setAnimation('slide-back');
                $state.go('auth.login');
            });
        });
    }
]);

/*
|---------------------------------------------------------------------
| Filters
|---------------------------------------------------------------------
*/

app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});





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

/*
| ----------------------------------------------------------------------
| AccountController
| ----------------------------------------------------------------------
*/

controllers.controller('AccountController', ['$rootScope', '$scope', '$state', '$http', 'API_BASE_URL', 'notifier',
    function($rootScope, $scope, $state, $http, API_BASE_URL, notifier) {

        // If a state was not provided, go to the account state.
        if ($state.current.name === 'app.account') {
            $state.go('app.account.overview');
        }

        // Retrieve the authenticated user from local storage.
        $scope.user = angular.fromJson(localStorage.user);

        /**
         * Display a confirm dialog to make sure the user wishes to logout.
         * 
         * @return {Void}
         */
        $scope.logout = function() {
            if (navigator.notification) {
                navigator.notification.confirm(
                    'Are you sure you want to logout?',
                    performLogout,
                    'Logout', ['Logout', 'Cancel']
                );
            } else {
                performLogout(confirm('Are you sure you want to logout?'));
            }
        }

        /**
         * Logout the current user.
         * 
         * @param  {Number} buttonIndex
         * @return {Void}
         */
        function performLogout(buttonIndex) {
            if (buttonIndex == 1) {
                $rootScope.$emit('userLoggedOut');
            }
        }

        /**
         * Update the user's password.
         * 
         * @return {Void}
         */
        $scope.updatePassword = function() {
            $scope.updatingPassword = true;

            $http.post(API_BASE_URL + '/accounts/' + $scope.user.id, {
                    method: '_PATCH',
                    password: $scope.password,
                    password_confirmation: $scope.passwordConfirmation
                })
                .error(function(response) {
                    $scope.updatingPassword = false;
                    notifier('Unable to update your password', 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.updatingPassword = false;
                    notifier('Your password has been updated', 'Success', 'OK');
                    var authString = 'Basic ' + window.btoa(response.data.email + ':' + $scope.password);
                    $http.defaults.headers.common['Authorization'] = authString;
                    localStorage.user = angular.toJson(response.data);
                    localStorage.authString = authString;
                    $scope.password = '';
                    $scope.passwordConfirmation = '';
                    $scope.formUpdatePassword.$setPristine();
                });
        }

        /**
         * Update the user's account.
         * 
         * @return {Void}
         */
        $scope.updateAccount = function() {
            $scope.updatingAccount = true;

            $http.post(API_BASE_URL + '/accounts/' + $scope.user.id, {
                    method: '_PATCH',
                    email: $scope.user.email,
                    name: $scope.user.name
                })
                .error(function(response) {
                    $scope.updatingAccount = false;
                    notifier('Unable to update your account', 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.updatingAccount = false;
                    notifier('Your account has been updated', 'Success', 'OK');
                    var authString = 'Basic ' + window.btoa(response.data.email + ':' + decodePassword());
                    $http.defaults.headers.common['Authorization'] = authString;
                    localStorage.authString = authString;
                    localStorage.user = angular.toJson(response.data);
                });
        }

        /**
         * Decode the base64 encoded password saved in local storage.
         * 
         * @return {String}
         */
        function decodePassword() {
            var authString = window.atob(localStorage.authString.replace('Basic ', ''));
            return authString.substr(authString.indexOf(':') + 1);
        }
    }
]);

/*
| ----------------------------------------------------------------------
| LoginController
| ----------------------------------------------------------------------
*/

controllers.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', 'API_BASE_URL', 'notifier', 'device',
    function($rootScope, $scope, $http, $location, API_BASE_URL, notifier, device) {

        $scope.user = {
            // email: "chriseen313@gmail.com",
            // password: "password"
        };
        
        /**
         * Attempt to login the user.
         * 
         * @return {Void}
         */
        $scope.login = function() {
            $scope.loading = true;

            var formIsValid = ($scope.user.email && $scope.user.password);

            if (!formIsValid) {
                $scope.loading = false;
                return notifier('The email and password fields are required', 'Error', 'OK');
            }

            var authString = 'Basic ' + window.btoa($scope.user.email + ':' + $scope.user.password);
            $http.defaults.headers.common['Authorization'] = authString;

            $http.post(API_BASE_URL + '/auth/login', $scope.user)
                .error(function(response) {
                    $scope.loading = false;
                    var message = response.error || 'Unable to log you in at this time';
                    notifier(message, 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.loading = false;
                    localStorage.user = angular.toJson(response.data);
                    localStorage.authString = authString;
                    device.tokenHandler(window.localStorage['pn_reg_id']);
                    $location.path('/app');
                });
        };

        $scope.onForgotPassword = function(){

            if (!navigator.notification || $scope.fp_loading) return;

            navigator.notification.prompt(
                "Please enter your email and we'll send you a link to reset your password.",
                function(data){
                    $scope.$apply(function(){
                        if (data.buttonIndex != 1) return;
                        if (!$rootScope.isValidEmail(data.input1)){
                            notifier('Please enter a valid email.', 'Error', 'OK');
                            return;
                        }

                        $scope.fp_loading = true;

                        $http.post(API_BASE_URL + '/auth/password/email', {
                            email: data.input1
                        })
                        .error(function(response) {
                            $scope.fp_loading = false;
                            var message = response.error || 'Unable to send a confirmation email at this time.';
                            notifier(message, 'Error', 'OK');
                        })
                        .success(function(response) {
                            $scope.fp_loading = false;
                            if (response.success){
                                var message = 'Confirmation email was sent successfully.';
                                notifier(message, 'Success', 'OK');
                            }
                        });
                    })
                },
                "Forgot Password"
            );
        }

    }
]);

/*
| ----------------------------------------------------------------------
| SignupCtrl
| ----------------------------------------------------------------------
*/

controllers.controller('SignupController', ['$scope', '$http', '$location', 'API_BASE_URL', 'notifier', 'device',
    function($scope, $http, $location, API_BASE_URL, notifier, device) {

        /**
         * @type {Bool}
         */
        $scope.loading = false;

        /**
         * Terms checkbox status.
         *
         * @type {Bool}
         */
        $scope.doesAgree = false;

        /**
         * Boolean for whether or not the form is ready for submission.
         *
         * @param {Object} form
         *
         * @return {Bool}
         */
        $scope.formIsValid = function(form) {
            return $scope.doesAgree
                   && form.$valid
                   && $scope.user.password === $scope.user.password_confirmation;
        };

        /**
         * Attempt to signup the user.
         * 
         * @return {Void}
         */
        $scope.signup = function() {
            $scope.loading = true;

            var passwordsMatch = ($scope.user.password == $scope.user.password_confirmation);

            if (!passwordsMatch) {
                $scope.loading = false;
                return notifier('Passwords do not match', 'Error', 'OK');
            }

            if (!$scope.doesAgree) {
                $scope.loading = false;
                return notifier('Please agree to the terms', 'Error', 'OK');
            }

            $http.post(API_BASE_URL + '/accounts', $scope.user)
                .error(function(response) {
                    $scope.loading = false;
                    var message = response.error || 'Unable to create your account at this time';
                    notifier(message, 'Error', 'OK');
                })
                .success(function(response) {
                    $scope.loading = false;

                    // Save the user to local storage.
                    localStorage.user = angular.toJson(response.data);

                    // Create auth string, save to local storage, and add it to http request header.
                    var authString = 'Basic ' + window.btoa($scope.user.email + ':' + $scope.user.password);
                    localStorage.authString = authString;
                    $http.defaults.headers.common['Authorization'] = authString;

                    // Register for push notifications
                    device.tokenHandler(window.localStorage['pn_reg_id']);

                    // Redirect user to app
                    $location.path('/app');
                });
        };
    }
]);

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

/*
| --------------------------------------------------------------------------------
| Stone Description
| --------------------------------------------------------------------------------
|
| Format a stone value (primary key in MySQL) to the text description.
|
*/

filters.filter('stoneDesc', ['STONES',
    function(STONES) {
        return function(id) {
            return STONES[id].description;
        };
    }
]);

/*
| --------------------------------------------------------------------------------
| Metal Description
| --------------------------------------------------------------------------------
|
| Format a metal value (primary key in MySQL) to the text description.
|
*/

filters.filter('metalDesc', ['METALS',
    function(METALS) {
        return function(id) {
            return METALS[id].description;
        };
    }
]);

/*
|---------------------------------------------------------------------
| Device
|---------------------------------------------------------------------
|
| A service that creates a new device object that can be used to
| register the device and listen for push notifications.
|
*/

services.factory('device', ['$http', 'API_BASE_URL', function($http, API_BASE_URL) {
    return new function() {
        /**
         * Register the device for push notifications.
         * 
         * @return {Void}
         */
        // this.register = function() {
        //     if (!window.plugins || !device) {
        //         return;
        //     }

        //     if (device.platform == 'android' || device.platform == 'Android') {
        //         window.plugins.pushNotification.register(this.registerSuccess, this.registerError, {
        //             'senderID': '277401107985',
        //             'ecb': 'onNotificationGCM'
        //         });
        //     }

        //     if (device.platform == 'ios' || device.platform == 'iOS') {
        //         window.plugins.pushNotification.register(this.tokenHandler, this.errorHandler, {
        //             'badge': 'true',
        //             'sound': 'true',
        //             'alert': 'true',
        //             'ecb': 'onNotificationAPN'
        //         });
        //     }
        // };

        /**
         * Handle iOS registration success.
         *
         * @param {String} token
         * 
         * @return {Void}
         */
        this.tokenHandler = function(token) {
            if (!window.device) return;
            $http.post(API_BASE_URL + '/devices', {
                device_id: device.uuid,
                token: token,
                platform: device.platform
            });
        };

        /**
         * Handle iOS registration error.
         * 
         * @param {Object} error
         * 
         * @return {Void}
         */
        this.errorHandler = function(error) {
            alert('Push notification registration error occurred: ' + error);
        };

        /**
         * Handle Android registration success.
         * 
         * @param {String} result
         * 
         * @return {Void}
         */
        this.registerSuccess = function(result) {
            // Android registration successful
        };

        /**
         * Handle Android registration error.
         * 
         * @param {String} error
         * 
         * @return {Void}
         */
        this.registerError = function(error) {
            alert('Push notification registration error occurred');
        };
    }
}]);

/*
|---------------------------------------------------------------------
| Alert Notifier
|---------------------------------------------------------------------
|
| A service that uses native notifications if available, otherwise
| it defaults to the basic browser alert.
|
*/

services.factory('notifier', [function() {
    return function(message, title, buttonLabel) {
        if (navigator.notification) {
            navigator.notification.alert(message, function() {}, title, buttonLabel);
        } else {
            alert(message);
        }
    }
}]);
