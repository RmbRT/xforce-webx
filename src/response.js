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
const addReport = ((globalReport) => { return function(report, request) {
	var links = document.getElementsByTagName("a");
	const hostname = urlDomain(request);

	for(var i = 0; i < links.length; i++)
		if(links[i].hasAttribute("href") && links[i].hostname == hostname)
		{
			// create the report html element.
			var e = document.createElement("span");
			

			// add the report style.
			

			/*var score = document.createElement("div");
			
			var hScore = document.createElement("div");
			hScore.innerText = "Score";
			hScore.classList.add("center");
			score.appendChild(hScore);

			var risk = document.createElement("div");
			risk.innerText = report.score;
			risk.classList.add("center");
			score.appendChild(risk);
			switch(true){
				case report.score < 4: score.classList.add("low-risk");
				break;
				case report.score> 4 && report.risk < 7: score.classList.add("medium-risk");
				break;
				default: score.classList.add("high-risk");
			}
			e.appendChild(score);

			var hCats = document.createElement("div");
			hCats.classList.add("domain");
			hCats.innerText = "Domain: " + hostname;
			e.appendChild(hCats);

			var tCats = document.createElement("p");
			tCats.classList.add("cats");*/
			var catString = "";
			
			for(var cat in report.cats)
			{
				if(catString.length)
					catString += ", ";

				catString += cat;
			}
			
		
			
			var hoststring =  '<div id="DIV_1"><div id="DIV_2" class="low-risk"><div id="DIV_3">Risk</div><div id="DIV_4">1</div></div><div id="DIV_5"><div id="DIV_6"><h2 id="H2_7"> <span id="SPAN_8">X-Force URL Report</span><div id="DIV_9"><span id="SPAN_10">hostname</span><!----></div></h2><div id="DIV_13"><!----><button type="button" id="BUTTON_14" disabled="enabled"></button></div><!----></div><div id="DIV_38"><h3 id="H3_39">Details</h3><table id="TABLE_40"><caption id="CAPTION_41"></caption><tbody id="TBODY_44"><tr id="TR_49"><th id="TH_50">Categorization</th><td id="TD_51"><!----><ul id="UL_52"><!----><li id="LI_53">cats</li><!----></ul></td></tr></tbody></table></div></div></div>'.replace('hostname', hostname);
			var cat = hoststring.replace('cat', catString);
			e.innerHTML = cat;
			e.classList.add("xforce-api-report");

			e.addEventListener("mouseleave", function() {
				document.body.removeChild(this);
				globalReport = null;
			});

			links[i].addEventListener("mouseenter", ((curry) => { return function() {
				var rect = this.getBoundingClientRect();
				curry.style.top = (rect.bottom + 5) + "px";
				curry.style.left = (rect.left) + "px";

				if(globalReport)
					document.body.removeChild(globalReport);

				document.body.appendChild(curry);
				globalReport = curry;
			};})(e));
		}
};})(null);