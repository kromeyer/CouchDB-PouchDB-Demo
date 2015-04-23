describe('commonFormatDateFilter', function () {
    'use strict';

    var filter;

    beforeEach(module('common'));

    beforeEach(inject(function (commonFormatDateFilterFilter) {
        filter = commonFormatDateFilterFilter;
    }));

    it('should parse and format a date with the given format strings', function () {
        expect(filter('18.02.2015 12:59:01', 'DD.MM.YYYY HH:mm:ss', 'DD.MM.YYYY HH:mm:ss')).toBe('18.02.2015 12:59:01');
    });

    it('should parse a microsecond timestamp per default', function () {
        expect(filter(1423730772237, 'DD.MM.YYYY HH:mm:ss')).toBe('12.02.2015 09:46:12');
    });

});
