//     <%= _.classify(name) %>
//     (c) <%= author %>
//     <%= _.classify(name) %> is licensed under the <%= license %> terms.

/**
 * AMD and CJS module.
 *
 * @module <%= _.classify(name) %>
 */

(function (name, factory) {

	///////////////////
	// Normalization //
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		// node (common.js)
		var deps = <%= JSON.stringify(_.keys(npmDependencies)) %>.map(require);

		module.exports = factory.apply(null, deps);

	} else if (typeof define === 'function' && define.amd) {
		// browser (AMD)
		define(<%= JSON.stringify(_.keys(bowerDependencies)) %>, factory);
	}
	// Normalization //
	///////////////////

})('<%= name %>', function (<%= _(bowerDependencies).keys().map(_.classify).value().join(', ') %>) {

    'use strict';

	console.log('<%= _.classify(name) %> running...');

	var <%= _.classify(name) %> = function <%= _.classify(name) %>() {

	};

	return <%= _.classify(name) %>;
});
// IIFE that is actually the module definition.
