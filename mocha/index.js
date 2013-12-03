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


MochaGenerator.prototype.testFile = function testFile() {
	this.template('_test.js', 'test/' + this.name + '.js');
};
/**
Create the test file.
*/

MochaGenerator.prototype.testsJson = function testsJson() {
	// get all names of the files that are under '/test/qunit/tests/'.
	var dest = this.destinationRoot(),
		files = fs.readdirSync(path.join(dest, 'test'));

	// remove non-.js files
	files = this._.filter(files, function(f) {
		return /\.js$/.test(f);
	});

	logger.yellow('Rewriting \'test/tests.json\' ...');
	fs.writeFileSync(path.join(dest, 'test/tests.json'), JSON.stringify(files));

	logger.green('The ' + this.name + ' test file was successfully created. (:');
};
/**
Creates or Updates the '/test/tests.json' file, which basically contains
an array with names of the test files.
*/
