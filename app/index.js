'use strict';
var util = require('util');
var path = require('path');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger'),
    chalk = require('chalk');

var PackageGenerator = module.exports = function PackageGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

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
		message: 'What ' + chalk.blue('BOWER') + ' components does this component depend upon?'
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
	// npm stuff is templated anyway because of grunt.
	this.template('_package.json', 'package.json');
};

PackageGenerator.prototype.npmDependenciesInstall = function npmDependenciesInstall() {
	if (this.npmDependenciesInput) {
		var cb = this.async();

		logger.yellow('Installing NPM dependencies');

		this.npmInstall(this.npmDependenciesInput, { save: true }, cb);
	}
};

PackageGenerator.prototype.npmDependenciesRead = function npmDependenciesRead() {
	if (this.npmDependenciesInput) {
		var pkg = this.readFileAsString(path.join(this.destinationRoot(), 'package.json'));
		pkg = JSON.parse(pkg);

		this.npmDependencies = pkg.dependencies;
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

		logger.yellow('Installing bower dependencies for your package ...');

		this.bowerInstall(this.bowerDependenciesInput, { save: true }, cb);
	}
};

PackageGenerator.prototype.bowerDependenciesRead = function bowerDependenciesRead() {
	// only run if bowerDependenciesInput is set
	if (this.bowerDependenciesInput) {

		var bower = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'bower.json')));

		this.bowerDependencies = bower.dependencies;
	}
};



/// debugging ///
PackageGenerator.prototype.log  = function() {
	console.log(this.npmDependencies);
	console.log(this.bowerDependencies);
}
/// debugging ///



PackageGenerator.prototype.test = function test() {
	this.mkdir('test');

	this.mkdir('test/nodeunit');
	this.mkdir('test/qunit');
};
/**
Test related stuff:
    nodeunit
    qunit
*/


PackageGenerator.prototype.demo = function demo() {
	this.mkdir('demo');
};
/**
Directory to hold demos.
*/

PackageGenerator.prototype.src = function src() {
	this.mkdir('src');

	var file = 'src/' + this.name + '.js';

	if (this._environment(['node','browser'])) {
        // both
		this.template('src/_both.js', file);

	} else if (this._environment('node')) {
        // node only
		this.template('src/_node.js', file);

	} else if (this._environment('browser')) {
        // browser
		this.template('src/_amd.js', file);

	}
}
/**
Templates the main package file.

Selects the right source template according to the environments
the user selected.
*/










PackageGenerator.prototype.projectfiles = function projectfiles() {
    this.template('_README.md', 'README.md');

    this.template('_Gruntfile.js', 'Gruntfile.js');

    this.copy('gitignore', '.gitignore');

	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
