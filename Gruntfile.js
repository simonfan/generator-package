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
			},


            // temporary files
            tmp: {
                src: ['_tmp*/*.js', '_tmp*/src/*.js', '_tmp*/test/**.js', '_tmp*/demo/*.js']
            }
		},

		shell: {
			// run the generator
			yoapp: {
				command: 'mkdir _tmp && cd _tmp && yo package && cd ../',
				options: {
					stdout: true,
					stdin: true,
					stderr: true,
					failOnError: true,
                    callback: function(err, stdout, stderr, cb) {


                        console.log('Finished running');

                        cb();
                    }
				}
			},
		},

		clean: {
            tmp: ['_tmp*']
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
	grunt.loadNpmTasks('grunt-shell');


    // Generation testing
    grunt.registerTask('generator-test', ['shell:yoapp', 'jshint:tmp', 'clean:tmp']);

	// Default task.
	grunt.registerTask('default', ['jshint', 'nodeunit']);

};
