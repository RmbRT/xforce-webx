/** Adds a report to all links to a url.
@param url:
	The url the report belongs to.
@param report:
	The report returned by the X-Force API. */
function addReport(url, report) {
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++)
		if(links[i].hasAttribute("href") && links[i].hostname == url)
		{
			// create the report html element.
			var e = document.createElement("span");
			// add the report style.
			e.classList.add("xforce-api-report");
			// add the report information.
			e.innerText = JSON.stringify(report);

			// insert the report into the page.
			links[i].insertBefore(e, links[i].firstChild);
		}
}