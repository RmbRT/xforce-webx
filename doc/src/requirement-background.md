# requirement-background.js

The background include dependency checker.

Scope: `background`.

# Contents

* **`Requirement.scope`**: `"background"`.

* **`Requirement.need(scope, need)`**: Registers a source file as included and checks for all dependencies.
	* String `scope`: The file name.
	* Array[String] `need`: The source files this file depends on.

	Throws `Error` if there are missing dependencies.