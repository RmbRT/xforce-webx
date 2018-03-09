/** A collection cache class. */
function CollectionCache() {
	this._collections = null;
}

/** The global shared collections cache. */
var sharedCollections = new CollectionCache();
/** The global private collections chache. */
var privateCollections = new CollectionCache();

/** Finds and returns the collection `id`, if cached.
@param id:
	The url to find a report on.
@return
	The collection with id `id`, if found, or null. */
CollectionCache.prototype.findCollection = function(id) {
	if(this._collections === null)
		return null;

	// try to find a collectino for the domain.
	for(var i = 0; i < this._collections.length; i++)
		if(id === this._collections[i].caseFileID)
			return this._collections[i];

	// no collection found with `id`.
	return null;
};

/** Returns all cached collections. */
CollectionCache.prototype.all = function() {
	return this._collections;
};

/** Adds a collection to the cache.
	The collection must not yet exist in the cache.
@param collection:
	The JSON object returned by the X-Force API. */
CollectionCache.prototype.addCollection = function(collection) {
	if(this._collections === null) {
		this._collections = [collection];
	} else {
		for(var i = 0; i < this._collections.length; i++)
			if(collection.caseFileID === this._collections[i].caseFileID)
				throw new Error("Collection with ID '" + caseFileID + "' existed already.");

		this._collections.push(collection);
	}
};