(function () {
    'use strict';

    angular.module('demo').factory('demoDb', ['$rootScope', 'pouchEvent', 'networkDetector', 'demoEvent', 'REMOTE_DB', 'LOCAL_DB', function ($rootScope, pouchEvent, networkDetector, demoEvent, REMOTE_DB, LOCAL_DB) {
        var demoDb = new PouchDB(LOCAL_DB);

        demoDb.changes({
            since: 'now',
            live: true
        }).on('change', function (event) {
            console.log(pouchEvent.CHANGE, event);
            $rootScope.$broadcast(pouchEvent.CHANGE, event);
        }).on('complete', function (event) {
            console.log(pouchEvent.COMPLETE, event);
        }).on('error', function (error) {
            console.error(pouchEvent.ERROR, error);
        });

        var sync = null;

        var disableSync = function () {
            sync.cancel();
        };

        var enableSync = function () {
            $rootScope.$broadcast(demoEvent.ONLINE);

            var remoteDb = new PouchDB(REMOTE_DB);
            sync = demoDb.sync(remoteDb, {
                live: true
            }).on('change', function (event) {
                console.log(pouchEvent.SYNC_CHANGE, event);
                //}).on('paused', function (event) {
                //    console.log(pouchEvent.SYNC_PAUSED, event);
                //}).on('active', function (event) {
                //    console.log(pouchEvent.SYNC_ACTIVE, event);
            }).on('complete', function (event) {
                console.log(pouchEvent.SYNC_COMPLETE, event);
            }).on('error', function (error) {
                //console.error(pouchEvent.SYNC_ERROR, error);

                $rootScope.$broadcast(demoEvent.OFFLINE);

                disableSync();
                networkDetector.detectConnection(REMOTE_DB).then(enableSync);
            });
        };

        networkDetector.detectConnection(REMOTE_DB).then(enableSync);

        return demoDb;
    }]);

})();
