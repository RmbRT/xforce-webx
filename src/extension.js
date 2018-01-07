/** API call handler.
	Default alert handlers are set for debugging. */
function Handler(
	name,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.name = name;
	if(onResponse)
		this.onResponse = onResponse;
	if(onErrorResponse)
		this.onErrorResponse = onErrorResponse;
	if(onConnectionError)
		this.onConnectionError = onConnectionError;
}

Handler.prototype.onResponse = function(response, request) {
	addReport(response, request);
};

Handler.prototype.onErrorResponse = function(error, request) {
	alert(this.name + " error response for request " + request + ": " + error);
}

Handler.prototype.onConnectionError = function(error, request) {
	alert(this.name + " connection error for request " + request + ": " + error);
}

// listen for results of API calls.
// The message is passed from background.js
browser.runtime.onMessage.addListener((message) => {
	if(!handlers[message.call])
		alert("invalid message.call '" + message.call + "'");

	handlers[message.call]["on" + message.type](message.content, message.request);
});

/** The handlers for API calls. */
var handlers = {
	"url": new Handler("URL report")
};
