if(Requirement.scope === "background")
	Requirement.need("filehash-handler.js", [
		"context-menu.js",
		"messaging.js"]);
else
	Requirement.need("filehash-handler.js", [
		"messaging.js",
		"response.js"]);

var fileHashReport = {

	registerInBackgroundScript: function(){
		ContextMenu.addEntry(
			"Context.FileHashReport",
			"Get Filehash Report",
			["all"],
			fileHashReport.contextListener);

	},

	contextListener: function(info, tab){
		Messaging.sendToContent(tab.id,"request filehash");

	},

	registerInContentScript: function(){
		Messaging.listen(
			"request filehash",

			fileHashReport.createInputMask);
	},

	createInputMask: function(){
		var form = document.createElement('form');
		var input = document.createElement('div');
		input.innerHTML = "insert filehash" + " <br><input type='text' name='filehash'/>";
		form.appendChild(input);
		document.body.appendChild(form);
		
	}


};

