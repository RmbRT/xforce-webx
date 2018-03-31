# report-cache.js

Contains the URL report cache class.

Depends on `xforce-api.js`.

Scope: `background`.

# Contents

* **`ReportCache`**: A report cache class.

	Members functions:

	* **`findReport(url)`**: Finds and returns the report for `url`, if cached.
		Filters the domain name out of `url` and looks for reports on that domain.
		* String `url`: The url to find a report on.

		Returns the report that belongs to `url`, if found, or null.

	* **`addReport(report)`**: Adds a report to the cache.
		The report must not yet exist in the cache.
		* `report`: The JSON object returned by the X-Force API url report.

		Throws `Error` if a report for `url` already existed.

	* **`queryReport(url, onSuccess, onErrorMessage, onConnectionError)`**: Looks for the requested report in the cache, and requests it from the X-Force API if it doesn't exist.
		This function must be called after the XForceAPI object exists.

		* String `url`: The url to find a report on.
		* Function `onSuccess(report)`: The callback that will be called if the report is retrieved.
		* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
		* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

* **`reportCache`**: The global report cache.