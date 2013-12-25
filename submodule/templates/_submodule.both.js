/**
 * <%= name %>
 * <%= description %>
 *
 * @module <%= moduleName %>
 * @submodule <%= name %>
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define([], function () {
	'use strict';

	console.log('<%= _.classify(name) %> running!');

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};


	return <%= _.classify(name) %>;
});
