/**
 * CJS module.
 *
 * @module <%= _.classify(name) %>
 */

'use strict';

<% _.each(npmDependencies, function(source, dependency) { %>
var <%= _.classify(dependency) %> = require('<%= dependency %>');
<% }); %>

exports.awesome = function() {
	return 'awesome';
};
