# auto-check.js

This file contains the functionality to automatically check the risk level of visited sites.

Depends on `config.js`, `report-cache.js`.

Scope: `background`.

# Contents

* **`AutoCheck.registerInBackground`**: Registers an event listener that is called when a new page is visited. If the config option `autoCheck` is enabled, then the risk level of the currently visited page is requested and displayed in the plugin icon. Depending on the risk level settings in the options, the icon is replaced with a green icon for low risk, yellow for medium risk, and red for high risk.