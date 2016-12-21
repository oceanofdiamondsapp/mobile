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




