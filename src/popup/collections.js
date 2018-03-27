var Collections = {
	/** The radio button listener. */
	collectionRadioListener: function(event) {
		// if the radio button was activated.
		if(event.target.checked)
			Messaging.sendToBackground("Collection.select", event.target.id);
	},
	/** converts a Collection Object into HTML
		@param json
			the Collection Object
		@param active
			Id of the currently selected Collection */

	convertToHTML : function (json, active) {
		var container = document.createElement("div");
		container.classList.add("collection-item");
		var firstLine = document.createElement("div");
		firstLine.classList.add("firstLine");

		var radio = document.createElement("input");
		radio.type = "radio";
		// group all collection radio buttons by name.
		radio.name = "collection-radio";
		// pre-select the active collection.
		if(json.caseFileID === active)
			radio.checked = true;
		// this is needed for the label.
		radio.id = json.caseFileID;
		// listen for changes.
		radio.addEventListener("change", Collections.collectionRadioListener);
		firstLine.appendChild(radio);

		// the label is the extended clickable area of the radio button.
		var label = document.createElement("label");
		// reference the radio button.
		label.setAttribute("for", json.caseFileID);

		// the collection name.
		var name = document.createElement("span");
		name.classList.add("name");
		name.innerText = json.title;
		label.appendChild(name);
		firstLine.appendChild(label);

		var secondLine = document.createElement("div");

		var owner = document.createElement("span");
		owner.classList.add("owner");
		owner.innerText = json.owner.name;
		secondLine.appendChild(owner);
		var time = document.createElement("span");
		time.classList.add("time");
		time.innerText = new Date(json.created).toLocaleString();
		secondLine.appendChild(time);

		// insert the children.
		container.appendChild(firstLine);
		container.appendChild(secondLine);
		return container;
	},

	 
	outputCollections: function(targetId, collections, active) {
		var result = document.getElementById(targetId);
		// clear the result container, for sanity.
		result.innerHTML = "";
		// populate the container.
		if(collections.length) {
			for(var i = 0; i < collections.length; i++)
				result.appendChild(Collections.convertToHTML(collections[i], active));
		} else {
			var node = document.createElement("span");
			node.classList.add("no-collections-msg");
			node.innerText = `You have no ${targetId} collections.`;
			result.appendChild(node);
		}
	},
	/** method that invokes an XForce API Call to retrieve all private Collections.
		@param active
			the active Collection */
	getPrivate: function(active) {
		Messaging.sendToBackground("privateCollections.all").then((c) => {
			if(c !== null)
				Collections.outputCollections("private", c, active);
			else
				XForceAPI.privateCollections(
					function(result) {
						Messaging.sendToBackground("privateCollections.add", result.casefiles);
						Collections.outputCollections("private", result.casefiles, active);
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
	/** method that invokes an XForce API Call to retrieve all shared Collections.
		@param active
			the active Collection */
	getShared: function(active) {
		Messaging.sendToBackground("sharedCollections.all").then((c) => {
			if(c !== null)
				Collections.outputCollections("shared", c, active);
			else
				XForceAPI.sharedCollections(
					function(result) {
						Messaging.sendToBackground("sharedCollections.add", result.casefiles);
						Collections.outputCollections("shared", result.casefiles, active);
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
	
};


document.addEventListener("DOMContentLoaded", function() {
	Messaging.sendToBackground("Collection.active").then((active) => {
		var intervalId = setInterval(() => {
		// wait until the XForceAPI object is properly set up.
		if(XForceAPI) {
			Collections.getPrivate(active);
			Collections.getShared(active);

			clearInterval(intervalId);
		}
	}, 10);
	}).catch(() => {
		alert("Communication error.")
	});	
});	