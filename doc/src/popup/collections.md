# collections.js

Contains functionality for the popup site.

# Contents

* **`Collections.collectionRadioListener(event)`**: The listener that is called when an active collection is selected.
	* `event`: the input event.
* **`Collections.convertToHTML(json, active)`**: Converts a collection object into HTML.
	* `collection`: The collection object.
	* String `active`: The id of the currently active collection.

* **`Collections.outputCollections(targetId, collections, active)`**: Outputs collections into a HTML element.
	* String `targetId`: The HTML element's id.
	* Array `collections`: The collections.
	* String `active`: The active collection's id.
* **`Collections.getPrivate(active)`**: Retrieves and displays all private collections.
	* String `active`: The active collection's id.
* **`Collections.getShared(active)`**: Retrieves and displays all shared collections.
	* String `active`: The active collection's id.