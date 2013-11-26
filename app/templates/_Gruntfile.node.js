/**
Gruntfile to assis node development.
*/
var path = require('path');

module.exports = function (grunt) {

    'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		nodeunit: {
			files: ['test/nodeunit/*.js']
		},

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/',
				//  themedir: 'path/to/custom/theme/',
					outdir: 'docs/'
				}
			}
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
                src: ['test/**/*.js']
            },

            // src
            src: {
                src: ['src/<%= name %>.js']
            }
        },

        watch: {
            live: {
                files: ['src/<%= name %>.js', 'test/**', 'demo/**'],
                tasks: ['jshint', 'nodeunit']
            }
        },
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');

	// full live
	grunt.registerTask('live', ['watch:live']);
	/**
	[1] Starts a server as a child process
	[2] Starts watching files.
	*/

	grunt.registerTask('default', ['yuidoc', 'nodeunit']);
};
