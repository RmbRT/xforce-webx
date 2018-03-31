# xforce-api.js

The X-Force API interface.

Scope: `background` / `content`.

Depends on `config.js`.

# Contents

* **`XForce(user, password)`**: Creates an interface to the XForce API.
	* String `user`: The user name.
	* String `password`: The password.

	Member functions:

	* **`request(method, url, body, onResponse, onErrorResponse, onConnectionError)`**:  Creates a request to the XForce API.
		Either onResponse or onErrorResponse or onConnectionError will be called.

		* String `type`: The type of the request (`GET`/`POST`).
		* String `body`: The body of the request, or null.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`urlReport(url, onResponse, onErrorMessage, onConnectionError)`**: Requests an URL report from the X-Force API.
		* String `url`: The URL to get a report on.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`collectionById(id, onResponse, onErrorResponse, onConnectionError)`**: Requests a collection by its id.
		* String `id`: The collection id.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`fileHash(filehash, onResponse, onErrorMessage, onConnectionError)`**: Requests a file hash report.
		* String `filehash`: The filehash.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.
	
	* **`publicCollections(onResponse, onErrorMessage, onConnectionError)`**: Requests all public collections.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.
	
	* **`sharedCollections(onResponse, onErrorMessage, onConnectionError)`**: Requests all shared collections.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.
	
	* **`privateCollections(onResponse, onErrorMessage, onConnectionError)`**: Requests all private collections.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`collectionsByGroupId(id, onResponse, onErrorMessage, onConnectionError)`**: Requests all collections with the given group id.
		* String `id`: The collection group id.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`addReportToCollection(collectionId, type, value, onResponse, onErrorMessage, onConnectionError)`**: Adds a report to a collection.
		* String `collectionId`: The collection's id.
		* String `type`: The report type.
		* String `value`: The report.
		* String `id`: The collection group id.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`addURLReportToCollection(collectionId, url, onResponse, onErrorMessage, onConnectionError)`**: Adds a URL report to a collection.
		* String `collectionId`: The collection's id.
		* String `url`: The url the report belongs to.
		* String `id`: The collection group id.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

	* **`addIPReportToCollection(collectionId, url, onResponse, onErrorMessage, onConnectionError)`**: Adds an IP report to a collection.
		* String `collectionId`: The collection's id.
		* String `ip`: The IP the report belongs to.
		* String `id`: The collection group id.
		* Function `onSuccess(response)`: The callback that will be called with the API response.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

* **`XForceAPI`**: The X-Force API object.