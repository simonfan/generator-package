'use strict';
var util = require('util'),
	path = require('path'),
	fs = require('fs');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger');

var MochaGenerator = module.exports = function MochaGenerator(args, options, config) {

	yeoman.generators.Base.apply(this, arguments);

	this.argument('name', { type: String, required: false });

	var msg = this.name ?
		'You called the mocha subgenerator with the argument ' + this.name + '.' :
		'You called the mocha subgenerator. Please provide a name for your test.';

	logger.green(msg);

	this.on('end', function() {
		logger.green('wooooooooooooooha! We are done. (;');
	})
};

util.inherits(MochaGenerator, yeoman.generators.Base);

MochaGenerator.prototype.askFor = function askFor() {
	if (!this.name) {
		var cb = this.async();

		this.prompt([{
			name: 'name',
			message: 'What is the name of the test?',
		}], function(ans) {
			this.name = ans.name;

			cb();
		}.bind(this));
	}
};


MochaGenerator.prototype.readPackageJson = function readPackageJson() {
	logger.yellow('Reading package.json ...');

	// read
	var pkg = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'package.json')));

	// save the component name
	this.moduleName = pkg.name;

	// save the main file path
	this.npmMain = pkg.main;
};
/**
Reads package.json file in order to get the module name.
*/


MochaGenerator.prototype.testFile = function testFile() {
	logger.green('Creating a test file...');

	this.template('_test.js', 'test/' + this.name + '.js');
};
/**
Create the test file.
*/


/**
 *
 * Creates a dummy fixture.html on destination.
 * ONLY IF NO FIXTURE IS FOUND.
 *
 */
MochaGenerator.prototype.fixtureHtml = function fixtureHtml() {

	var done = this.async();

	var fixturePath = path.join(this.destinationRoot(), 'test/fixture.html');

	// check if there is a fixture written
	fs.readFile(fixturePath, function (err, data) {

		// only do stuff if no file is there
		if (err) {
			logger.red('Creating a dummy fixture file');

			fs.writeFileSync(fixturePath, '<div> Place whatever html you need here </div>');
		}

		done();

	});

};


MochaGenerator.prototype.testsHtml = function testsHtml() {
	// [1] get all names of the files that are under '/test/qunit/tests/'.
	var dest = this.destinationRoot(),
		files = fs.readdirSync(path.join(dest, 'test'));

	// [1.1] remove non-.js files
	files = this._.filter(files, function(f) {
		return /\.js$/.test(f);
	});

	// [1.2] add '/test/' prefix to files
	files = this._.map(files, function (f) {
		return path.join('/test', f);
	});

	// [1.3] add 'text!/test/fixture.html' to file dependencies array
	files.unshift('text!/test/fixture.html');

	// [2] get the _index.html template file
	var src = this.sourceRoot(),
		templateString = this.readFileAsString(path.join(src, '_index.html'));

	// [3] get the fixture html
//	var fixture = this.readFileAsString(path.join(this.destinationRoot(), 'test', 'fixture.html'))

	// do the templating by ourselves, as we must overwrite the file.
	logger.red('--------WARNING-------');
	logger.red('--------WARNING-------');
	logger.red('--------WARNING-------');
	logger.red('The new package generator overwrites the default /test/index.html.')
//	logger.red('If you have any fixtures there, please move them to the fixtures.html file.');
	logger.red('IF YOU HAVE NOT DONE THAT, REFUSE OVERWRITING HERE.')
	this.template('_index.html', 'test/index.html', {
		files: JSON.stringify(files),
	//	fixture: fixture,
	});
};
/**
Creates or Updates the '/test/index.html' file, which contains
an array with names of the test files.
*/
