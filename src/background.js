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

var activeCollection = null;
Messaging.listen("Collection.select", (id) => {
	activeCollection = id;
	console.error("Collection.select", activeCollection);
});
Messaging.listen("Collection.active", () => {
	console.error("Collection.active", activeCollection);
	return activeCollection;
});
Messaging.listen("Collection.addReport", (url) => {
	if(activeCollection !== null)
		return new Promise((resolve, reject) => {
			XForceAPI.addURLReportToCollection(
				activeCollection,
				url,
				resolve,
				reject,
				reject);
		});
	else
		return new Promise((resolve, reject) => { reject("No collection selected."); });
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
	return privateCollections.all();
});

Messaging.listen("sharedCollections.add", (c) => {
	for(var i = 0; i < c.length; i++)
		if(!sharedCollections.findCollection(c[i]))
			sharedCollections.addCollection(c[i]);
});

Messaging.listen("sharedCollections.all", () => {
	return sharedCollections.all();
});

browser.tabs.onUpdated.addListener((id, info, tab)  => {
	if(config.autoCheck()) {
		getReport(tab.url, (report) => {
			var level = config.threatLevel(report.score);
			browser.browserAction.setBadgeText({
				text: report.score.toString(),
				tabId: id
			});
			browser.browserAction.setBadgeBackgroundColor({
				color: "#333",
				tabId: id
			});
			browser.browserAction.setIcon({
				path: {
					16: "images/" + level + "-16.png",
					32: "images/" + level + "-32.png"
				},
				tabId: id
			});
		}, (error) => {
			console.error("onUpdated errorResponse", error);
		}, (error) => {
			console.error("onUpdated connectionError", error);
		});
	} else {
		// empty the badge text.
		browser.browserAction.setBadgeText({
			text: "",
			tabId: id
		});
		// set the default icon.
		browser.browserAction.setIcon({
			path: {
				16: "images/icon-16.png",
				32: "images/icon-32.png"
			},
			tabId: id
		});
	}
});