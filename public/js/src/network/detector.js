(function () {
    'use strict';

    angular.module('network').factory('networkDetector', ['$q', '$timeout', function ($q, $timeout) {

        var createTestUrl = function (url) {
            return url + '?_=' + (Math.floor(Math.random() * 1000000000));
        };

        var networkDetector = {};

        networkDetector.testConnection = function (url) {
            var deferred = $q.defer();

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 0) {
                        deferred.resolve(false);
                    } else {
                        deferred.resolve(true);
                    }
                }
            };
            request.open('GET', createTestUrl(url), true);
            request.timeout = 1000 * 3;
            request.send();

            return deferred.promise;
        };

        networkDetector.detectConnection = function (url) {
            //var deferred = $q.defer();

            var retryCount = 0;
            var processTestResult = function (isOnline) {
                if (isOnline) {
                    //deferred.resolve(true);
                    return true;
                } else {
                    retryCount++;
                    var retryDelay = (retryCount <= 12) ? (1000 * 5) : (1000 * 60);
                    return $timeout(function () {
                        return networkDetector.testConnection(url).then(processTestResult);
                    }, retryDelay);
                }
            };
            return networkDetector.testConnection(url).then(processTestResult);

            //return deferred.promise;
        };

        return networkDetector;

    }]);

})();
