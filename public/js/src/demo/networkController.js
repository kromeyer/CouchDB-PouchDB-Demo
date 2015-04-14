(function () {
    'use strict';

    angular.module('demo').controller('demoNetworkController', ['$scope', 'demoEvent', '$timeout', 'TIMEOUT_NOTICE_MESSAGES', function ($scope, demoEvent, $timeout, TIMEOUT_NOTICE_MESSAGES) {

        var timeoutPromise = null;

        $scope.showOfflineMessage = true;
        $scope.showOnlineMessage = !$scope.showOfflineMessage;

        $scope.$on(demoEvent.ONLINE, function () {
            $scope.showOnlineMessage = true;
            $scope.showOfflineMessage = !$scope.showOnlineMessage;

            timeoutPromise = $timeout(function () {
                timeoutPromise = null;
                $scope.showOnlineMessage = false;

            }, TIMEOUT_NOTICE_MESSAGES);
        });

        $scope.$on(demoEvent.OFFLINE, function () {
            if (timeoutPromise) {
                $timeout.cancel(timeoutPromise);
            }

            $scope.showOfflineMessage = true;
            $scope.showOnlineMessage = !$scope.showOfflineMessage;
        });

    }]);

})();
