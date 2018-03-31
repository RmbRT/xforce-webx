# messaging.js

Contains a messaging interface.

Scope: `background` / `content`.

# Contents

* **`Messaging.listen(channel, handler)`**: Listens for messages over a channel.
	* String `channel`: The communication channel.
	* Function `handler(message, channel)`: A function that is called whenever a message on the requested channel is received.
		* `message`: The received message.
		* `channel`: The communication channel.

		Returns the response to the received message, or nothing. If an asynchronous response is wanted, then a `Promise` has to be returned.

* **`sendToBackground(channel, message)`**: Sends a message over a channel to a background script.
	* String `channel`: The communication channel.
	* `message`: The message to send.

	Returns a `Promise` with a response, if any.

* **`sendToContent(tab, channel, message)`**: Sends a message over a channel to a content script in a specified tab.
	* Number `tab`: The tab to send the message to.
	* String `channel`: The communication channel.
	* `message`: The message to send.

	Returns a `Promise` with a response, if any.