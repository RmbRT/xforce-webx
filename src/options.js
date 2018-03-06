function displayError(message) {
	document.getElementById("error").innerText += "Error: " + message + "\n";
	document.getElementById("success").innerText = "";
}

function displaySuccess(message) {
	document.getElementById("success").innerText += "Success: " + message + "\n";
	document.getElementById("error").innerText = "";
}

function clearMessage() {
	document.getElementById("error").innerText = "";
	document.getElementById("success").innerText = "";
}

function triggerChange(id) {
	id = document.getElementById(id);
	if("createEvent" in document) {
		const change = document.createEvent("HTMLEvents");
		change.initEvent("change", false, true);
		id.dispatchEvent(change);
	} else
	{
		id.fireEvent("onchange");
	}
}

/** Loads the settings and writes them into the form. */
function loadSettings() {
	Config.load((c) => {
		try {
			document.getElementById("name").value = c.name().toString();
			triggerChange("name");
			document.getElementById("password").value = c.password().toString();
			triggerChange("password");
			document.getElementById("auto-check").checked = !!c.autoCheck();
			document.getElementById("threat-medium").value = c.threatMedium().toString();
			triggerChange("threat-medium");
			document.getElementById("threat-high").value = c.threatHigh().toString();
			triggerChange("threat-high");
		} catch(e) {
			displayError("Internal: " + e);
		}
	}, (e) => {
		displayError("Exception when loading settings: " + e);
	});
}

// Execute this code when the HTML of the options page is fully loaded.
document.addEventListener("DOMContentLoaded", ((allValid) => { return function() {
	// set up reset button.
	document.getElementById("reset").addEventListener("click", loadSettings);
	// set up medium threat default button.
	document.getElementById("default-medium").addEventListener("click", () => {
		document.getElementById("threat-medium").value = Config.default.threatMedium().toString();
		triggerChange("threat-medium");
	});

	// set up high threat default button.
	document.getElementById("default-high").addEventListener("click", () => {
		document.getElementById("threat-high").value = Config.default.threatHigh().toString();
		triggerChange("threat-high");
	});

	/** Adds `listener` to element with id `id` for event "input" and "change". */
	function addListener(id, listener) {
		const elem = document.getElementById(id);
		elem.addEventListener("input", listener);
		elem.addEventListener("change", listener);
	}

	// set up validation listeners.
	addListener("name", (o) => {
		if(o.target.value === "") {
			allValid &= ~1;
			document.getElementById("invalid-name").classList.add("invalid");
		} else {
			allValid |= 1;
			document.getElementById("invalid-name").classList.remove("invalid");
		}

		document.getElementById("save").disabled = (allValid !== 15);
	});

	addListener("password", (o) => {
		if(o.target.value === "") {
			allValid &= ~2;
			document.getElementById("invalid-password").classList.add("invalid");
		} else {
			allValid |= 2;
			document.getElementById("invalid-password").classList.remove("invalid");
		}
		document.getElementById("save").disabled = (allValid !== 15);
	});

	const threatLevelValidate = () => {
		const numMedium = Number.parseInt(document.getElementById("threat-medium").value);
		const numHigh = Number.parseInt(document.getElementById("threat-high").value);
		if(Number.isNaN(numHigh))
		{
			allValid &= ~8;
			document.getElementById("invalid-high").classList.add("invalid");
		} else {
			if(Number.isNaN(numMedium)
			|| numMedium < 0
			|| numMedium > 10) {
				allValid &= ~4;
				document.getElementById("invalid-medium").classList.add("invalid");
			} else if(numHigh < 0
				|| numHigh > 10
				|| numHigh <= numMedium) {
				allValid &= ~12;
				document.getElementById("invalid-high").classList.add("invalid");
				document.getElementById("invalid-medium").classList.add("invalid");
			} else
			{
				allValid |= 12;
				document.getElementById("invalid-high").classList.remove("invalid");
				document.getElementById("invalid-medium").classList.remove("invalid");
			}
		}
		document.getElementById("save").disabled = (allValid !== 15);
	};

	addListener("threat-medium", threatLevelValidate);
	addListener("threat-high", threatLevelValidate);

	// fill the previous settings into the form.
	loadSettings();



	// on clicking the save button, save the form.
	document.getElementById("save").addEventListener("click", () => {
		// clear the status message.
		clearMessage();

		// read the settings from the form.
		var settings = {
			"name": document.getElementById("name").value,
			"password": document.getElementById("password").value,
			"auto_check": document.getElementById("auto-check").checked,
			"threat_medium": Number.parseInt(document.getElementById("threat-medium").value),
			"threat_high": Number.parseInt(document.getElementById("threat-high").value)
		};

		// validate the input.
		if(settings.name === "" || settings.password === "")
			displayError("Name and password are required.");
		else if(Number.isNaN(settings.threat_medium))
			displayError("Medium threat level must be a number.");
		else if(Number.isNaN(settings.threat_high))
			displayError("High threat level must be a number.");
		else if(settings.threat_medium >= settings.threat_high)
			displayError("Medium threat level must be < high threat level.");
		else
		{
			// save the settings.
			try {
				Config.fromJSON(settings).save(
					( ) => { displaySuccess("Saved settings."); },
					(e) => { displayError("Failed to save the settings."); });
			} catch(e) {
				displayError("Internal: " + e);
			}
		}
	});
}; })(15));