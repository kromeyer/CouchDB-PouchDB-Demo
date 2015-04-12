(function () {
    'use strict';

    angular.module('demo').factory('demoDb', ['$rootScope', 'pouchEvent', 'REMOTE_DB', 'LOCAL_DB', function ($rootScope, pouchEvent, REMOTE_DB, LOCAL_DB) {
        var remoteDb = new PouchDB(REMOTE_DB);
        var demoDb = new PouchDB(LOCAL_DB);

        demoDb.changes({
            since: 'now',
            live: true
        }).on('change', function (event) {
            $rootScope.$broadcast(pouchEvent.CHANGE, event);
        }).on('error', function (error) {
            console.error(pouchEvent.ERROR, error);
        });

        demoDb.sync(remoteDb, {
            live: true,
            retry: true
        }).on('change', function (event) {
            console.log(pouchEvent.SYNC_CHANGE, event);
        }).on('paused', function (event) {
            console.log(pouchEvent.SYNC_PAUSED, event);
        }).on('active', function (event) {
            console.log(pouchEvent.SYNC_ACTIVE, event);
        }).on('complete', function (event) {
            console.log(pouchEvent.SYNC_COMPLETE, event);
        }).on('error', function (error) {
            console.error(pouchEvent.SYNC_ERROR, error);
        });

        return demoDb;
    }]);

})();
