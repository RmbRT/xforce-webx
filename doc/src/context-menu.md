# context-menu.js

Contains the context menu helper class.

Scope: `background`.

# Contents

* **`ContextMenu.addEntry(id, title, contexts, handler)`**: Adds a context menu entry to the context menu. This is related to `browser.contextMenus.create` and `browser.contextMenus.onClicked.addListener`.
	* String `id`: The internal name for the context menu entry.
	* String `title`: The display name for the context menu entry.
	* Array[String] `contexts`: The contexts in which the context menu entry appears.
	* Function `handler(info, tab)`: The callback to be called when the context menu entry is clicked.
		* `info`: The info object passed by the WebExtension API.
		* `tab`: The tab object passed by the WebExtension API.