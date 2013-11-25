'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var NodeunitGenerator = module.exports = function NodeunitGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the nodeunit subgenerator with the argument ' + this.name + '.');
};

util.inherits(NodeunitGenerator, yeoman.generators.NamedBase);

NodeunitGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
