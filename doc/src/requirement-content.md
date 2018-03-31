# requirement-content.js

The content include dependency checker.

Scope: `content`.

# Contents

* **`Requirement.scope`**: `"content"`.

* **`Requirement.need(scope, need)`**: Registers a source file as included and checks for all dependencies.
	* String `scope`: The file name.
	* Array[String] `need`: The source files this file depends on.

	Throws `Error` if there are missing dependencies.