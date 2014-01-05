//     <%= _.classify(name) %>
//     (c) <%= author %>
//     <%= _.classify(name) %> is licensed under the <%= license %> terms.

/**
 * AMD and CJS module.
 *
 * @module <%= _.classify(name) %>
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	<% _.each(bowerDependencies, function (source, dependency) { %>
	var <%= _.classify(dependency) %> = require('<%= dependency %>');
	<% }); %>

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};


	return <%= _.classify(name) %>;
});
