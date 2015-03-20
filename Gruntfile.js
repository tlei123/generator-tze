module.exports = function ( grunt ) {
	'use strict';

	grunt.initConfig({
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
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: /([\'|\"]*[version|generator\-tze][\'|\"]*[ ]*:*[ ]*[\'|\"]*)(\d+\.\d+\.\d+(-\.\d+)*(-\d+)*)[\d||A-a|.|-]*([\'|\"]*)/i
			}
		}
	});

	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['bump']);
};