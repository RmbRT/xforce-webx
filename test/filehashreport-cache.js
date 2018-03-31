function insert(hash, shouldSucceed, log)
{
	log("\nInserting entry for '" + hash + "'");

	if(fileHashReportCache.findReport(hash))
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
		fileHashReportCache.addReport({malware: {md5: hash}});
		if(shouldSucceed)
			log("Expected outcome.");
		else {
			throw "Unexpected outcome!";
		}
	}
}

TestSuite.test("filehashreport-cache.js", log => {
		insert("0x1234", true, log);
		insert("0x5678", true, log);
		insert("0x9abc", true, log);
		insert("0x1234", false, log);
		insert("0x5678", false, log);
		insert("0x9abc", false, log);
});