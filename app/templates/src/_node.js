/*
 * <%= name %>
 * <%= homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

<% _.each(npmDependencies, function(source, dependency) { %>
var <%= _.classify(dependency) %> = require('<%= dependency %>');
<% }); %>

exports.awesome = function() {
  return 'awesome';
};
