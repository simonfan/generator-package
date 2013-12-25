/**
 * <%= name %>
 * <%= description %>
 *
 * @module <%= moduleName %>
 * @submodule <%= name %>
 */

define([], function () {
	'use strict';
    console.log('<%= _.classify(name) %> submodule running!');

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};

	return <%= _.classify(name) %>;
});
