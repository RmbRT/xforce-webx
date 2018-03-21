if(Requirement.scope === "background")
	Requirement.need("filehash-handler.js", [
		"context-menu.js",
		"messaging.js"]);
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
				XForceAPI.fileHash(hash,
					success => resolve(success),
					errorResponse => reject(errorResponse),
					connectionError => reject(connectionError));
			});
		});
	},

	contextListener: function(info, tab){
		Messaging.sendToContent(tab.id,"Context.FileHashReport.Click");
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