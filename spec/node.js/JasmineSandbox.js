/**
 * This function allows you to define a 'sandbox' function in a jasmine script.
 * If your script is run as a regular script, the 'sandbox' function will be called,
 * and 'describe' will be defined as a blank function.
 * 
 * Usage:
 * 
 *     require('./JasmineSandbox');
 *     // preconditions for your test ...
 *     sandbox(function(){
 *         console.log("some data");
 *     });
 *     describe("suite name", function(){
 *         expect('some data').toBe('some data');
 *     });
 * 
 * This way you can sandbox your unit tests for output as well as run them as unit tests.
 * @param  {function} cbk the sandbox function which does output
 */
sandbox = function(cbk)
{
	// If this is not being run as a unit test
	if(typeof describe != 'function')
	{
		cbk();	// Do the sandbox stuff
		describe = function(){}; // Don't to the unit test stuff
	}
	// Otherwise, we don't do the sandbox stuff.
};