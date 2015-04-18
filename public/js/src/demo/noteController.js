(function () {
    'use strict';

    angular.module('demo').controller('demoNoteController', ['$scope', 'pouchEvent', 'demoNoteRepository', 'demoType', function ($scope, pouchEvent, demoNoteRepository, demoType) {

        var createNote = function () {
            return {
                _id: uuid.v1(),
                type: demoType.NOTE,
                timestamp: Date.now(),
                title: '',
                content: ''
            };
        };

        var resetForm = function () {
            $scope.formModal.hide();
            $scope.formData = null;
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
        };

        $scope.formModal = null; // will be set by directive
        $scope.form = null; // will be set by angular
        $scope.formData = null;
        $scope.notes = [];

        $scope.add = function () {
            $scope.formData = createNote();
            $scope.formModal.show();
        };

        $scope.edit = function (note) {
            $scope.formData = angular.copy(note);
            $scope.formModal.show();
        };

        $scope.cancel = function () {
            resetForm();
        };

        $scope.submit = function () {
            if ($scope.form.$valid) {
                demoNoteRepository.save($scope.formData)
                    .then(function () {
                        resetForm();
                    }).catch(function (error) {
                        console.error('error in submit', error);
                    });
            }
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
