var Collections = {
	convertToHTML : function (json) {
		return  '<div class="collectionItem">Name:templateName ID:templateID Autor:TemplateAutor </div>'.replace('templateName', json.title).replace('templateID', json.caseFileID).replace('TemplateAutor', json.owner.name);

	},
	getById : function() {
		XForceAPI.collectionById(
			document.getElementById("search").value,
			function(result) {
				alert(JSON.stringify(result));
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	},
	getByGroupId: function() {
		XForceAPI.collectionsByGroupId(
			document.getElementById("search").value,
			function(result) {
				alert(JSON.stringify(result));
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	},
	"getPublic": function() {
		XForceAPI.publicCollections(
			function(result) {
				alert(JSON.stringify(result));
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	},
	outputCollections: function(targetId, collections) {
		var result = "";
		for(var i = 0; i < collections.length; i++){
			result += Collections.convertToHTML(collections[i]);
		}
		document.getElementById(targetId).innerHTML = result;
	},
	getPrivate: function() {
		Messaging.sendToBackground("privateCollections.all").then((c) => {
			if(c !== null)
				Collections.outputCollections("private", c);
			else
				XForceAPI.privateCollections(
					function(result) {
						Messaging.sendToBackground("privateCollections.add", result.casefiles);
						Collections.outputCollections("private", result.casefiles);
					},
					function(error) {
						alert("[getPrivate] Error Response: " + JSON.stringify(error));
					}, function(error) {
						alert("[getPrivate] Connection Error: " + JSON.stringify(error));
					});
		}).catch((error) => {
			console.error("[getPrivate] Messaging error", JSON.stringify(error), error);
		});
	},
	getShared: function() {
		Messaging.sendToBackground("sharedCollections.all").then((c) => {
			if(c !== null)
				Collections.outputCollections("private", c);
			else
				XForceAPI.sharedCollections(
					function(result) {
						Messaging.sendToBackground("sharedCollections.add", result.casefiles);
						Collections.outputCollections("shared", result.casefiles);
					},
					function(error) {
						alert("[getShared] Error Response: " + JSON.stringify(error));
					}, function(error) {
						alert("[getShared] Connection Error: " + JSON.stringify(error));
					});
		}).catch((error) => {
			console.error("[getShared] Messaging error", JSON.stringify(error), error);
		});
	},
	addURLReport: function(id, url) {
		XForceAPI.addURLReportToCollection(
			document.getElementById("add-id").value,
			document.getElementById("add-report").value,
			function(result) {
				alert(JSON.stringify(result));
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	},
	addIPReport: function() {
		XForceAPI.addIPReportToCollection(
			document.getElementById("add-id").value,
			document.getElementById("add-report").value,
			function(result) {
				alert(JSON.stringify(result));
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});

	},
	gatherCollections: function() {

	}
};

document.addEventListener("DOMContentLoaded", function() {

	var intervalId = setInterval(() => {
		// wait until the XForceAPI object is properly set up.
		if(XForceAPI) {
			Collections.getPrivate();
			Collections.getShared();

			clearInterval(intervalId);
		}
	}, 10);

	
});	