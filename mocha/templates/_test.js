(function(name, factory) {

	if (typeof define !== 'function') {
		// node
		var deps = ['should', '../src/<%= moduleName %>'].map(require);

		factory.apply(null, deps);
	} else {
		// browser
		define(['should', '<%= moduleName %>'], factory);
	}

})('test', function(should, <%= _.classify(moduleName) %>) {
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
