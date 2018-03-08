const Messaging = {
	/** Listens for messages over a channel.
	@param channel:
		The communication channel.
	@param handler:
		A function(message, channel) that is called whenever a message on the requested channel is received.
		@param message:
			The received message.
		@param channel:
			The communication channel.
		@return
			The response to the received message, or nothing. If an asynchronous response is wanted, then a Promise has to be returned. */
	listen: function(channel, handler) {
		var ret = browser.runtime.onMessage.addListener(((channel, handler) => { return function(message, sender, sendResponse) {
			// only pass messages that are sent over the requested channel.
			if(message.channel === channel) {
				// pass the message to the handler.
				const reply = handler(message.message, message.channel);
				// if the reply is a promise, return it.
				if(reply && Promise.resolve(reply) == reply)
					return reply;
				// otherwise, if it is a message, send it.
				else if(reply !== undefined)
					sendResponse(reply);
			}
		}; })(channel, handler));
	},
	/** Sends a message over a channel to a background script.
	@param channel:
		The communication channel.
	@param message:
		The message to send.
	@return
		A Promise with a response, if any. */
	sendToBackground: function(channel, message) {
		return browser.runtime.sendMessage({
			channel: channel,
			message: message
		});
	},
	/** Sends a message over a channel to a content script in a specified tab.
	@param tab:
		The tab to send the message to.
	@param channel:
		The communication channel.
	@param message:
		The message to send.
	@return
		A Promise with a response, if any. */
	sendToContent: function(tab, channel, message) {
		return browser.tabs.sendMessage(
			tab, {
				channel: channel,
				message: message
			});
	}
};