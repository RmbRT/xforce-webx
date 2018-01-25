/** Creates an interface to the XForce API.
@param user:
	The user name.
@param password:
	The password. */
function XForce(user, password) {
	this._login = window.btoa(user + ":" + password);
}

// only executes if part of the plugin (and not directly included into a HTML document).
if(window.browser) {
	// load the username and password from the plugin settings.
	browser.storage.local.get(["username", "password"]).then((o) => {
		// create the global API object.
		window.XForceAPI = new XForce(o.username, o.password);
	});
}


/** Creates a request to the XForce API.
	Either onResponse or onErrorResponse or onConnectionError will be called.
@param type:
	The type of the request.
@param arg:
	The additional argument string for the request. This must not be URI encoded.
@param onResponse:
	A callback that is called with the response.
@param onErrorResponse:
	A callback that is called when the X-Force API returns an error response.
	Signature: function(message), where message is a string.
@param onConnectionError:
	A callback is called when the connection failed. */
XForce.prototype.request = function(
	type,
	arg,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	var https = new XMLHttpRequest();
	https.open("GET", "https://api.xforce.ibmcloud.com/" + type + "/" + encodeURIComponent(arg), true);

	https.onreadystatechange = function() {
		// 4 == finished loading.
		if(https.readyState == 4)
		{
			var response;
			if(typeof(https.response) === "string")
				response = JSON.parse(https.response);
			else
				response = https.response;

			if(response["error"])
				onErrorResponse(response.error);
			else
				onResponse(response);
		}
	};

	https.onerror = https.onabort = https.ontimeout = onConnectionError;
	https.setRequestHeader("Authorization", "Basic " + this._login);
	https.send();
};

/** Requests an URL report from the XForce API.
@param url:
	The URL to get a report on.
@param onResponse: See `XForce.prototype.request`.
@param onErrorResponse: See `XForce.prototype.request`.
@param onConnectionError: See `XForce.prototype.request`. */
XForce.prototype.urlReport = function(
	url,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"url",
		url,
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.collectionById = function(
	id,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"casefiles",
		id,
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.publicCollections = function(
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"casefiles/public",
		"",
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.sharedCollections = function(
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"casefiles/shared",
		"",
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.privateCollections = function(
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"casefiles/private",
		"",
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.collectionsByGroupId = function(
	id,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"casefiles/group",
		id,
		onResponse,
		onErrorResponse,
		onConnectionError);
};

