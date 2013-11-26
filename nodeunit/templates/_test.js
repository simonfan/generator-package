'use strict';

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.<%= _.classify(name) %> = {
    setUp: function (done) {
        // setup here
        done();
    },

    // tests:
    moduleLoading: function (t) {
        var Module = require('../../src/<%= moduleName %>');

        t.ok(Module, 'Module loaded without any explosions! :D');

        t.done();
    }
};

/*
exports.<%= _.classify(name) %> = function (t) {

    var Module = require('../src/<%= moduleName %>');
    t.ok(Module);

    t.done();
};
*/
