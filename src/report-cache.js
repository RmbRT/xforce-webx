Requirement.need("report-cache.js", [
	"xforce-api.js"]);

/** A report cache class. */
function ReportCache() {
	this._reports = [];
}


/** The global report cache. */
var reportCache = new ReportCache();

/** Finds and returns the report for `url`, if cached.
	Filters the domain name out of `url` and looks for reports on that domain.
@param url:
	The url to find a report on.
@return
	The report that belongs to `url`, if found, or null. */
ReportCache.prototype.findReport = function(url) {
	// try to find a report for the domain.
	for(var i = 0; i < this._reports.length; i++)
		if(url === this._reports[i].url
		|| url === this._reports[i].request)
			return this._reports[i];

	// no report found for `url`.
	return null;
};


/** Adds a report to the cache.
	The report must not yet exist in the cache.
@param report:
	The JSON object returned by the X-Force API url report. */
ReportCache.prototype.addReport = function(report) {
	for(var i = 0; i < this._reports.length; i++)
		if(report.request === this._reports[i].request)
			throw new Error("Report for url '" + report.request + "' existed already.");

	this._reports.push(report);
};

/** Looks for the requested report in the cache, and requests it from the X-Force API if it doesn't exist.
	This function must be called after the XForceAPI object exists. */
ReportCache.prototype.queryReport = function(
	url,
	onSuccess,
	onErrorMessage,
	onConnectionError) {
	// try to find the requested report in the cache.
	var cached = this.findReport(url);
	// if it was cached, return it.
	if(cached) {
		onSuccess(cached);
	} else {
		XForceAPI.urlReport(
			url,
			(report) => {
				// remember the requested url (in case of shortening by X-Force).
				report.result.request = url;
				// add the report to the cache.
					this.addReport(report.result);
				// return the report.
				onSuccess(report.result);
			},
			onErrorMessage,
			onConnectionError);
	}
};