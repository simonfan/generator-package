'use strict';
var util = require('util'),
	path = require('path'),
	fs = require('fs');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger');

var NodeunitTestGenerator = module.exports = function NodeunitTestGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the nodeunit subgenerator with the argument ' + this.name + '.');
};

util.inherits(NodeunitTestGenerator, yeoman.generators.NamedBase);

NodeunitTestGenerator.prototype.readPackageJson = function readPackageJson() {
	logger.yellow('Reading package.json ...');

	// read
	var pkg = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'package.json')));

	// save the component name
	this.moduleName = pkg.name;
};
/**
Reads package.json file in order to get the module name.
*/



NodeunitTestGenerator.prototype.directories = function directories() {
	var cb = this.async(),
		p = path.join(this.destinationRoot(), 'test/nodeunit');

	fs.stat(p, function (err, stats) {
		if (err) {
			// create dir
			logger.yellow('Creating a directory to hold all your Nodeunit test files ...');
			this.mkdir('test/nodeunit');
		}

		cb();
	}.bind(this));
};
/**
Create the 'test/nodeunit' dir.
*/

NodeunitTestGenerator.prototype.testFile = function testFile() {
	this.template('_test.js', 'test/nodeunit/' + this.name + '.js');


    logger.green('Nodeunit ' + this.name + ' test file was successfully created.');
};
/**
Create the test file.
*/
