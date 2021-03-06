//     <%= _.classify(name) %>
//     (c) <%= author %>
//     <%= _.classify(name) %> is licensed under the <%= license %> terms.

/**
 * AMD module.
 *
 * @module <%= _.classify(name) %>
 */

define(<%= JSON.stringify( _.keys(bowerDependencies) ) %>, function (<%= _(bowerDependencies).keys().map(_.classify).value().join(', ') %>) {
	'use strict';

	console.log('<%= _.classify(name) %> running!');

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};


	return <%= _.classify(name) %>;
});
