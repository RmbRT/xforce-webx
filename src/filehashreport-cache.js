Requirement.need("filehashreport-cache.js", [
	"xforce-api.js"]);

function FileHashReportCache() {
	this._reports = [];
}

/** The global file hash report cache. */
var fileHashReportCache = new FileHashReportCache();

FileHashReportCache.prototype.findReport = function(hash) {
	// try to find a report for `hash`.
	for(var i = 0; i < this._reports.length; i++)
		if(hash === this._reports[i].malware.origins.hash)
			return this._reports[i];

	// no report found for `hash`.
	return null;
};

FileHashReportCache.prototype.addReport = function(report) {
	let id = report.malware.origins.hash;

	for(var i = 0; i < this._reports.length; i++)
		if(this._reports[i].malware.origins.hash === id)
			throw new Error("Report for hash " + id + " existed already.");

	this._reports.push(report);
};

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