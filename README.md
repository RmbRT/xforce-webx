# xforce-webx
This is a WebExtension for the IBM X-Force API intended for security analysts. The project is part of the bachelor practicum course at TU Darmstadt and was created by a student group supervised by IBM employees. It is licensed under the GPL, version 3 or newer (a copy of the license can be found in the file `LICENSE`).

# Current state
The user can save their IBM credentials and create URL reports with the click of a button directly on any web page. Reports can easily be added to a collection by clicking a button on the report. The user can optionally enable automatic reports on every visited page. Users can select an active collection from their private and shared collections, and then conveniently add reports.

# Tests
* `test/getUrlReport.html` is a test for the url report feature.
* `test/ipAddressTest.html` is a test for the IP and URL parser.
* `test/reportCache.html` is a test for the URL report cache.

## Planned / considered features
* Intuitive display of unchecked links, so that one can tell checked from unchecked links.
* Automatic checking of all links on a website.
* Detecting links added/changed via javascript.
* Checking file hashes
