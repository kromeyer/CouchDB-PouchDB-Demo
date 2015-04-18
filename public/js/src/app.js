(function () {
    'use strict';

    angular.module('app', ['demo', 'common'])
        .constant('REMOTE_DB', 'http://localhost:5984/demo')
        .constant('LOCAL_DB', 'demo')
        .constant('TIMEOUT_NOTICE_MESSAGES', 1000 * 5);

})();
