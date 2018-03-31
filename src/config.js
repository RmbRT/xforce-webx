Requirement.need("config.js", [
	"messaging.js"]);

/** The configuration data of the web extension.
@param name:
	String: The X-Force login name.
@param password:
	String: The X-Force login password.
@param auto_check:
	Boolean: Whether to check the threat level of visited sites automatically.
@param threat_medium:
	Number: The minimum threat level to treat as medium threat.
@param threat_high:
	Number: The minimum threat level to treat as high threat.
@param remember_reports:
	Boolean: Whether to remember URL reports, so that they reappear when hovering their link.
@param parse_links:
	Boolean: Whether to parse the site for plaintext links and convert them to clickable links.
@param dummy_responses:
	Boolean: Whether to replace X-Force API calls with dummy responses.
@throws TypeError
	If any of the arguments is not of the required type. */
function Config(
	name,
	password,
	auto_check,
	threat_medium,
	threat_high,
	remember_reports,
	parse_links,
	dummy_responses) {
	// check and set name.
	if(typeof(name) !== "string")
		throw new TypeError("name must be a string.");
	else
		this._name = name;

	// check and set password.
	if(typeof(password) !== "string")
		throw new TypeError("password must be a string.");
	else
		this._password = password;

	// check and set auto_check.
	if(typeof(auto_check) !== "boolean")
		throw new TypeError("auto_check must be a boolean.");
	else
		this._auto_check = auto_check;

	// check and set threat_medium.
	if(typeof(threat_medium) !== "number")
		throw new TypeError("threat_medium must be a number.");
	else
		this._threat_medium = threat_medium;

	// check and set threat_high.
	if(typeof(threat_high) !== "number")
		throw new TypeError("threat_high must be a number");
	else
		this._threat_high = threat_high;

	if(typeof(remember_reports) !== "boolean")
		throw new TypeError("remember_reports must be a boolean.");
	else
		this._remember_reports = remember_reports;

	if(typeof(parse_links) !== "boolean")
		throw new TypeError("parse_links must be a boolean.");
	else
		this._parse_links = parse_links;

	if(typeof(dummy_responses) !== "boolean")
		throw new TypeError("dummy_responses must be a boolean.");
	else
		this._dummy_responses = dummy_responses;
}

/** Creates a config object from a json object. */
Config.fromJSON = function(json) {
	return new Config(
		json.name,
		json.password,
		json.auto_check,
		json.threat_medium,
		json.threat_high,
		json.remember_reports,
		json.parse_links,
		json.dummy_responses);
};

/** Converts a config object into a json object. */
Config.prototype.toJSON = function() {
	return {
		"name": this._name,
		"password": this._password,
		"auto_check": this._auto_check,
		"threat_medium": this._threat_medium,
		"threat_high": this._threat_high,
		"remember_reports": this._remember_reports,
		"parse_links": this._parse_links,
		"dummy_responses": this._dummy_responses
	};
};

/** The keys used to load and save the config object. */
Config.fields = ["name", "password", "auto_check", "threat_medium", "threat_high", "remember_reports", "parse_links", "dummy_responses"];

/** The default config values.
	This is used to create initial config values. */
Config.defaultJSON = {
	"name": "",
	"password": "",
	"auto_check": false,
	"threat_medium": 4,
	"threat_high": 7,
	"remember_reports": false,
	"parse_links": true,
	"dummy_responses": false
};

/** Default config object. */
Config.default = Config.fromJSON(Config.defaultJSON);

/** Listens for config updates.
@param callback:
	A function(config) that listens for updates.
	@param config:
		The new config value. */
Config.listenForUpdates = function(callback) {
	Messaging.listen("Config.update", ((callback) => { return function(o) {
		callback(Config.fromJSON(o));
	}; })(callback));
};

/** Sends the config object to the background script. */
Config.prototype.sendUpdate = function() {
	Messaging.sendToBackground("Config.update", this.toJSON());
};

