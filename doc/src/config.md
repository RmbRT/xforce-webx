# config.js

Contains the config type.

Scope: `content` / `background`.

# Contents
	
* **`Config(name, password, auto_check, threat_medium, threat_high, remember_reports, parse_links, dummy_responses)`**: The config class (constructor).

	* String `name`: The X-Force API name key.
	* String `password`: The X-Force API password key.
	* Boolean `auto_check`: Whether to check the threat level of visited sites automatically.
	* Number `threat_medium`: The minimum threat level to treat as medium threat.
	* Number `threat_high`: The minimum threat level to treat as high threat.
	* Boolean `remember_reports`: Whether to remember URL reports, so that they reappear when hovering their link.
	* Boolean `parse_links`: Whether to parse the site for plaintext links and convert them to clickable links.
	* Boolean `dummy_responses`: Whether to replace X-Force API calls with dummy responses.

	Throws a `TypeError` if any arguments are not of the required type.


	Functions:
	
	* **`fromJSON(json)`**: Creates a config object from a json object. The json field names are exactly as in the constructor arguments.

	* **`listenForUpdates(callback)`**: Calls `callback` whenever a change to the config was made.
		* Function `callback(newState)`: The callback to be called whenever a new config state is available.
			* Config `newState`: The new config state.

	* **`load(then, fail)`**: Loads the configuration.
		* Function `then(Config)`: Called when the config is successfully loaded.
		* Function `fail(Error)`: Called when the config could not be loaded.

		Throws a `TypeError` if the arguments were no functions.

	* **`register()`**: Sets up the global config object.

	* **`get(then, fail)`**: Retrieves the config object.
		* Function `then(Config)`: A callback receiving the config object.
		* Function `fail(Error)`: *Optional*: Callback that is called when the loading failed.


	Fields: 

	* **`fields`**: The names of the json fields used for storing and loading the config object from the persistent storage.
	* **`defaultJSON`**: The default config object, as a json object.
	* **`default`**: The default config object.

	Member functions:

	* **`toJSON()`**: Converts a config object to a json object. The json field names are exactly as in the constructor arguments.
	* **`sendUpdate()`**: Sets the global config object to `this` and notifies all callbacks from `Config.listenForUpdates`.
	* **`save(then, fail)`**: Writes `this` to the persistent storage.
		* Function `then()`: Called on success.
		* Function `fail()`: Called on failure.

		Throws `TypeError` if the arguments aren't functions.

	* **`name()`**:  Returns the X-Force login name.
	* **`password()`**: Returns the X-Force login password.
	* **`autoCheck()`**: Returns whether every visited site should be checked automatically.
	* **`threatMedium()`**: Returns the minimum threat level to treat as medium threat.
	* **`threatHigh()`**: Returns the minimum threat level to treat as high threat.
	* **`rememberReports()`**: Returns whether reports are remembered.
	* **`parseLinks()`**: Returns whether plaintext links should be parsed and replaced.
	* **`dummyResponses()`**: Returns whether dummy responses should be used.
	* **`threatLevel(level)`**: Classifies a threat level.
		
		The classification depends on the `threatMedium` and `threatHigh` properties. Returns `"low"`, `"medium"`, or `"high"`.