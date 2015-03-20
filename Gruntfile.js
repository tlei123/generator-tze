module.exports = function ( grunt ) {
	'use strict';

	grunt.initConfig({
		jshint: {
            options: {
                curly: true,
                eqeqeq: false,
                eqnull: true,
                browser: false,
                node: true,
                mocha: true
            },
            src: [
                'app/index.js',
                'app/templates/_main.js',
                'Gruntfile.js'
            ]
		},

		watch: {
            options: {
                livereload: false
            },
            jshint: {
                files: [
	                'app/index.js',
	                'app/templates/_main.js',
	                'Gruntfile.js'
                ],
                tasks: ['jshint']
            }
		},

		bump: {
			options: {
				files: ['package.json', 'README.md'],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json', 'README.md'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: /([\'|\"]*[version|generator\-tze][\'|\"]*[ ]*:*[ ]*[\'|\"]*)(\d+\.\d+\.\d+(-\.\d+)*(-\d+)*)[\d||A-a|.|-]*([\'|\"]*)/i
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('bumpRelease', ['bump']);
};