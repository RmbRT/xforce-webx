# xforce-webx
This is a WebExtension for the IBM X-Force API intended for security analysts. The project is part of the bachelor practicum course at TU Darmstadt and was created by a student group supervised by IBM employees. It is licensed under the GPL, version 3 or newer (a copy of the license can be found in the file `LICENSE`). To obtain a deviating license, explicit permission from the authors is needed.

> **Note**: Currently IBM has some problems with their DDoS-protection, which more or less frequently blocks requests made via the extension. Also, due to an outdated documentation of the API, editing collections does not work as intended.

# Setup guide
1. Load the Add-on from Mozilla.

	> While the extension is not yet officially listed at Mozilla, the extension has to be added manually. This is done by cloning the repository and visiting the `about:debugging` URL in Firefox. Then, after clicking on `Load Temporary Add-on`, one has to navigate into the `xforce-webx/src/` folder and select `manifest.js`.


0. Visit the options page (in `about:addons`, under the extension Tab) and enter an IBM API key into the form. Other options can be customised to one's liking and then the `Save changes` button has to be pressed. The detailed descriptions for all options are on the options page.

# User guide
## Using the pop-up
When clicking on the extension's icon, a window pops up. Here, one can browse one's private and shared collections and select an active collection. An active collection has to be chosen before any collections can be edited. Editing collections will be explained in a later section.

In the `About` section, there is a link to the project's official repository, as well as a license statement and a list of authors.

## Using the context menu
When right-clicking on a web site, a context menu pops up, which contains commands from the extension.

### Get Filehash Report
This option creates an input mask into which a file hash can be entered. When submitting the input, a file hash report is requested from IBM and displayed.

### Get URL Report
When right-clicking a link, an additional command becomes available, which requests and displays an URL report of the clicked link. URL reports contain a button which adds the URL report to the currently active collection.

# Current state
* The user can save their IBM credentials and create URL reports with the click of a button directly on any web page.
* The user interface uses the optic of material design while keeping IBM's look and feel for reports.
* URL Reports can easily be added to a collection by clicking a button on the report.
* There is an option to automatically get a report on every visited page, and indicating the current risk level of the visited page in the plugin icon.
* An active collection can be selected from the private and shared collections, and then reports can be added to the active collection conveniently.
* File hashes can be checked on-page.

## Planned / considered features
* Intuitive display of unchecked links, so that one can tell checked from unchecked links.
* Automatic checking of all links on a website.
* Detecting links added/changed via javascript.

# Tests
Since there is no tool for automatically testing WebExtensions, modules are tested in test files. These can be found in the `test` directory.
* `test/getUrlReport.html` is a test for the url report feature.
* `test/ipAddressTest.html` is a test for the IP and URL parser.
* `test/reportCache.html` is a test for the URL report cache.

#Images
Loading the addon: 
![alt text](https://github.com/RmbRT/xforce-webx/blob/master/Readme%20Pictures/aboutDebugging.png "about:debugging")


