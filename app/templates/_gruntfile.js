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
                    '<%%= pkg.dir_source %>/css/main.css': '<%%= pkg.dir_source %>/sass/main.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%%= pkg.dir_build %>/css/main.css': '<%%= pkg.dir_source %>/sass/main.scss'
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: <%= eqOptn %>,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            src: [
                '<%%= pkg.dir_source %>/js/**/*.js',
                '!<%%= pkg.dir_source %>/js/libs/**/*.js'
            ]
        },

        <% if (serveOptn == 'true') { %>
        connect: {
            dev: {
                options: {
                    hostname: '*',
                    port: 9999,
                    livereload: true,
                    debug: true,
                    base: '<%%= pkg.dir_source %>/',
                    open: 'http://localhost:9999/'
                }
            },
            build: {
                options: {
                    hostname: '*',
                    port: 9999,
                    livereload: true,
                    debug: true,
                    base: '<%%= pkg.dir_build %>/',
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
                    '<%%= pkg.dir_source %>/sass/**/*.scss',
                    '!<%%= pkg.dir_source %>/sass/libs/*.scss'
                ],
                tasks: ['sass:dev']
            },
            jshint: {
                files: [
                    '<%%= pkg.dir_source %>/js/**/*.js',
                    '!<%%= pkg.dir_source %>/js/libs/**/*.js',
                    '!<%%= pkg.dir_source %>/js/**/*.min.js',
                    '!<%%= pkg.dir_source %>/js/**/concat_*.js'
                ],
                tasks: ['jshint']
            }
        },

        clean: {
            build: ["<%%= pkg.dir_build %>/**/*"],
            postbuild: ['<%%= pkg.dir_build %>/js/**/concat_*.*']
        },

        concat: {
            default: {
                files: {
                    '<%%= pkg.dir_build %>/js/concat_main.js' : [
                        '<%%= pkg.dir_source %>/js/main.js'
                        ],
                    '<%%= pkg.dir_build %>/js/libs/libs.min.js' : [
                        '<%%= pkg.dir_source %>/js/libs/jquery*.min.js',
                        '<%%= pkg.dir_source %>/js/libs/modernizr.2.8.3.custom.js'
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
                    '<%%= pkg.dir_build %>/js/main.min.js' : 
                        '<%%= pkg.dir_build %>/js/concat_main.js'
                }

            }
        },

        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: '<%%= pkg.dir_source %>',
                    src: [
                        'fonts/**/*.*', 
                        'images/**/*.*', 
                        'sass/**/*.*',
                        'js/libs/**/*.map',
                        '**/*.html',
                        // exclude any html files that 
                        // need script links processed.
                        '!index.html'
                    ],
                    dest: '<%%= pkg.dir_build %>'
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
                    '<%%= pkg.dir_build %>/index.html': [
                        '<%%= pkg.dir_source %>/index.html'
                        ]
                }
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    <% if (serveOptn == 'true') { %>
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
    <% if (serveOptn == 'true') { %>
    grunt.registerTask('serve', [
        'sass:dev',
        'jshint',
        'connect:dev',
        'watch'
        ]);
    <% } %>
    grunt.registerTask('build', [
        'clean:build', 
        'sass:build', 
        'jshint', 
        'concat', 
        'uglify', 
        'copy', 
        'processhtml',
        <% if (serveOptn == 'true') { %>
        'connect:build',
        <% } %>
        'clean:postbuild'
        ]);

};