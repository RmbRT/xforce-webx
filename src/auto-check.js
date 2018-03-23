Requirement.need("auto-check.js", [
	"config.js",
	"report-cache.js"]);

var AutoCheck = {
	registerInBackgroundScript: function() {
		browser.tabs.onUpdated.addListener((id, info, tab)  => {
			if(!info.url
			|| info.status !== "loading")
				return;

			// request the global config object.
			Config.get(config => {
				if(config.autoCheck()) {
					reportCache.queryReport(
						tab.url,
						(report) => {
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
		});
	}
};