'use strict';
var util = require('util'),
	path = require('path'),
	fs = require('fs'),

	yeoman = require('yeoman-generator'),
	logger = require('chalk-logger');

var QUnitTestGenerator = module.exports = function QUnitTestGenerator(args, options, config) {

	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('Creating a QUnit test: ' + this.name + '.');
};

util.inherits(QUnitTestGenerator, yeoman.generators.NamedBase);


// generator steps

QUnitTestGenerator.prototype.readBowerJson = function readBowerJson() {
	logger.yellow('Reading bower.json ...');

	// read
	var bower = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'bower.json')));

	// save the component name
	this.moduleName = bower.name;
};
/**
Reads data about the tested module.
Make mainFileName and moduleName available to this subgenerator.
*/

QUnitTestGenerator.prototype.directories = function directories() {
	var cb = this.async(),
		p = path.join(this.destinationRoot(), 'test/qunit/tests');

	fs.stat(p, function (err, stats) {
		if (err) {
			// create dir
			logger.yellow('Creating a directory to hold all your QUnit test files ...');
			this.mkdir('test/qunit/tests');
		}

		cb();
	}.bind(this));
};
/**
Makes sure the directories
	'/test/qunit',
	'/test/qunit/tests'
exist.
*/

QUnitTestGenerator.prototype.indexHtml = function indexHtml() {
	var cb = this.async(),
		p = path.join(this.destinationRoot(), 'test/qunit/index.html');

	fs.stat(p, function (err, stats) {
		if (err) {
			// create file.
			logger.yellow('Creating \'test/qunit/index.html\', where your QUnit tests should be loaded.');
			this.template('_index.html', 'test/qunit/index.html');
		}

		cb();

	}.bind(this));
};
/**
Makes sure there is a index.html file inside 'test/qunit' directory
*/

QUnitTestGenerator.prototype.testFile = function testFile() {
	this.template('_test.js', 'test/qunit/tests/' + this.name + '.js');
};
/**
Creates the file '/test/qunit/tests/<%= testname %>.js'.
*/

QUnitTestGenerator.prototype.testsJson = function testsJson() {
	// get all names of the files that are under '/test/qunit/tests/'.
	var dest = this.destinationRoot(),
		files = fs.readdirSync(path.join(dest, 'test/qunit/tests')),
		filesJsonString = JSON.stringify(files);

	logger.yellow('Rewriting \'test/qunit/tests.json\' ...');
	fs.writeFileSync(path.join(dest, 'test/qunit/tests.json'), filesJsonString);



	logger.green('The ' + this.name + ' test file was successfully created. (:');
};
/**
Creates or Updates the '/test/qunit/tests.json' file, which basically contains
an array with names of the test files.
*/
