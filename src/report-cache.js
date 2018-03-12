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
		if(url === this._reports[i].url)
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
		if(url === this._reports[i].url)
			throw new Error("Report for url '" + report.url + "' existed already.");

	this._reports.push(report);
};
