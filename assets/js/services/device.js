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
