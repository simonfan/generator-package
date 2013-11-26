'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		nodeunit: {
			files: ['test/test-*.js']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},

			// tests
			test: {
				src: ['test/*.js']
			},

			// generators
			app: {
				src: ['app/*.js', '_amdconfig.js']
			},

			qunit: {
				src: ['qunit/*.js']
			},

			nodeunit: {
				src: ['nodeunit/*.js']
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'nodeunit']
			},

			// generators
			app: {
				files: '<%= jshint.app.src %>',
				tasks: ['jshint:app', 'nodeunit']
			},

			qunit: {
				files: '<%= jshint.qunit.src %>',
				tasks: ['jshint:qunit']
			},

			nodeunit: {
				files: '<%= jshint.nodeunit.src %>',
				tasks: ['jshint:nodeunit']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task.
	grunt.registerTask('default', ['jshint', 'nodeunit']);

};
