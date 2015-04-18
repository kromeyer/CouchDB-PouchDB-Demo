(function () {
    'use strict';

    angular.module('common').filter('commonFormatDateFilter', function () {
        return function (value, inputFormat, outputFormat) {
            if (outputFormat === undefined) {
                outputFormat = inputFormat;
                inputFormat = 'x';
            }

            return moment(value, inputFormat).format(outputFormat);
        };
    });

})();
