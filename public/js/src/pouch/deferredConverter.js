(function () {
    'use strict';

    angular.module('pouch').factory('pouchDeferredConverter', ['$q', function ($q) {

        return function (dbPromise) {
            var deferred = $q.defer();

            dbPromise.then(function (result) {
                deferred.resolve(result);
            }).catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

    }]);

})();
