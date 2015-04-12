(function () {
    'use strict';

    angular.module('demo').directive('demoNoteModal', function () {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var bootstrapModal = $element.modal({
                    show: false
                });

                var modalApi = {};

                modalApi.show = function () {
                    bootstrapModal.modal('show');
                };

                modalApi.hide = function () {
                    bootstrapModal.modal('hide');
                };

                $scope.formModal = modalApi;
            }
        };
    });

})();
