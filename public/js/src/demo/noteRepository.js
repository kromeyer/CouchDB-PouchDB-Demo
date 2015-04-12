(function () {
    'use strict';

    angular.module('demo').factory('demoNoteRepository', ['pouchDeferredConverter', 'demoDb', 'demoType', function (pouchDeferredConverter, demoDb, demoType) {
        var demoNoteRepository = {};

        demoNoteRepository.findAll = function () {
            var mapFunc = function (doc) {
                emit(doc.type);
            };

            var options = {
                key: demoType.NOTE,
                include_docs: true
            };

            return pouchDeferredConverter(demoDb.query(mapFunc, options))
                .then(function (result) {
                    var entries = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        entries.push(result.rows[i].doc);
                    }
                    return entries;
                });
        };

        demoNoteRepository.save = function (entry) {
            return pouchDeferredConverter(demoDb.put(entry));
        };

        demoNoteRepository.delete = function (entry) {
            return pouchDeferredConverter(demoDb.remove(entry));
        };

        return demoNoteRepository;
    }]);

})();
