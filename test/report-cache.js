function insert(url, shouldSucceed, log)
{
	log("\nInserting entry for '" + url + "'");

	if(reportCache.findReport(url))
	{
		log("An entry already exists. Ignoring.");
		if(!shouldSucceed)
			log("Expected outcome.");
		else {
			throw "Unexpected outcome!";
		}
	}
	else
	{
		log("No entry exists yet. Inserting.");
		reportCache.addReport({request: url});
		if(shouldSucceed)
			log("Expected outcome.\n");
		else {
			throw "Unexpected outcome!";
		}
	}
}

TestSuite.test("report-cache.js", log => {
		insert("1", true, log);
		insert("2", true, log);
		insert("3", true, log);
		insert("1", false, log);
		insert("2", false, log);
		insert("3", false, log);
});