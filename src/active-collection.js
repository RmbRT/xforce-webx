Requirement.need("active-collection.js", [
	"messaging.js",
	"xforce-api.js"]);

var ActiveCollection = {
	activeCollection: null,
	registerInBackgroundScript: function() {
		Messaging.listen("Collection.select", (id) => {
			ActiveCollection.activeCollection = id;
		});
		Messaging.listen("Collection.active", () => {
			return ActiveCollection.activeCollection;
		});
		Messaging.listen("Collection.addReport", (url) => {
			if(ActiveCollection.activeCollection !== null)
				return new Promise((resolve, reject) => {
					XForceAPI.addURLReportToCollection(
						ActiveCollection.activeCollection,
						url,
						resolve,
						reject,
						reject);
				});
			else
				return new Promise((resolve, reject) => { reject("No collection selected."); });
		});
	}
};