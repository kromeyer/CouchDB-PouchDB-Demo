(function () {
    'use strict';

    angular.module('demo').factory('demoDb', ['$rootScope', 'pouchEvent', 'REMOTE_DB', 'LOCAL_DB', function ($rootScope, pouchEvent, REMOTE_DB, LOCAL_DB) {
        var demoDb = new PouchDB(LOCAL_DB);

        demoDb.changes({
            since: 'now',
            live: true
        }).on('change', function () {
            $rootScope.$broadcast(pouchEvent.CHANGE);
        }).on('error', function (error) {
            console.error('error in db', error);
        });

        return demoDb;
    }]);

})();
