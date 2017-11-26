/** Creates an interface to the XForce API.
@param user:
	The user name.
@param password:
	The password. */
function XForce(user, password) {
	this._login = window.btoa(user + ":" + password);
}

/** Creates a request to the XForce API.
	Either onResponse or onError will be called.
@param type:
	The type of the request.
@param arg:
	The additional argument string for the request.
@param onResponse:
	A callback that is called with the response.
@param onError:
	A callbakc is called when the connection failed. */
XForce.prototype.request = function(type, arg, onResponse, onError) {
	var https = new XMLHttpRequest();
	https.open("GET", "https://api.xforce.ibmcloud.com/" + type + "/" + arg, true);

	https.onreadystatechange = function() {
		// 4 == finished loading.
		if(https.readyState == 4)
			onResponse(https.response);
	};

	https.onerror = https.onabort = https.ontimeout = onError;
	https.setRequestHeader("Authorization", "Basic " + this._login);
	https.send();
};

/** Requests an URL report from the XForce API.
@param url:
	The URL to get a report on.
@param onResponse: See `XForce.prototype.request`.
@param onError: See `XForce.prototype.request`. */
XForce.prototype.urlReport = function(url, onResponse, onError) {
	this.request("url", encodeURIComponent(url), onResponse, onError);
};