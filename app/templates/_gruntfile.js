module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {  // Task
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/css/main.css': 'src/sass/main.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                <% if (eqOptn) { %>
                eqeqeq: true,
                <% } %>
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            src: [
                'src/js/**/*.js',
                '!src/js/libs/**/*.js',
                '!source/js/**/concat_*.js'
            ]
        },

        <% if (serveOptn) { %>
        connect: {
            dev: {
                options: {
                    hostname: '*',
                    port: 8888,
                    livereload: true,
                    debug: true,
                    base: 'src/',
                    open: 'http://localhost:8888/'
                }
            },
            build: {
                options: {
                    hostname: '*',
                    port: 9999,
                    livereload: true,
                    debug: true,
                    base: 'build/',
                    open: 'http://localhost:9999/'
                }
            }
        },
        <% } %>

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    'src/sass/**/*.scss',
                    '!src/sass/libs/*.scss'
                ],
                tasks: ['sass:dev']
            },
            jshint: {
                files: [
                    'src/js/**/*.js',
                    '!src/js/libs/**/*.js',
                    '!src/js/**/concat_*.js'
                ],
                tasks: ['jshint']
            }
        },

        clean: {
            build: ["build/**/*"],
            postbuild: ['build/js/**/concat_*.*']
        },

        concat: {
            default: {
                files: {
                    'build/js/concat_main.js' : [
                        'src/js/main.js'
                        ],
                    'build/js/libs/libs.min.js' : [
                        'src/js/libs/jquery*.min.js',
                        'src/js/libs/modernizr.2.8.3.custom.js'
                        ]
                }

            }
        },

        uglify: {
            options: {
                banner: '/*! <%%= grunt.template.today("mm/dd/yy - h:MM:ss TT") %> */\n',
                sourcemap: true
            },
            default: {
                files: {
                    'build/js/main.min.js' : 
                        'build/js/concat_main.js'
                }

            }
        },

        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        'css/images/**/*.*',
                        'fonts/**/*.*', 
                        'images/**/*.*', 
                        'sass/**/*.*',
                        'js/libs/**/*.map',
                        '**/*.html',
                        // exclude any html files that 
                        // need script links processed.
                        '!index.html'
                    ],
                    dest: 'build'
                }]
            }
        },

        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            default: {
                files: {
                    'build/index.html': [
                        'src/index.html'
                        ]
                }
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    <% if (serveOptn) { %>
    grunt.loadNpmTasks('grunt-contrib-connect');
    <% } %>
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');

    // Register tasks.
    grunt.registerTask('default', [
        'sass:dev', 
        'jshint'
        ]);
    <% if (serveOptn) { %>
    grunt.registerTask('setWatchConfig', function (myFlag) {
        // serve and buildWatch uses this task to dynamically set 
        // css:tasks and js:tasks.
        grunt.config.set('watch:css', {});
        grunt.config.set('watch:js', {});

        var myWatchConfig = {
            watch: {
                css: {
                    files: [
                        'src/sass/**/*.scss',
                        '!src/sass/libs/*.scss'
                    ]
                },
                js: {
                    files: [
                        'src/js/**/*.js',
                        '!src/js/libs/**/*.js',
                        '!src/js/**/concat_*.js'
                    ]
                }
            }
        };

        switch (myFlag) {
            case 'dev':
                myWatchConfig.watch.css.tasks = ['sass:dev'];
                myWatchConfig.watch.js.tasks = ['jshint'];
                break;
            case 'build':
                myWatchConfig.watch.css.tasks = ['sass:build'];
                myWatchConfig.watch.js.tasks = ['jshint', 'concat', 'uglify', 'clean:postbuild'];
                break;
            default:
                _log('ERROR: No flag received for watchConfig task!');
                break;
        }

        grunt.config.merge(myWatchConfig);
        grunt.config.process('watch');
    });

    grunt.registerTask('serve', [  // For loca-testing sources (under /src).
        'sass:dev',
        'jshint',
        'connect:dev',
        'setWatchConfig:dev',
        'watch'
        ]);

    grunt.registerTask('buildWatch', [  // For local-testing build output (under /build).
        'clean:build', 
        'sass:build', 
        'concat', 
        'uglify', 
        'copy', 
        'processhtml',
        'clean:postbuild',
        'connect:build',
        'setWatchConfig:build',
        'watch'
        ]);
    <% } %>
    grunt.registerTask('build', [  // For deploy -- you still have to manually upload.
        'clean:build', 
        'sass:build', 
        'jshint', 
        'concat', 
        'uglify', 
        'copy', 
        'processhtml',
        'clean:postbuild'
        ]);

};