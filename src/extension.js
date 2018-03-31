Requirement.need("extension.js", [
	"config.js",
	"url-report-command.js"]);


Config.register();

URLReportCommand.registerInContentScript(
	// add received reports to the visited page.
	success => addReport(success.content, success.request),
	// display API errors.
	errorResponse => alert("Error: " + JSON.stringify(errorResponse)),
	// display connection errors.
	connectionError => alert("Connection Error: " + JSON.stringify(connectionError)));

FileHashReport.registerInContentScript();

parseLinks();