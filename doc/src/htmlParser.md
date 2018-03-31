# htmlParser.js

Parses plain text links and converts them into clickable links.

Depends on `config.js`.

Scope: `content`.

# Contents

* **`replaceTextNode(textNode, regex)`**: Method that checks a given text for the occurences of the given regex.
	Matches will be converted to &lt;a&gt; tags.
	* `textNode`: The given Textnode.
	* `regex`: The regular expression.

* **`traverseHelper(rootNode)`**: Parses the plaintext links from the document and replaces them with clickable links.
	* `rootNode`: The root node to start with.

* `parseLinks()`: Parses all links in the document, if the config option `parseLinks` is set.