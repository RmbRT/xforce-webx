# filehash-handler.js

This file contains the functionality for requesting file hash reports.

Depends on `context-menu.js`, `messaging.js`, `filehashreport-cache.js` in background.
Depends on `messaging.js`, `response.js` in content.

Scope: `background` / `content`.

# Content

* **`FileHashReport`**: Function group that takes care of all file hash report tasks.
	
	Fields:

	* `dummyResponse`: Dummy file hash report used when the config option `dummyResponses` is activated.

	Functions:

	* **`registerInBackgroundScript()`**: Sets up the listeners and the context menu button.
	* **`contextListener(info, tab)`**: The listener for the context menu button.
	* **`registerInContentScript()`**: Sets up the listener needed to receive the message that the context menu button was clicked.
	* **`createInputMask()`: Creates an input mask to enter a file hash. Selected text is automatically inserted into the text field.
	* **`displayReport(report)`: Displays a received file hash report.
		* `report`: The file hash report.