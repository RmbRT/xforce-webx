Requirement.need("context-menu.js", []);

var ContextMenu = {
	addEntry: function(id, title, contexts, handler) {
		browser.contextMenus.create({
			id: id,
			title: title,
			contexts: contexts,
		});
		browser.contextMenus.onClicked.addListener((info, tab) => {
			if(info.menuItemId === id)
				handler(info, tab);
		});
	}
};