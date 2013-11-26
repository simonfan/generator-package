'use strict';
var util = require('util');
var path = require('path');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger'),
	chalk = require('chalk');

var PackageGenerator = module.exports = function PackageGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);


	// run grunt when the scaffolding is finished.
	this.on('end', function () {

		// check environment and run tasks accordingly
		var tasks = this._environment('browser') ? ['yuidoc', 'bower', 'live'] : ['yuidoc', 'nodeunit'];

		// at this time the dependencies were already installed.
		this.spawnCommand('grunt', tasks);

	}.bind(this));

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PackageGenerator, yeoman.generators.Base);

///////// Private methods //////////
PackageGenerator.prototype._source = function _source(dir) {
	// if no originalSourceRoot was set before, set it now.
	this.originalSourceRoot = this.originalSourceRoot || path.resolve(this.sourceRoot());

	var source = path.join(this.originalSourceRoot, dir);
	return this.sourceRoot(source);
};
/**
Set sourceRoot relative to the original sourceRoot.
*/

PackageGenerator.prototype._destination = function _destination(dir) {
	// if no originalDestinationRoot was set before, set it now.
	this.originalDestinationRoot = this.originalDestinationRoot || path.resolve(this.destinationRoot());

	var destination = path.join(this.originalDestinationRoot, dir);
	return this.destinationRoot(destination);
};
/**
Set destinationRoot relative to the originalDestinationRoot.
*/


PackageGenerator.prototype._environment = function _environment(env) {
	var _ = this._;

	if (_.isArray(env)) {
		return _.every(env, this._environment.bind(this));
	} else {
		return _.contains(this.environments, env);
	}
};
/**
Checks if a given environment was selected by the user during prompts.
*/

PackageGenerator.prototype._environmentType = function _environmentType() {
	return this._environment(['browser', 'node']) ? 'both' : this._environment('browser') ? 'browser' : 'node';
};
/**
Returns a string that describes the environment type.
*/

///////// Private methods //////////





PackageGenerator.prototype.askFor = function askFor() {
	var cb = this.async(),
		_ = this._;

	// have Yeoman greet the user.
	console.log(this.yeoman);


	var prompts = [];

	prompts.push({
		name: 'name',
		message: 'What is the name of this package?',
		default: this._.last(process.cwd().split('/'))
	});

	prompts.push({
		name: 'environments',
		type: 'checkbox',
		choices: [
			{ name: 'Node.js (common.js)', value: 'node', checked: true },
			{ name: 'Browser (amd)', value: 'browser', checked: true },
		],
		message: 'For which environments is the component designed for?'
	});

	prompts.push({
		name: 'npmDependenciesInput',
		when: function (answers) {
			return _.contains(answers.environments, 'node');
		},
		message: 'What ' + chalk.red('NPM') + ' packages does this package depend upon?'
	});

	prompts.push({
		name: 'bowerDependenciesInput',
		when: function (answers) {
			return _.contains(answers.environments, 'browser');
		},
		message: 'What ' + chalk.blue('BOWER') + ' components does this component depend upon?',
		default: function (answers) {
			return answers.npmDependenciesInput || '';
		}
	});

	// save options
	this.prompt(prompts, function (answers) {

		_.extend(this, answers);

		cb();
	}.bind(this));
};
/**
Prompts:

[1] What is the name of the package?
[2] For which environments is the package intended for?
[3] What NPM packages does the package depend upon?
[4] What BOWER component does the package depend upon?
*/




/**
NPM dependencies
1. Template package.json
2. Install npm dependencies saving them to package.json
3. Read the dependency names from package.json file and make them
	available through this.npmDependencies
*/
PackageGenerator.prototype.npmFiles = function npmFiles() {
	// choose package.json template file based on environment
	var envType = this._environmentType();

	// npm stuff is templated anyway because of grunt.
	this.template('_package.' + envType + '.json', 'package.json');
};

PackageGenerator.prototype.npmDependenciesInstall = function npmDependenciesInstall() {
	if (this.npmDependenciesInput) {
		var cb = this.async();

		logger.yellow('Installing NPM dependencies ...');

		this.npmInstall(this.npmDependenciesInput, { save: true }, cb);
	}
};

