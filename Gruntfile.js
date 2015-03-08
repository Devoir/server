module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha-cov');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file 
					quiet: false, // Optionally suppress output to standard out (defaults to false) 
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
				},
				src: ['test/**/*.js']
			}
		},
		mochacov: {
			options: {
				coveralls: false,
				instrument: false,
				ui: 'tdd',
				reporter: 'html-cov',
				output: 'coverage.html'
			},
			all: ['test/**/*.js']
		}
	});

	grunt.registerTask('test', 'mochaTest');
	grunt.registerTask('coverage', 'mochacov');
};