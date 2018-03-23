Requirement.need("filehashreport-cache.js", [
	"xforce-api.js"]);

/** Creates a file hash report cache. */
function FileHashReportCache() {
	this._reports = [];
}

/** The global file hash report cache. */
var fileHashReportCache = new FileHashReportCache();

/** Finds a report.
@param hash:
	The hash to look for.
@return
	The report for `hash`, or null, if no report was found. */
FileHashReportCache.prototype.findReport = function(hash) {
	// try to find a report for `hash`.
	for(var i = 0; i < this._reports.length; i++)
		if(hash === this._reports[i].malware.origins.hash)
			return this._reports[i];

	// no report found for `hash`.
	return null;
};

/** Adds a report to the cache.
@param report:
	The report to add to the cache.
@throws Error
	If the report already existed in the cache. */
FileHashReportCache.prototype.addReport = function(report) {
	let id = report.malware.origins.hash;

	for(var i = 0; i < this._reports.length; i++)
		if(this._reports[i].malware.origins.hash === id)
			throw new Error("Report for hash " + id + " existed already.");

	this._reports.push(report);
};

/** Tries to look up a report in the cache, and if it doesn't exist, requests it from the API.
	Adds reports requested from the API to the cache.
@param hash:
	The hash to look for.
@param onSuccess:
	The callback that will be called if the report is retrieved.
@param onErrorMessage:
	The callback that will be called if the API returns an error.
@param onConnectionError:
	The callback that will be called if there is a connection error. */
FileHashReportCache.queryReport = function(
	hash,
	onSuccess,
	onErrorMessage,
	onConnectionError) {
	var cached = this.findReport(hash);

	if(cached) {
		onSuccess(cached);
	} else {
		XForceAPI.fileHash(
			hash,
			(report) => {
				this.addReport(report);
				onSuccess(report);
			},
			onErrorMessage,
			onConnectionError);
	}
};