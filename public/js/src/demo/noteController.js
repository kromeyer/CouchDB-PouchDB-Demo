(function () {
    'use strict';

    angular.module('demo').controller('demoNoteController', ['$scope', 'pouchEvent', 'demoNoteRepository', 'demoType', function ($scope, pouchEvent, demoNoteRepository, demoType) {

        var $modal = $('#myModal').modal({
            show: false
        });

        var showModal = function () {
            $modal.modal('show');
        };

        var hideModal = function () {
            $modal.modal('hide');
        };

        var createNote = function () {
            return {
                _id: uuid.v1(),
                type: demoType.NOTE,
                timestamp: new Date(),
                title: '',
                content: ''
            };
        };

        $scope.formData = null;
        $scope.notes = [];

        $scope.add = function () {
            $scope.formData = createNote();
            showModal();
        };

        $scope.edit = function (note) {
            $scope.formData = angular.copy(note);
            showModal();
        };

        $scope.cancel = function () {
            hideModal();
            $scope.formData = null;
        };

        $scope.submit = function () {
            demoNoteRepository.save($scope.formData)
                .then(function () {
                    hideModal();
                    $scope.formData = null;
                }).catch(function (error) {
                    console.error('error in submit', error);
                });
        };

        $scope.delete = function (entry) {
            demoNoteRepository.delete(entry)
                .catch(function (error) {
                    console.error('error in delete', error);
                });
        };

        $scope.$on(pouchEvent.CHANGE, function () {
            demoNoteRepository.findAll()
                .then(function (notes) {
                    $scope.notes = notes;
                }).catch(function (error) {
                    console.error('error in findAll', error);
                });
        });

        demoNoteRepository.findAll()
            .then(function (notes) {
                $scope.notes = notes;
            }).catch(function (error) {
                console.error('error in findAll', error);
            });

    }]);

})();
