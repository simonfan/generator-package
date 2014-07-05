(function(name, factory) {

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		// node (common.js)
		var deps = ['backbone','lazy.js'].map(require);

		module.exports = factory.apply(null, deps);

	} else if (typeof define === 'function' && define.amd) {
		// browser (AMD)
		define(['backbone','lazy.js'], factory);

	}

})('SomeModule', function factory(Backbone, Lazy) {

	console.log('factory ran');

	return Constructor = Backbone.Model.extend({
		someMethod: function someMethod() {
			console.log('some method ran!')
		}
	});
});