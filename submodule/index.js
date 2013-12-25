'use strict';
var util = require('util'),
	path = require('path'),
	fs = require('fs');

var yeoman = require('yeoman-generator'),
	logger = require('chalk-logger'),
	subject = require('subject'),
	_ = require('lodash');

/**
 * An object for environments options.
 */
var environmentsObj = subject.define({
	initialize: function (env) {
		this.env = env;
	},

	isBrowser: function () {
		return _.contains(this.env, 'browser');
	},

	isNode: function () {
		return _.contains(this.env, 'node');
	},

	isBoth: function () {
		return this.isBrowser() && this.isNode();
	}
});


var SubmoduleGenerator = module.exports = function SubmoduleGenerator(args, options, config) {

	yeoman.generators.Base.apply(this, arguments);

	this.argument('name', { type: String, required: false });

	var msg = this.name ?
		'You called the submodule subgenerator with the argument ' + this.name + '.' :
		'You called the submodule subgenerator. Please provide a name for your submodule.';

	logger.green(msg);

	this.on('end', function() {
		logger.green('woooooooooooooooooooooooha! We are done. (;');
	})
};

util.inherits(SubmoduleGenerator, yeoman.generators.Base);

/**
 * [1] Ask for name only if name is not defined yet.
 * [2] Should the submodule be packaged within a folder?
 */
SubmoduleGenerator.prototype.askFor = function askFor() {

	var cb = this.async();

	// questions.
	var prompts = [];

	if (!this.name) {

		prompts.push({
			name: 'name',
			message: 'What is the name of the submodule?',
		});
	}

	prompts.push({
		name: 'moduleDir',
		message: 'Should the submodule be packaged within a dir?',
		type: 'confirm',
	});

	prompts.push({
		name: 'environments',
		type: 'checkbox',
		choices: [
			{ name: 'Node.js (common.js)', value: 'node', checked: true },
			{ name: 'Browser (amd)', value: 'browser', checked: true },
		],
		message: 'Sorry.. i forgot: for which environments is the component designed for?'
	});


	this.prompt(prompts, function(ans) {
		// name
		this.name = ans.name;

		// whether to create a dir for the submodule
		this.moduleDir = ans.moduleDir;

		// environments
		this.environments = environmentsObj(ans.environments);

		cb();
	}.bind(this));
};


// read package.json data
SubmoduleGenerator.prototype.readPackageJson = function readPackageJson() {
	var fjson = this.readFileAsString(path.join(this.destinationRoot(), 'package.json')),
		pkg = JSON.parse(fjson);

	this.moduleName = pkg.name;
}


/**
 * dir and file are excludents:
 */

/**
 * If requested, create a dir and an index.js for the submodule.
 */
SubmoduleGenerator.prototype.dir = function dir() {
	if (this.moduleDir) {
		logger.green('Creating a dir for ' + this.name + ' submodule.');

		this.mkdir('src/' + this.name);

		var template = this.environments.isBoth() ? 'both' : this.environments.isBrowser() ? 'browser' : 'node';

		this.template('_submodule.' + template + '.js', 'src/' + this.name + '/index.js');
	}
};

/**
 * Create the module file within src/
 */
SubmoduleGenerator.prototype.file = function file() {
	if (!this.moduleDir) {
		logger.green('Creating a file for your submodule ' + this.name);

		var template = this.environments.isBoth() ? 'both' : this.environments.isBrowser() ? 'browser' : 'node';

		this.template('_submodule.' + template + '.js', 'src/' + this.name + '.js');
	}
};
