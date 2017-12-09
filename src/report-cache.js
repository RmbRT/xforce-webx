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
	throw new Error("ReportCache.findReport() Not implemented.");
};


/** Adds a report to the cache.
@param report:
	The JSON object returned by the X-Force API url report. */
ReportCache.prototype.addReport = function(report) {
	throw new Error("ReportCache.addReport() not implemented.");
};
