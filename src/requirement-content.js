var Requirement = {
	scope: "content",
	available : { "requirement-content.js": true },
	need: function(scope, need) {
		Requirement.available[scope] = true;

		for(var i = 0; i < need.length; i++)
			if(!Requirement.available[need[i]])
				throw new Error("Content script: '" + need[i] + "' needed before '" + scope + "'.");
	}
};