# options.js

This is the javascript file that adds functionality to the options page.

# Contents

* **`displayError(message)`**: Displays an error message.
	* String `message`: The error message to display.

* **`displaySuccess(message)`**: Displays a success message.
	* String `message`: The success message to display.

* **`clearMessage()`**: Clears both the error and success messages.

* **`triggerChange(id)`**: Triggers the 'change' event on the element with the requested id.
	* String `id`: The id of the element to trigger the 'change' event on.

* **`loadSettings()`**: Loads the config from the persistent storage and fills it into the form.