if(Requirement.scope === "background")
	Requirement.need("filehash-handler.js", [
		"context-menu.js",
		"messaging.js",
		"filehashreport-cache.js"]);
else
	Requirement.need("filehash-handler.js", [
		"messaging.js",
		"response.js"]);

var FileHashReport = {

	/** Registers the file hash report module*/
	registerInBackgroundScript: function(){
		ContextMenu.addEntry(
			"Context.FileHashReport",
			"Get Filehash Report",
			["all"],
			FileHashReport.contextListener);

		Messaging.listen("Context.FileHashReport.Query", (hash) => {
			return new Promise((resolve, reject) => {
				fileHashReportCache.queryReport(
					hash,
					(success) => { resolve(success); },
					(errorResponse) => { reject({
						type: "ErrorResponse",
						response: errorResponse
					}); },
					(connectionError) => { reject({
						type: "ConnectionError",
						response: connectionError
					}); });
			});
		});
	},

	contextListener: function(info, tab){
		Messaging.sendToContent(tab.id, "Context.FileHashReport.Click");
	},

	registerInContentScript: function(){
		Messaging.listen(
			"Context.FileHashReport.Click",
			FileHashReport.createInputMask);
	},

	createInputMask: function(){
		/** Returns the selected text. */
		function getSelectionText() {
			var text = "";
			var activeEl = document.activeElement;
			var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
			if((activeElTagName === "textarea")
			|| (activeElTagName === "input"
				&& /^(?:text|search|password|tel|url)$/i.test(activeEl.type))
				&& (typeof activeEl.selectionStart === "number")) {
				text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
			} else if(window.getSelection) {
				text = window.getSelection().toString();
			}
			return text;
		}

		var container = document.createElement('div');
		container.classList.add("xforce-hash-input");
		var header = document.createElement("p");
		header.classList.add("header");
		header.innerText = "Filehash form";
		var input = document.createElement('input');
		input.type = "text";
		var button = document.createElement("button");
		button.innerText = "request";

		container.appendChild(header);
		container.appendChild(input);
		container.appendChild(button);
		document.body.appendChild(container);
		// if text was selected, put it into the input.
		input.value = getSelectionText();
		// focus on the input.
		input.focus();

		container.addEventListener("mouseleave", () => {
			document.body.removeChild(container);
		});

		button.addEventListener("click", () => {
			Messaging.sendToBackground(
				"Context.FileHashReport.Query",
				input.value).then((report) => {
				FileHashReport.displayReport(report);
			}).catch((error) => {
				alert(`${error.type}: ${error.response}`);
			});
		});
	},

	displayReport: function(report) {
		Config.get(config => {
			var e = document.createElement("span");
			e.classList.add("xforce-api-report");

			function getRow(name, value) {
				if(!value || value === "")
					return "";
				else
					return `
						<tr class="TR_49">
							<th class="TH_50">${name}</th>
							<td class="TD_51">${value}</td>
						</tr>`;
			}

			function getListItem(value) {
				if(!value)
					return "";
				else
					return `<li class="LI_53">${value}</li>`;
			}

			function getStringList(values) {
				if(!values
				|| !values.length)
					return "";

				var string = `<ul class="UL_52">`;
				for(var i = 0; i < values.length; i++)
					string += getListItem(values[i]);
				return string += `</ul>`;
			}

			function getOrigins(report) {
				if(!report.malware.origins)
					return "none";


				function getMalwareServers(malservers) {
					if(!malservers
					|| !malservers.rows
					|| malservers.rows.length === 0)
						return "";

					malservers = malservers.rows;

					var servers = "";

					for(var i = 0; i < malservers.length; i++) {
						servers +=
`<div>
	<table class="TABLE_40">
		<caption class="CAPTION_41">
		</caption>
		<tbody class="TBODY_44">
			${getRow("Count", malservers[i].count)}
			${getRow("Domain", malservers[i].domain)}
			${getRow("Filepath", malservers[i].filepath)}
			${getRow("First seen", malservers[i].firstseen)}
			${getRow("Host", malservers[i].host)}
			${getRow("IP", malservers[i].ip)}
			${getRow("Last seen", malservers[i].lastseen)}
			${getRow("md5", malservers[i].md5)}
			${getRow("Origin", malservers[i].origin)}
			${getRow("Schema", malservers[i].schema)}
			${getRow("Type", malservers[i].type)}
			${getRow("URI", malservers[i].uri)}
		</tbody>
	</table>
</div>`;
					}

					return servers;
				}

				function getExternal(external) {
					return
`<table class="TABLE_40">
	<caption class="CAPTION_41">
	</caption>
	<tbody class="TBODY_44">
		${getRow("Detection coverage", ""+external.detectionCoverage)}
		${getRow("Family", getStringList(external.family))}
	</tbody>
</table>`;
				}

				var origins = report.malware.origins;

				var table =
`<table class="TABLE_40">
	<caption class="CAPTION_41">
	</caption>
	<tbody class="TBODY_44">
		${getRow("CnC-Servers", getMalwareServers(origins.CnCServers))}
		${getRow("Download servers", getMalwareServers(origins.downloadServers))}
		${getRow("Emails", getMalwareServers(origins.emails))}
		${getRow("External", getExternal(origins.external))}
	</tbody>
</table>`;
				return table;
			}

			e.innerHTML =
`<div class="root">
	<div class="risk-box ${report.malware.risk}-risk">
		<div class="DIV_3">Risk</div>
		<div class="DIV_4">${report.malware.risk}</div>
	</div>
	<div class="DIV_5">
		<div class="DIV_6">
			<h2 class="H2_7">
				<span class="SPAN_8">X-Force Malware Report</span>
				<div class="DIV_9">
					<span class="SPAN_10">${report.malware.md5}</span>
				</div>
			</h2>
		</div>
		<div class="DIV_38">
			<h3 class="H3_39">Details</h3>
			<table class="TABLE_40">
				<caption class="CAPTION_41">
				</caption>
				<tbody class="TBODY_44">
				${getRow("Created", report.malware.created)}
				${getRow("Type", report.malware.type)}
				${getRow("Family", getStringList(report.malware.family))}
				${getRow("md5", report.malware.md5)}
				${getRow("Mimetype", report.malware.mimetype)}
				${getRow("Origins", getOrigins(report))}
				</tbody>
			</table>
		</div>
	</div>
</div>`;

			document.body.appendChild(e);
			e.addEventListener("mouseleave", () => document.body.removeChild(e));
		});
	}
};