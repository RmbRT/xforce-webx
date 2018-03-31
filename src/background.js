Requirement.need("background.js", [
	"config.js",
	"url-report-command.js",
	"auto-check.js",
	"active-collection.js",
	"collection-cache.js"]);

// register the config object.
Config.register();
// Register the URL report context button.
URLReportCommand.registerInBackgroundScript();
// Register the automatic URL risk checker.
AutoCheck.registerInBackgroundScript();
// Register the active collection listener.
ActiveCollection.registerInBackgroundScript();
// Register the collection cache listeners.
CollectionCache.registerInBackgroundScript();
// Register the file hash report context button.
FileHashReport.registerInBackgroundScript();