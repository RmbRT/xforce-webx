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

/** Loads the settings and writes them into the form. */
function loadSettings() {
	Config.load((c) => {
		try {
			document.getElementById("name").value = c.name().toString();
			document.getElementById("password").value = c.password().toString();
			document.getElementById("auto-check").checked = !!c.autoCheck();
			document.getElementById("threat-medium").value = c.threatMedium().toString();
			document.getElementById("threat-high").value = c.threatHigh().toString();
		} catch(e) {
			displayError("Internal: " + e);
		}
	}, (e) => {
		displayError("Exception when loading settings: " + e);
	});
}

// Execute this code when the HTML of the options page is fully loaded.
document.addEventListener("DOMContentLoaded", ((allValid) => { return function() {
	// set up validation listeners.
	document.getElementById("name").addEventListener("input", (o) => {
		if(o.value === "") {
			allValid &= ~1;
			document.getElementById("invalid-name").classList.add("invalid");
		} else {
			allValid |= 1;
			document.getElementById("invalid-name").classList.remove("invalid");
		}
	});
	document.getElementById("password").addEventListener("change", () => {
	});


	// fill the previous settings into the form.
	loadSettings();



	// on clicking the save button, save the form.
	document.getElementById("save").addEventListener("click", () => {
		// clear the status message.
		clearMessage();
		displaySuccess("kefekf");

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
}; })(0));