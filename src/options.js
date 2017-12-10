const setting_names = ["username", "password"];

/** Loads the settings and writes them into the form. */
function loadSettings() {
	browser.storage.local.get(setting_names).then((s) => {
		for(var i in s)
			document.getElementById(i).value = s[i];
	}).catch((e) => {
		document.getElementById("error").innerText = "Error: Exception when loading: " + e;
	});
}

// Execute this code when the HTML of the options page is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
	// fill the previous settings into the form.
	loadSettings();

	// on clicking the save button, save the form.
	document.getElementById("form").addEventListener("submit", () => {
		var settings = {};
		for(var i = 0; i < setting_names.length; i++)
			settings[setting_names[i]] = document.getElementById(setting_names[i]).value;

		browser.storage.local.set(settings);
	});
});