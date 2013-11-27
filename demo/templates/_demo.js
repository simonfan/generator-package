define(['<%= moduleName %>'], function (<%= _.classify(moduleName) %>) {

    var msg = '<%= _.humanize(name) %> demo of the <%= moduleName %> module running!';

	console.log(msg);

	alert(msg);
});
