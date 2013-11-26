/**
Gruntfile designed to work for modules that work on browser and node.
*/
var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			default: {
				options: {
					hostname: 'localhost',
					port: 8000,
					keepalive: true,
					livereload: true,
					open: 'http://localhost:8000',
				}
			},
		},

		bower: {
			target: {
				rjsConfig: 'amdconfig.js',
			}
		},

		watch: {
			live: {
				files: ['<%= name %>.js','test/**','demo/**'],
				options: {
					livereload: true
				}
			},

			bower: {
				files: ['bower.json'],
				tasks: ['bower']
			},

            nodeunit: {

            }
		},

        nodeunit: {
            files: ['test/nodeunit/*.js']
        },
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-bower-requirejs');
	/**
	Gets dependencies from bower.json and puts them into the require.js
	configuration script (amdconfig.js).
	*/

    grunt.loadNpmTasks('grunt-contrib-nodeunit');


	/**
	Auxiliary task that starts a server in a child process.
	*/
	grunt.registerTask('child-process-server', function() {
		// start the server on a child process
		// so that it does not block the thread.
		grunt.util.spawn({
			cmd: 'grunt',
			args: ['connect']
		});
	});

	// full live
	grunt.registerTask('live',['child-process-server','watch:live']);
	/**
	[1] Starts a server as a child process
	[2] Starts watching files.
	*/

	grunt.registerTask('default',['bower']);
};
