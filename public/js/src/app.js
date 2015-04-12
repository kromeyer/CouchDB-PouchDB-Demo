(function () {
    'use strict';

    angular.module('app', ['demo'])
        .constant('REMOTE_DB', 'http://localhost:5984/demo')
        .constant('LOCAL_DB', 'demo');

})();
