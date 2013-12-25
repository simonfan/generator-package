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

define(<%= JSON.stringify( _.keys(bowerDependencies) ) %>, function (<%= _(bowerDependencies).keys().map(_.classify).value().join(', ') %>) {
	'use strict';

	console.log('<%= _.classify(name) %> running!');

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};


	return <%= _.classify(name) %>;
});
