module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {  // Task
            default: {
                options: {  // Target options
                    style: 'compressed'
                },
                files: {  // Dictionary of files
                    '<%%= pkg.dir_source %>/css/main.css': '<%%= pkg.dir_source %>/css/main.scss'
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
            files: {
                src: [
                    '<%%= pkg.dir_source %>/js/**/*.js',
                    '!<%%= pkg.dir_source %>/js/libs/*.js'
                ]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    '<%%= pkg.dir_source %>/sass/**/*.scss',
                    '!<%%= pkg.dir_source %>/sass/vendor/*.scss'
                ],
                tasks: ['sass']
            },
            jshint: {
                files: [
                    '<%%= pkg.dir_source %>/js/**/*.js',
                    '!<%%= pkg.dir_source %>/js/libs/*.js'
                ],
                tasks: ['jshint']
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks.
    grunt.registerTask('default', ['sass', 'jshint'], 'sass', 'jshint');

};