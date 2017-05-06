module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var javascriptFiles = [
        'source/app.js', 'source/**/**.js', 'dist/templates.js',
    ];

    var libraryFiles = [
        'bower_components/angular/angular.min.js',
        'bower_components/materialize/dist/js/materialize.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/tg-angular-validator/dist/angular-validator.min.js',
        'bower_components/ng-fastclick/dist/index.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/materialize/dist/css/materialize.min.css'
    ]

    var cssFiles = [
        'bower_components/animate.css/animate.min.css',
        'bower_components/SpinKit/css/spinkit.css',
        'bower_components/materialize/dist/css/materialize.min.css',
        "source/**/*.css",
        "compiled-css/**/*.css"
    ];

    grunt.initConfig({
        clean: {
            temp: ['dist/*'],
            post: ['compiled-css', 'dist/library.js', 'dist/templates.js']
        },
        ngtemplates: {
            app: {
                src: '**/**.view.html',
                dest: 'dist/templates.js',
                options: {
                    url: function(url) {
                        return url.replace('.view.html', '').replace('source/', '');
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        ejs: {
            dev: {
                src: ['source/index.ejs'],
                dest: 'dist/',
                options: {
                  dev: true
                },
                expand: true,
                flatten: true,
                cwd: './',
                ext: '.html',
            },
            prod: {
                src: ['source/index.ejs'],
                dest: 'dist/',
                options: {
                  dev: false
                },
                expand: true,
                flatten: true,
                cwd: './',
                ext: '.html',
            }
        },
        removelogging: {
            dist: {
                src: "dist/app.js",
                dest: "dist/app.js",

                options: {
                    // see below for options. this is optional.
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/app.css': ['dist/app.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/app.js': ['dist/app.js']
                }
            }
        },
        watch: {
            all: {
                files: 'source/**/**',
                tasks: ['watchTasks'],
                options: {
                    interrupt: true,
                    event: ['changed', 'added', 'deleted'],
                    livereload: true
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                minified: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/app.js': 'dist/app.js'
                }
            }
        },
        concat: {
            library: {
                src: libraryFiles,
                dest: 'dist/library.js'
            },
            app: {
                src: javascriptFiles,
                dest: 'dist/app.js'
            },
            together: {

                src: [
                    'dist/library.js',
                    'dist/app.js'
                ],
                dest: 'dist/app.js'
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: cssFiles,
                dest: "dist/app.css"
            },
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    src: ['source/**/**.scss'],
                    dest: 'compiled-css/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('primary', ['clean:temp', 'ejs:dev', 'sass', 'ngtemplates', 'concat', 'concat_css', 'clean:post']);
    grunt.registerTask('watchTasks', ['sass', 'ngtemplates', 'concat', 'concat_css', 'clean:post']);
    grunt.registerTask('compile', ['clean:temp', 'ejs:prod', 'sass', 'ngtemplates', 'concat:app', 'concat:library', 'removelogging', 'babel', 'concat:together', 'concat_css', 'cssmin', 'uglify', 'clean:post']);
    grunt.registerTask('default', ['primary', 'watch']);




};
