TestSuite.test("htmlParser.js", (log, root) => {

	log(`This module is not automatically verifiable, but can be tested easily by looking.`);

	var container = document.createElement("div");
	container.innerHTML = `
	<p>The following addresses are plain text, and should be automatically replaced with links.</p>
	<ul>
		<li>192.168.2.2</li>
		<li>192.0.2.1</li>
		<li>2001:0db8:85a3:0000:0000:8a2e:0370:7334</li>
		<li>192.168.2.1</li>
		<li>www.google.com</li>
		<li>thepiratebay.org</li>
		<li>facebook.com</li>
	</ul>

	<p>The following address is a link and should <b>not</b> be replaced again</p>
	<p><a href="https://192.168.2.1">192.168.2.1</a></p>
	<p>Links in code-Tags should <b>not</b> be replaced.</p>
	<p><code>www.google.com</code></p>`;

	root.appendChild(container);
	traverseHelper(container);
});