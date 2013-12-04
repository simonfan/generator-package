(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'../src/<%= moduleName %>' :
		// browser
		'<%= moduleName %>',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(<%= _.classify(moduleName) %>, should) {
	'use strict';

	describe('<%= _.classify(moduleName) %> <%= name %>', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {
			var fruit = { name: 'banana' }
			fruit.should.have.property('name', 'banana');
		});
	});
});
