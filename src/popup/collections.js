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
	getPrivate: function() {
		XForceAPI.privateCollections(
			function(result) {
				alert(result);
				var privateList = result.casefiles;
				var result = "";
				for(var i = 0; i < privateList.length; i++){
					result += Collections.convertToHTML(privateList[i]);
				}
				document.getElementById("private").innerHTML = result;
			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	},
	getShared: function() {
		XForceAPI.sharedCollections(
			function(result) {
				var sharedList = result.casefiles;
				var result = "";
				for(var i = 0; i < sharedList.length; i++){
					result += Collections.convertToHTML(sharedList[i]);
				}
				document.getElementById("shared").innerHTML = result;

			},
			function(error) {
				alert(JSON.stringify(error));
			}, function(error) {
				alert(JSON.stringify(error));
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
	document.getElementById("btn-id").addEventListener("click", Collections.getById);
	document.getElementById("btn-group-id").addEventListener("click", Collections.getByGroupId);
	document.getElementById("btn-public").addEventListener("click", Collections.getPublic);
	document.getElementById("btn-private").addEventListener("click", Collections.getPrivate);
	document.getElementById("btn-shared").addEventListener("click", Collections.getShared);
	document.getElementById("btn-add-url").addEventListener("click", Collections.addURLReport);
	document.getElementById("btn-add-ip").addEventListener("click", Collections.addIPReport);
});