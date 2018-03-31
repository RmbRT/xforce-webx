# collection-cache.js

This file contains the collection cache type.

Depends on `messaging.js`.

Scope: `background.js`

# Contents:

* **`CollectionCache`**: The collection cache type.

	Message commands:

	* `privateCollections.add(collection)`: adds `collection` to the private collections cache.
	* `privateCollections.all()`: Returns all private collections (null if they were not set yet).
	* `sharedCollections.add(collection)`: adds `collection` to the shared collections cache.
	* `sharedCollections.all()`: Returns all shared collections (null if they were not set yet).

	Functions:

	* **`registerInBackgroundScript()`**: Registers the listeners for the message commands.

	Member functions:

	* **`findCollection(id)`**: Finds a collection with the requested id and returns it, or null, if it was not cached.
	* **`all()`**: Returns all collections. If the collection cache is still unset, returns null, otherwise an array containing all collections.
	* **`addCollection(collection)`**: Adds `collection` to the cache. Throws an error if a collection with the same id already existed.

* **`sharedCollections`**: The shared collections cache.
* **`privateCollections`**: The private collections cache.