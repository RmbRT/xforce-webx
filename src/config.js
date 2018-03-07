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
@throws TypeError
	If any of the arguments is not of the required type. */
function Config(
	name,
	password,
	auto_check,
	threat_medium,
	threat_high) {
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
		throw new TypeEError("threat_medium must be a number.");
	else
		this._threat_medium = threat_medium;

	// check and set threat_high.
	if(typeof(threat_high) !== "number")
		throw new TypeError("threat_high must be a number");
	else
		this._threat_high = threat_high;
}

/** Creates a config object from a json object. */
Config.fromJSON = function(json) {
	return new Config(
		json.name,
		json.password,
		json.auto_check,
		json.threat_medium,
		json.threat_high);
};

/** Converts a config object into a json object. */
Config.prototype.toJSON = function() {
	return {
		"name": this._name,
		"password": this._password,
		"auto_check": this._auto_check,
		"threat_medium": this._threat_medium,
		"threat_high": this._threat_high
	};
};

/** The keys used to laod and save the config object. */
Config.fields = ["name", "password", "auto_check", "threat_medium", "threat_high"];

/** The default config values.
	This is used to create initial config values. */
Config.defaultJSON = {
	"name": "",
	"password": "",
	"auto_check": false,
	"threat_medium": 4,
	"threat_high": 7
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
	browser.storage.local.get(Config.fields).then(
		((then) => { return (c) => {
			// replace unset values with default values.
			for(var i = 0; i < Config.fields.length; i++)
				if(!(Config.fields[i] in c))
					c[Config.fields[i]] = Config.defaultJSON[Config.fields[i]];
			// return the config object.
			then(Config.fromJSON(c));
		};
	})(then)).catch(fail);
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