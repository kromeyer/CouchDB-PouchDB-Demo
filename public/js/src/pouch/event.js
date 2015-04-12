(function () {
    'use strict';

    angular.module('pouch').constant('pouchEvent', {
        CHANGE: 'pouch.event.change',
        COMPLETE: 'pouch.event.complete',
        ERROR: 'pouch.event.error',

        SYNC_CHANGE: 'pouch.event.sync.change',
        SYNC_PAUSED: 'pouch.event.sync.paused',
        SYNC_ACTIVE: 'pouch.event.sync.active',
        SYNC_COMPLETE: 'pouch.event.sync.complete',
        SYNC_ERROR: 'pouch.event.sync.error'
    });

})();
