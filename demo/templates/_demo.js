define(['<%= moduleName %>'], function(<%= _.classify(moduleName) %>) {

	console.log('<%= _.humanize(name) %> demo running.');

	alert('<%= _.humanize(name) %>');
});
