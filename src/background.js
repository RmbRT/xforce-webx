browser.contextMenus.create({
	id: "get URL report",
	title: "Get URL report",
	contexts: ["link"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId === "get URL report") {
		// is the report cached already?
		var report;
		if(report = reportCache.findReport(info.linkUrl))
		{
			browser.tabs.executeScript({
				code: 'alert(' + JSON.stringify(report) + ');'
			});
			return;
		}

		// otherwise, request report.
		XForceAPI.urlReport(
			info.linkUrl,
			function(response) {
				// add the report to the cache.
				reportCache.addReport(response);
				browser.tabs.executeScript({
					code: 'alert(' + JSON.stringify(response) + ');'
				});
			},
			function(errorResponse) {
				browser.tabs.executeScript({
					code: 'alert("error: " + ' + JSON.stringify(errorResponse) + ');'
				});
			},
			function(connectionError) {
				browser.tabs.executeScript({
					code: 'alert("connection error: " + ' + JSON.stringify(connectionError) + ');'
				});
			});
	}
});
