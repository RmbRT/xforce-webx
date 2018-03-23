Requirement.need("background.js", [
	"url-report-command.js",
	"auto-check.js",
	"active-collection.js",
	"collection-cache.js"]);

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