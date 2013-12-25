//     <%= _.classify(name) %>
//     (c) <%= author %>
//     <%= _.classify(name) %> is licensed under the <%= license %> terms.

/**
 * CJS module.
 *
 * @module <%= _.classify(name) %>
 */

'use strict';

console.log('<%= name %> running');

<% _.each(npmDependencies, function (source, dependency) { %>
var <%= _.classify(dependency) %> = require('<%= dependency %>');
<% }); %>

exports.<%= name %> = function <%= name %>() {
	return 'awesome!';
};
