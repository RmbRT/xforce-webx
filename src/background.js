browser.contextMenus.create({
	id: "get URL report",
	title: "Get URL report",
	contexts: ["link"]
});

function getReport(url, success, errorResponse, connectionError) {
	// is the report cached already?
	var report;
	if(report = reportCache.findReport(url))
		success(report.result);
	else
		XForceAPI.urlReport(
			url,
			((success) => { return function(response) {
				reportCache.addReport(response);
				success(response.result);
			}; })(success),
			errorResponse,
			connectionError);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId === "get URL report") {
		getReport(
			info.linkUrl,
			((curry) => { return function(response) {
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "Response",
					content: response,
					request: info.linkUrl
				});
			};})({"tabId": tab.id}),
			((curry) => { return function(errorResponse) {
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "ErrorResponse",
					content: errorResponse,
					request: info.linkUrl
				});
			};})({"tabId": tab.id}),
			((curry) => { return function(connectionError) {
				browser.tabs.sendMessage(
					curry.tabId, {
					call: "url",
					type: "ConnectionError",
					content: connectionError,
					request: info.linkUrl
				});
			};})({"tabId": tab.id}));
	}
});

var config = null;
Config.load((c) => {
	config = c;
}, e => console.error("Could not load config", e));

Config.listenForUpdates((c) => { config = c; } );

Messaging.listen("request-report", (request) => {
	if(config && config.autoCheck()) {
		return new Promise(((request) => { return (resolve, reject) => {
			getReport(
				request,
				resolve,
				error => reject({error: error, type: "Error Response"}),
				error => reject({error: error, type: "Connection Error"}));
		}; })(request));
	} else
		return null;
});

Messaging.listen("privateCollections.add", (c) => {
	for(var i = 0; i < c.length; i++)
		if(!privateCollections.findCollection(c[i]))
			privateCollections.addCollection(c[i]);
});

Messaging.listen("privateCollections.all", () => {
	return privateCollections._collections;
});

Messaging.listen("sharedCollections.add", (c) => {
	for(var i = 0; i < c.length; i++)
		if(!sharedCollections.findCollection(c[i]))
			sharedCollections.addCollection(c[i]);
});

Messaging.listen("sharedCollections.all", () => {
	return sharedCollections.all;
});