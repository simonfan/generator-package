define(<%= JSON.stringify( _.keys(bowerDependencies) ) %>, function(<%= _(bowerDependencies).keys().map(_.classify).value().join(', ') %>) {
	console.log('<%= name.classified %> running!')



});
