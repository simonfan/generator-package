define(['<%= moduleName %>'], function (<%= _.classify(moduleName.replace(/\./g,'-')) %>) {
    'use strict';

    return function () {

        QUnit.module('<%= _.humanize(name) %>');

        test('<%= _.humanize(name) %>', function () {
            ok(true);
        });

    }
});
