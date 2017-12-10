browser.contextMenus.create({
	id: "get URL report",
	title: "Get URL report",
	contexts: ["link"]
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
		// the tab id has to be curried into the event handlers.
		XForceAPI.urlReport(
			info.linkUrl,
			((curry) => { return function(response) {
				// add the report to the cache.
				reportCache.addReport(response);
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "Response",
					content: response
				});
			};})({"tabId": tab.id}),
			((curry) => { return function(errorResponse) {
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "ErrorResponse",
					content: errorResponse
				});
			};})({"tabId": tab.id}),
			((curry) => { return function(connectionError) {
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "ConnectionError",
					content: connectionError
				});
			};})({"tabId": tab.id}));
	}
});