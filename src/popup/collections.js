var Collections = {
	getById : function() {
		XForceAPI.colelctionById(
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
				alert(JSON.stringify(result));
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
				alert(JSON.stringify(result));
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
})