var Requirement = {
	scope: "background",
	available : { "requirement-background.js": true },
	need: function(scope, need) {
		Requirement.available[scope] = true;

		for(var i = 0; i < need.length; i++)
			if(!Requirement.available[need[i]])
				throw new Error("Background script: '" + need[i] + "' needed before '" + scope + "'.");
	}
};