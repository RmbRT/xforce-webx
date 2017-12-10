# xforce-webx
This is a WebExtension for the IBM X-Force API. The project is part of the bachelor practicum course at TU Darmstadt and was created by a student group supervised by IBM employees. It is licensed under the GPL, version 3 or newer (a copy of the license can be found in the file `LICENSE`).

# Current state
There is an options page where one can store their credentials. One can right-click links and query URL reports. The WebExtension loads the credentials and uses them for the request. Requests are cached to reduce the number of requests sent for redundant requests.

# Tests
* `test/getUrlReport.html` is a test for the url report feature.

## Planned / considered features
* Intuitive display of unchecked links, so that one can tell checked from unchecked links.
* Automatic checking of all links on a website.
* Detecting links added/changed via javascript.
* Detecting non-`<a href>` links.
* Checking file hashes
* Managing collections
