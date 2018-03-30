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
	dummyResponse: {
		"url": "www.ibm.com",
		"request": "www.ibm.com",
		"cats": {
			"Software / Hardware": true,
			"General Business": true
		},
		"score": 1,
		"application": {
			"canonicalName": "ibm kenexa companalyst",
			"name": "IBM Kenexa CompAnalyst",
			"description": "An compensation tool for employees.",
			"actionDescriptions": {},
			"categories": {
				"Software / Hardware": true,
				"General Business": true
			},
			"categoryDescriptions": {
				"Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components.",
				"General Business": "This category includes Web sites of industry, business, economy and supply of services."
			},
			"id": 8678,
			"actions": {},
			"score": 0.2,
			"baseurl": "http://01.ibm.com/software/smarterworkforce/compensation_divestiture",
			"urls": [
				"ibm.com",
				"www-03.ibm.com"
			],
			"riskfactors": {
				"insecure communication": {
					"value": 16,
					"description": "Limited parts of this application are provided over an unencrypted connection"
				}
			}
		},
		"categoryDescriptions": {
			"Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components.",
			"General Business": "This category includes Web sites of industry, business, economy and supply of services."
		}
	},
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
		Config.get(config => {
			if(config.dummyResponses()) {
				Messaging.sendToContent(
					tab.id,
					"URLReport.success", {
						content: URLReportCommand.dummyResponse,
						request: info.linkUrl
					});
			} else {
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
			}
		});
	},
	/** Registers the response listeners in the content script.
		This function must be called from the content script. */
	registerInContentScript: function() {
		// listen for reports.
		Messaging.listen(
			"URLReport.success",
			// add received reports to the visited page.
			success => {console.error("SUCCESS"); addReport(success.content, success.request); });

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