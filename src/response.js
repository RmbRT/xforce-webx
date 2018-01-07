const urlDomain = ((a)=> { return function(url) {
	a.href = url;
	return a.hostname;
};})(document.createElement("a"));

/** Adds a report to all links to a url.
@param url:
	The url the report belongs to.
@param report:
	The report returned by the X-Force API.
@param request:
	The requested url. */
function addReport(report, request) {
	var links = document.getElementsByTagName("a");
	const hostname = urlDomain(request);

	for(var i = 0; i < links.length; i++)
		if(links[i].hasAttribute("href") && links[i].hostname == hostname)
		{
			// create the report html element.
			var e = document.createElement("span");
			// add the report style.
			e.classList.add("xforce-api-report");

			var hScore = document.createElement("h2");
			hScore.innerText = "Score: " + report.score;
			e.appendChild(hScore);

			var hCats = document.createElement("h2");
			hCats.innerText = "Categories";
			e.appendChild(hCats);

			var tCats = document.createElement("p");
			var catString = "";
			
			for(var cat in report.cats)
			{
				if(catString.length)
					catString += ", ";

				catString += cat;
			}
			tCats.innerText = catString;
			e.appendChild(tCats);
			
			// insert the report into the page.
			links[i].insertBefore(e, links[i].firstChild);
		}
}