/** Loads the configuration.
@param then:
	Function(Config): Called when the config is successfully loaded.
@param fail:
	Function(Error): Called when the config could not be loaded.
@throws TypeError
	If the arguments were not of the right type. */
Config.load = function(then, fail) {
	// check argument types.
	if(typeof(then) !== "function")
		throw new TypeError("then must be a function taking 1 argument.");
	else if(typeof(fail) !== "function")
		throw new TypeError("fail must be a function taking 1 argument.");

	// attempt to load the configuration object.
	if(chrome)
		chrome.storage.local.get(Config.fields, (c) => {
			// replace unset values with default values.
			for(var i = 0; i < Config.fields.length; i++)
				if(!(Config.fields[i] in c))
					c[Config.fields[i]] = Config.defaultJSON[Config.fields[i]];
			// return the config object.
			then(Config.fromJSON(c));
		});
	else
		browser.storage.local.get(Config.fields).then((c) => {
			// replace unset values with default values.
			for(var i = 0; i < Config.fields.length; i++)
				if(!(Config.fields[i] in c))
					c[Config.fields[i]] = Config.defaultJSON[Config.fields[i]];
			// return the config object.
			then(Config.fromJSON(c));
		}).catch(fail);
};

/** Saves a configuration object.
@param then:
	Function(): Called when the config is successfully saved.
@param fail:
	Function(Error): Called when the config could not be saved.
@throws TypeError
	If the arguments were not of the right type. */
Config.prototype.save = function(then, fail) {
	// check argument types.
	if(typeof(then) !== "function")
		throw new TypeError("then must be a function taking 1 argument.");
	else if(typeof(fail) !== "function")
		throw new TypeError("fail must be a function taking 1 argument.");

	// notify the background script for a updated configuration. 
	this.sendUpdate();

	// attempt to save the configuration object.
	if(chrome)
		chrome.storage.local.set(this.toJSON(), then);
	else
		browser.storage.local.set(this.toJSON()).then(then).catch(fail);
};

/** Returns the X-Force login name. */
Config.prototype.name = function() { return this._name; };

/** Returns the X-Force login password. */
Config.prototype.password = function() { return this._password; };

/** Returns whether every visited site should be checked automatically. */
Config.prototype.autoCheck = function() { return this._auto_check; };

/** Returns the minimum threat level to treat as medium threat. */
Config.prototype.threatMedium = function() { return this._threat_medium; };

/** Returns the minimum threat level to treat as high threat. */
Config.prototype.threatHigh = function() { return this._threat_high; };

/** Returns whether reports are remembered. */
Config.prototype.rememberReports = function() { return this._remember_reports; };

/** Returns whether plaintext links should be parsed and replaced. */
Config.prototype.parseLinks = function() { return this._parse_links; };

/** Returns whether dummy responses should be used. */
Config.prototype.dummyResponses = function() { return this._dummy_responses; };

/** Classifies a threat level.
	The classification depends on the `threatMedium` and `threatHigh` properties.
@return
	"low", "medium", or "high". */
Config.prototype.threatLevel = function(level) {
	if(level >= this.threatHigh())
		return "high";
	else if(level >= this.threatMedium())
		return "medium";
	else
		return "low";
};

/** Sets up the global config object. */
Config.register = function() {
	// load the global config.
	Config._global = new Promise((resolve, reject) => {
		Config.load(resolve, reject);
	});
	// update the global config automatically.
	Config.listenForUpdates((c) => { Config._global = Promise.resolve(c); });

};

/** Retrieves the config object.
@param then:
	A callback receiving the config object.
@param fail:
	Optional: Callback that is called when the loading failed. */
Config.get = function(then, fail) {
	if(arguments.length === 1)
		Config._global.then(c => { then(c); return c; });
	else
		Config._global.then(c => { then(c); return c; }, c => { fail(c); return c; });
};