# test-suite.html

This is the test suite of the plugin. In `test-suite.js`, a test interface is created, and new tests can be added by including the test script and the script that is to be tested in the `test-suite.html`, and calling `TestSuite.test()` with the testing function.

* **`TestSuite.test(name, test)`**: Tests a module in the test suite.
	If the test fails, the whole test suite fails.

	* String `name`: The name of the file to test.
	* Function `test(log, root)`: The test function.
		* Function `log(message)`: Logs a message.
		* `root`: The root element in which the test case is displayed.