PackageGenerator.prototype.npmDependenciesRead = function npmDependenciesRead() {
	if (this.npmDependenciesInput) {
		var pkg = this.readFileAsString(path.join(this.destinationRoot(), 'package.json'));
		pkg = JSON.parse(pkg);

		this.npmDependencies = pkg.dependencies;
	} else {
		this.npmDependencies = {};
	}
};

/**
Bower dependencies:
1. Template bower.json
2. Install bower dependencies saving them to bower.json
3. Read the dependency names from bower.json file and make that
	var available as this.bowerDependencies.
*/
PackageGenerator.prototype.bowerFiles = function bowerFiles() {
	// only run if the environment includes the browser.
	if (this._environment('browser')) {

		this.template('_bower.json', 'bower.json');
	}
};

PackageGenerator.prototype.bowerDependenciesInstall = function bowerDependenciesInstall() {
	// only run if bowerDependenciesInput is set.

	if (this.bowerDependenciesInput) {
		var cb = this.async();

		logger.yellow('Installing BOWER dependencies ...');

		this.bowerInstall(this.bowerDependenciesInput, { save: true }, cb);
	}
};

PackageGenerator.prototype.bowerDependenciesRead = function bowerDependenciesRead() {
	// only run if bowerDependenciesInput is set
	if (this.bowerDependenciesInput) {

		var bower = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'bower.json')));

		this.bowerDependencies = bower.dependencies;
	} else {
		this.bowerDependencies = {};
	}
};


PackageGenerator.prototype.rootFiles = function rootFiles() {
	this.template('_amdconfig.js', 'amdconfig.js');
	this.template('_index.html', 'index.html');
};
/**
Templates general files at the root level:
	amdconfig.js
	index.html
*/

/**
Tests
*/
PackageGenerator.prototype.tests = function tests() {
	this.mkdir('test');
};
/**
Create test dir.
*/

PackageGenerator.prototype.nodeUnit = function nodeUnit() {
	// if the module is for node environment, create a node unit test
	if (this._environment('node')) {

		var cb = this.async();

		this.invoke('package:nodeunit', {
			args: ['base'],
		}, cb);
	}
};
/**
If is node environment, invoke package:nodeunit subgenerator.
*/

PackageGenerator.prototype.qUnit = function qUnit() {
	// if the module is for browser environment, create a qunit test
	if (this._environment('browser')) {

		var cb = this.async();

		this.invoke('package:qunit', {
			args: ['base'],
		}, cb);
	}
};
/**
If is browser environment, invoke package:qunit subgenerator.
*/


PackageGenerator.prototype.demo = function demo() {
	this.mkdir('demo');

	if (this._environment('browser')) {
		var cb = this.async();

		this.invoke('package:demo', {
			args: ['main']
		}, cb)
	}
};
/**
Directory to hold demos.
*/


PackageGenerator.prototype.docs = function docs() {
	this.mkdir('docs');
};
/**
Create needed stuff for yui docs.
*/

PackageGenerator.prototype.src = function src() {
	this.mkdir('src');

	var file = 'src/' + this.name + '.js';

	if (this._environment(['node', 'browser'])) {
		// both
		this.template('src/_both.js', file);

	} else if (this._environment('node')) {
		// node only
		this.template('src/_node.js', file);

	} else if (this._environment('browser')) {
		// browser
		this.template('src/_amd.js', file);

	}
};
/**
Templates the main package file.

Selects the right source template according to the environments
the user selected.
*/


PackageGenerator.prototype.projectfiles = function projectfiles() {
	this.template('_README.md', 'README.md');


	var envType = this._environmentType();

	this.template('_Gruntfile.' + envType + '.js', 'Gruntfile.js');

	this.copy('gitignore', '.gitignore');

	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
/**

*/

PackageGenerator.prototype.finish = function finish() {
	this._source('.');
	this._destination('.');

	var cb = this.async();

	this.installDependencies({
		npm: true,
		bower: true,

		callback: cb,
	});
};
/**
Install all dependencies synchronously, so that on end,
grunt commands may be run.
*/
