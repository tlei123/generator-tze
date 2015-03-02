module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {  // Task
            dev: {
                options: {  // Target options
                    style: 'expanded'
                },
                files: {  // Dictionary of files
                    '<%%= pkg.dir_source %>/css/main.css': '<%%= pkg.dir_source %>/sass/main.scss'
                }
            },
            build: {
                options: {  // Target options
                    style: 'compressed'
                },
                files: {  // Dictionary of files
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
            build: ["<%%= pkg.dir_build %>/**/*"], // Empty the build folder.
            postbuild: ['<%%= pkg.dir_build %>/js/**/concat_*.*'] // Delete concat_* scripts.
        },

        concat: {
            options: {
                separator: ';'
            },
            default: {
                files: {
                    // List scripts individually to set dependency-chain.
                    '<%%= pkg.dir_build %>/js/libs/libs.min.js' : [
                        '<%%= pkg.dir_source %>/js/libs/jquery.1.7.1.min.js',
                        '<%%= pkg.dir_source %>/js/libs/jquery-ui.1.8.24.min.js',
                        '<%%= pkg.dir_source %>/js/libs/modernizr.2.8.3.custom.js'
                        ], 
                    '<%%= pkg.dir_build %>/js/concat_main.js' : [
                        '<%%= pkg.dir_source %>/js/main.js'
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
            main: {
                files: [{
                    expand: true,
                    cwd: '<%%= pkg.dir_source %>',
                    src: [
                        'images/**/*.*', 
                        'fonts/**/*.*', 
                        'sass/**/*.*',
                        '**/*.html',
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
    grunt.registerTask('build', [
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