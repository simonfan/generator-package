'use strict';
var util = require('util'),
	path = require('path'),
	fs = require('fs');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger');

var MochaGenerator = module.exports = function MochaGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the mocha subgenerator with the argument ' + this.name + '.');


	this.on('end', function() {
		logger.green('wooooooooooooooha! We are done. (;');
	})
};

util.inherits(MochaGenerator, yeoman.generators.NamedBase);

MochaGenerator.prototype.readPackageJson = function readPackageJson() {
	logger.yellow('Reading package.json ...');

	// read
	var pkg = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'package.json')));

	// save the component name
	this.moduleName = pkg.name;
};
/**
Reads package.json file in order to get the module name.
*/

/**
 * Checks if the environment is node.js or browser / browser && node.js.
 * Do that by checking if an 'index.html' is in the /test dir.
 */
MochaGenerator.prototype.checkEnvironment = function checkEnvironment() {

	logger.green('Checking out the environment for which this module was made for...')

	var cb = this.async(),
		indexHtmlPath = path.join(this.destinationRoot(), 'test/index.html');

	fs.readFile(indexHtmlPath, function(err, data) {
		this.environment = err ? 'node' : 'browser';

		logger.green('Ok, got it: ' + this.environment);

		cb();
	}.bind(this));
};


MochaGenerator.prototype.testFile = function testFile() {
	logger.green('Creating a test file...');

	var template = this.environment === 'node' ? '_test.node.js' : '_test.browser.js';

	this.template(template, 'test/' + this.name + '.js');
};
/**
Create the test file.
*/

/**
 * If environment is browser, create test.json file.
 */
MochaGenerator.prototype.testsJson = function testsJson() {

	if (this.environment === 'browser') {

		// get all names of the files that are under '/test/qunit/tests/'.
		var dest = this.destinationRoot(),
			files = fs.readdirSync(path.join(dest, 'test'));

		// remove non-.js files
		files = this._.filter(files, function(f) {
			return /\.js$/.test(f);
		});

		logger.yellow('Rewriting \'test/tests.json\' ...');
		fs.writeFileSync(path.join(dest, 'test/tests.json'), JSON.stringify(files));
	}
};
/**
Creates or Updates the '/test/tests.json' file, which basically contains
an array with names of the test files.
*/
