'use strict';

var should = require('should');

var <%= _.classify(moduleName) %> = require('../<%= npmMain %>');

describe('<%= _.classify(moduleName) %> <%= name %>', function () {
	beforeEach(function (done) {
		done();
	});

	it('is fine (:', function () {
		var fruit = { name: 'banana' }
		fruit.should.have.property('name', 'banana');
	});
});
