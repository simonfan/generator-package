require.config({
    // cache busting
	urlArgs: 'bust=' + Math.random(),
	// base url is the root.
	baseUrl: '/',
	// remember: paths are relative to the / root.
	paths: {
		requirejs: 'bower_components/requirejs/requirejs',
		text: 'bower_components/requirejs-text/text',


        // the module
		'<%= name %>': 'src/<%= name %>',
	},

	// predefined shims... (we already know they are needed)
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore'],
		},
		underscore: {
			exports: '_',
		}
	},
});
