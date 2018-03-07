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
	Config.load((o) => {
		// create the global API object.
		window.XForceAPI = new XForce(o.name(), o.password());
	}, (e) => {
		console.error("Could not load config: " + e);
	});

	Config.listenForUpdates((o) => {
		window.XForceAPI = new XForce(o.name(), o.password());
	});
}


/** Creates a request to the XForce API.
	Either onResponse or onErrorResponse or onConnectionError will be called.
@param type:
	The type of the request.
@param body:
	The body of the request, or null.
@param onResponse:
	A callback that is called with the response.
@param onErrorResponse:
	A callback that is called when the X-Force API returns an error response.
	Signature: function(message), where message is a string.
@param onConnectionError:
	A callback is called when the connection failed. */
XForce.prototype.request = function(
	method,
	url,
	body,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	var https = new XMLHttpRequest();
	https.open(method, "https://api.xforce.ibmcloud.com/" + url, true);
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
	https.send(body);
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
		"GET",
		`url/${encodeURIComponent(url)}`,
		null,
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
		"GET"
		`casefiles/${encodeURIComponent(id)}`,
		null,
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
		"GET",
		"casefiles/public",
		null,
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
		"GET",
		"casefiles/shared",
		null,
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
		"GET",
		"casefiles/private",
		null,
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
		"GET",
		`casefiles/group/${encodeURIComponent(id)}`,
		null,
		onResponse,
		onErrorResponse,
		onConnectionError);
};

/** Adds a report to a collection. */
XForce.prototype.addReportToCollection = function(
	collectionId,
	type,
	value,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.request(
		"POST",
		`casefiles/${encodeURIComponent(collectionId)}/createreports`,
		{
			reportkeys: [
				{
					type: type,
					value: value,
					wanted: true
				}
			]
		},
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.addURLReportToCollection = function(
	collectionId,
	url,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.addReportToCollection(
		collectionId,
		"URL",
		url,
		onResponse,
		onErrorResponse,
		onConnectionError);
};

XForce.prototype.addIPReportToCollection = function(
	collectionId,
	ip,
	onResponse,
	onErrorResponse,
	onConnectionError)
{
	this.addReportToCollection(
		collectionId,
		"IP",
		ip,
		onResponse,
		onErrorResponse,
		onConnectionError);
}