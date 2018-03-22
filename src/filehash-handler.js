if(Requirement.scope === "background")
	Requirement.need("filehash-handler.js", [
		"context-menu.js",
		"messaging.js",
		"filehashreport-cache.js"]);
else
	Requirement.need("filehash-handler.js", [
		"messaging.js",
		"response.js"]);

var FileHashReport = {

	registerInBackgroundScript: function(){
		ContextMenu.addEntry(
			"Context.FileHashReport",
			"Get Filehash Report",
			["all"],
			FileHashReport.contextListener);
		Messaging.listen("Context.FileHashReport.Query", (hash) => {
			return new Promise((resolve, reject) => {
				XForceAPI.fileHash(
					hash,
					success => resolve(success),
					errorResponse => reject({
						type: "ErrorResponse",
						response: errorResponse
					}),
					connectionError => reject({
						type: "ConnectionError",
						response: connectionError
					}));
			});
		});
	},

	contextListener: function(info, tab){
		Messaging.sendToContent(tab.id, "Context.FileHashReport.Click");
	},

	registerInContentScript: function(){
		Messaging.listen(
			"Context.FileHashReport.Click",
			FileHashReport.createInputMask);
	},

	createInputMask: function(){
		var container = document.createElement('div');
		container.classList.add("xforce-hash-input");
		var header = document.createElement("p");
		header.classList.add("header");
		header.innerText = "Filehash form";
		var input = document.createElement('input');
		input.type = "text";
		var button = document.createElement("input");
		button.type = "button";
		button.value = "request";

		container.appendChild(header);
		container.appendChild(input);
		container.appendChild(button);
		document.body.appendChild(container);

		// focus on the input.
		input.focus();

		container.addEventListener("mouseleave", () => {
			document.body.removeChild(container);
		});

		button.addEventListener("click", () => {
			Messaging.sendToBackground("Context.FileHashReport.Query", input.value).then((report) => {
				alert("Success: " + JSON.stringify(report));
			}).catch((error) => alert("Error: " + JSON.stringify(error)));
		});
	}
};