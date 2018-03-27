Requirement.need("response.js", ["config.js"]);
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

	Config.get(config => {

		for(var i = 0; i < links.length; i++)
			if(links[i].hasAttribute("href") &&links[i].href === request)
			//&& links[i].hostname == hostname)
			{
				// create the report html element.
				var e = document.createElement("span");

				var catString = "";
				for(var cat in report.cats)
					catString += `<li class="LI_53">${cat}</li>`;

				e.innerHTML =
`<div class="root">
	<div class="risk-box ${config.threatLevel(report.score)}-risk">
		<div class="DIV_3">Risk</div>
		<div class="DIV_4">${report.score}</div>
	</div>
	<div class="DIV_5">
		<div class="DIV_6">
			<h2 class="H2_7">
				<div class="DIV_13">
					<button type="button" class="BUTTON_14">Add to Collection</button>
				</div>
				<span class="SPAN_8">X-Force URL Report</span>
				<div class="DIV_9">
					<span class="SPAN_10">${request}</span>
				</div>
			</h2>
		</div>
		<div class="DIV_38">
			<h3 class="H3_39">Details</h3>
			<table class="TABLE_40">
				<caption class="CAPTION_41">
				</caption>
				<tbody class="TBODY_44">
					<tr class="TR_49">
						<th class="TH_50">Categorization</th>
						<td class="TD_51">
							<ul class="UL_52">${catString}</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>`;
				e.querySelector("button").addEventListener("click", (url => { return function() {
					Messaging.sendToBackground("Collection.addReport", url).then((r)=>{
						alert("Success: " + JSON.stringify(r));
					}).catch((e)=>{
						alert("Error: " + JSON.stringify(e));
					});
				}; })(request));

				e.classList.add("xforce-api-report");

				e.addEventListener("mouseleave", function() {
					document.body.removeChild(this);
					globalReport = null;
				});

				// display URL report.
				if(globalReport)
					document.body.removeChild(globalReport);

				document.body.appendChild(e);
				globalReport = e;

				// add listener for displaying the report.
				links[i].addEventListener("mouseenter", ((curry) => { return function() {
					if(!config.rememberReports())
						return;
					var rect = this.getBoundingClientRect();

					if(globalReport)
						document.body.removeChild(globalReport);

					document.body.appendChild(curry);
					globalReport = curry;
				};})(e));
			}
	});
};})(null);