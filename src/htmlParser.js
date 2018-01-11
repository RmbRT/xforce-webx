
	var regexv4 = /\b(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b/gi;
	var regexv6 = '';
	document.body.innerHTML = document.body.innerHTML.replace(regexv4, '<a href="https://$1">$1</a>');
