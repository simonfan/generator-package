/**
Gruntfile to assis node development.
*/
var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			live: {
				files: ['<%= name %>.js','test/**','demo/**'],
                tasks: ['nodeunit']
			}
		},

        nodeunit: {
            files: ['test/nodeunit/*.js']
        },
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// full live
	grunt.registerTask('live',['watch:live']);
	/**
	[1] Starts a server as a child process
	[2] Starts watching files.
	*/

	grunt.registerTask('default',['live']);
};
