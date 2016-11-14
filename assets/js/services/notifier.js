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
