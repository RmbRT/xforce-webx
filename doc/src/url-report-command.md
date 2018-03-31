# url-report-command.js

Contains the URL report command functionality.

Scope: `background` / `content`.

Depends on `context-menu.js`, `report-cache.js`, `messaging.js` in `background`.
Depends on `messaging.js`, `response.js` in `content`.

# Contents

* **`URLReportCommand.dummyResponse`**: The dummy URL report to display when the config value `dummyResponses` is set.

* **`registerInBackgroundScript()`**: Registers the url report context menu button in the background script.
* **`contextListener(info, tab)`**: Callback that is called when the contet menu button is clicked.
* **`registerInContentScript()`**: Registers the response listeners in the content script.
	This function must be called from the content script.

	Messages:

	* `URLReport.success(report)`: Listens for URL reports.
	* `URLReport.errorResponse(response)`: Listens for error responses.
	* `URLReport.connectionError(response)`: Listens for connection errors.