if(Requirement.scope === "background")
	Requirement.need("url-report-command.js", [
		"context-menu.js",
		"report-cache.js",
		"messaging.js"]);
else
	Requirement.need("url-report-command.js", [
		"messaging.js",
		"response.js"]);

/** The context menu URL report command. */
var URLReportCommand = {
	/** Registers the button in the context menu.
		This should be called from the background script. */
	registerInBackgroundScript: function() {
		ContextMenu.addEntry(
			"Context.URLReport",
			"Get URL report",
			["link"],
			URLReportCommand.contextListener);
	},
	/** The listener for the context menu button. */
	contextListener: function(info, tab) {
		reportCache.queryReport(
			info.linkUrl,
			(response) => {
				Messaging.sendToContent(
					tab.id,
					"URLReport.success", {
						content: response,
						request: info.linkUrl
					});
			},
			(response) => {
				Messaging.sendToContent(
					tab.id,
					"URLReport.errorResponse", {
						content: response,
						request: info.linkUrl
					});
			},
			(response) => {
				Messaging.sendToContent(
					tab.id,
					"URLReport.connectionError", {
						content:response,
						request:info.linkUrl
					});
			});
	},
	/** Registers the response listeners in the content script.
		This function must be called from the content script. */
	registerInContentScript: function() {
		// listen for reports.
		Messaging.listen(
			"URLReport.success",
			// add received reports to the visited page.
			success => addReport(success.content, success.request));

		// listen for API errors.
		Messaging.listen(
			"URLReport.errorResponse",
			// display API errors.
			errorResponse => alert("Error: " + JSON.stringify(errorResponse)));
		
		// listen for connection errors.
		Messaging.listen(
			"URLReport.connectionError",
			// display connection errors.
			connectionError => alert("Connection Error: " + JSON.stringify(connectionError)));
	}
};