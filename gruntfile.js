module.exports = function (grunt) {
    'use strict';

    var paths = {
        'js': {
            'srcDependencies': [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/pouchdb/dist/pouchdb.js',
                'bower_components/angular/angular.js',
                'bower_components/node-uuid/uuid.js'
            ],
            'src': [
                'public/js/src/network/module.js',
                'public/js/src/network/detector.js',
                'public/js/src/pouch/module.js',
                'public/js/src/pouch/deferredConverter.js',
                'public/js/src/pouch/event.js',
                'public/js/src/demo/module.js',
                'public/js/src/demo/event.js',
                'public/js/src/demo/db.js',
                'public/js/src/demo/type.js',
                'public/js/src/demo/noteRepository.js',
                'public/js/src/demo/noteController.js',
                'public/js/src/demo/noteModal.js',
                'public/js/src/demo/networkController.js',
                'public/js/src/app.js'
            ],
            'testDependencies': [
                'bower_components/angular-mocks/angular-mocks.js'
            ],
            'test': [
                'public/js/test/**/*.js'
            ]
        }
    };

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['package.json', 'bower.json', 'gruntfile.js', 'js/src/**/*.js', 'js/test/**/*.js'],
            options: {
                strict: true
            }
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    basePath: '',
                    files: paths.js.srcDependencies.concat(paths.js.src, paths.js.testDependencies, paths.js.test),
                    exclude: [],
                    browsers: ['Chrome', 'Firefox'],
                    autoWatch: false,
                    singleRun: true
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    preserveComments: 'all'
                },
                src: paths.js.srcDependencies.concat(paths.js.src),
                dest: 'public/js/build/app.min.js'
            },
            prod: {
                src: paths.js.srcDependencies.concat(paths.js.src),
                dest: 'public/js/build/app.min.js'
            }
        },
        watch: {
            js: {
                files: ['public/js/src/**/*.js', 'public/js/test/**/*.js'],
                tasks: ['js:dev']
            }
        }
    });

    grunt.registerTask('js:dev', ['jshint', 'karma', 'uglify:dev']);
    grunt.registerTask('js:prod', ['jshint', 'karma', 'uglify:prod']);
    grunt.registerTask('default', ['js:prod']);
};
