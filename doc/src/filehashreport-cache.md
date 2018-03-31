# filehashreport-cache.js

Contains the file hash report cache type.

Depends on `xforce-api.js`.
Scope: `background`.

# Contents

* **`FileHashReportCache`**: The file hash report cache type.

	Member functions:
		* **`findReport(hash)`**: Finds the report for the given hash.
			* String `hash`: The hash.

			Returns the report for `hash` or null if no report was found.

		* **`addReport(report)`**: Adds a report to the cache.
			* `report`: The report to add to the cache.

			Throws `Error` if the report already existed in the cache.

		* **`queryReport(hash, onSuccess, onErrorMessage, onConnectionError)`**:
			Tries to look up a report in the cache, and if it doesn't exist, requests it from the API. Adds reports requested from the API to the cache.
			* String `hash`: The hash to look for.
			* Function `onSuccess(report)`: The callback that will be called if the report is retrieved.
			* Function `onErrorMessage(message)`: The callback that will be called if the API returns an error.
			* Function `onConnectionError(message)`: The callback that will be called if there is a connection error.

* **`fileHashReportCache`**: The global file hash report cache.