function allLinks()
{
	let as = document.getElementsByTagName("a");
	let result = [];

	for(let a in as)
	{
		if(a.hasAttribute("href"))
			result.push(a);
	}

	return result;
}

setTimeout(function(){
let links = allLinks();
for(let link in links)
	link.classList.add("unchecked_link");
}, 1000);