(function(name, factory) {

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // node (common.js)
        var deps = <%= JSON.stringify(_.keys(npmDependencies)) %>.map(require);

        module.exports = factory.apply(null, deps);

    } else if (typeof define === 'function' && define.amd) {
        // browser (AMD)
        define(<%= JSON.stringify(_.keys(bowerDependencies)) %>, factory);
    }

})(<%= _.classify(name) %>, function(<%= _(bowerDependencies).keys().map(_.classify).value().join(', ') %>) {

    console.log('<%= _.classify(name) %> running...')

    return <%= _.classify(name) %> = function <%= _.classify(name) %>() {

    }
});
// IIFE
