var regexv4 = /\b(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b/i;
var regexv6 = /\b(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\b/i;
var regexHost = /\b((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))\b/i;
var ForbiddenTags = {
	"SCRIPT": "",
	"A": ""
};

function treeTraverse(){
	var rootNode = document.body;
	traverseHelper(rootNode);
}

function replaceTextNode(textNode, regex) {
	var match;
	while((match = regex.exec(textNode.textContent)) !== null)
	{
		// save the match into an a-tag.
		var aTag = document.createElement("A");
		aTag.href="https://"+match[0];
		aTag.innerText = match[0];
		// put the rest of the text into a new text node.
		var newTextNode = document.createTextNode(textNode.textContent.substring(match.index+match[0].length));
		// insert the left part of the text into the old text node.
		textNode.textContent = textNode.textContent.substr(0, match.index);
		// insert newTextNode after textNode into the parent node.
		if(textNode.nextSibling !== null) {
			textNode.parentNode.insertBefore(newTextNode, textNode.nextSibling);
		} else {
			textNode.parentNode.appendChild(newTextNode);
		}
		// insert the link between the left and right part.
		textNode.parentNode.insertBefore(aTag, textNode.nextSibling);
		// continue replacing the rest of the text node.
		textNode = newTextNode;
	}
}

function traverseHelper(rootNode){
	console.log(rootNode.nodeName);
	if(rootNode.nodeType === Node.TEXT_NODE)
	{
		replaceTextNode(rootNode, regexv4);
		replaceTextNode(rootNode, regexv6);
		//replaceTextNode(rootNode, regexHost);
		return;
	} else if(rootNode.nodeType === Node.ELEMENT_NODE)
	{
		// skip forbidden tags.
		if(rootNode.tagName in ForbiddenTags)
			return;

		console.log(rootNode);
	
		for(var it = rootNode.firstChild; it !== null; it = it.nextSibling) {
			traverseHelper(it);
		}
	}
}

treeTraverse();