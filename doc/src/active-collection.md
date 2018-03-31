# active-collection.js

This file implements the active collection feature.

Depends on: `messaging.js`, `xforce-api.js`.

Scope: `background`.

# Contents

* **`ActiveCollection.registerInBackgroundScript()`**: Registers the listeners for the message commands. This function has to be called in the background script.
	
	Implements the following message commands:
	* `Collection.select(id)`: Takes a collection id as message and sets the active collection to the passed id.
	* `Collection.active()`: Returns the active collection id.
	* `Collection.addReport(url)`: Takes a URL, and adds the URL report to the active collection. Fails if there is no active collection.