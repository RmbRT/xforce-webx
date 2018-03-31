var TestSuite = {
	successes: 0,
	tries: 0,
	test: function(name, test) {
		document.addEventListener("DOMContentLoaded", () => {
			var testOutput = document.createElement("div");
			testOutput.innerHTML = `<h2>Module: ${name}</h2>`;
			testOutput.classList.add("test");
			var logArea = document.createElement("div");
			testOutput.appendChild(logArea);

			try {
				test(text => {
					var line = document.createElement("div");
					line.innerText = text;
					logArea.appendChild(line);
				}, testOutput);
				testOutput.classList.add("success");

				document.getElementById("successes").innerText = (++TestSuite.successes).toString();
			} catch(e) {
				testOutput.classList.add("failure");
				document.getElementById("result-container").classList.add("failure");
				document.getElementById("result-container").classList.remove("success");
				document.getElementById("result").innerText = "Failure";
				
				var line = document.createElement("div");
				line.innerText = "\nError:" + e;
				logArea.appendChild(line);

			}
			document.getElementById("tries").innerText = (++TestSuite.tries).toString()

			document.body.appendChild(testOutput);
		});
	}
};