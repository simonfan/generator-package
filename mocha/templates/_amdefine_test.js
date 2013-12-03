/**
 * This template does not work properly as
 * amdefine does not accept to be declared twice in the same
 * file and that seems to be in conflict with mocha's manner
 * of running the tests. Do not ask me WHY... didn't want to 
 * dive into that... (:
 * This file is here for you not to forget you've already tried 
 * using amdefine.. if you are trying again, please have a good 
 * reason! It indeed is much more elegant..
 */


var <%= _.classify(moduleName) %>_name = typeof define !== 'function' ?
	// node
	'../src/<%= moduleName %>' :
	// requirejs
	'<%= moduleName %>';

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(['should', <%= _.classify(moduleName) %>_name], function (should, <%= _.classify(moduleName) %>) {
	'use strict';

	describe('<%= name %>', function () {
		beforeEach(function (done) {
			done();
		});

		it('is ok', function () {
			var fruit = { name: 'banana' }
			fruit.should.have.property('name', 'banana');
		});
	});

});
