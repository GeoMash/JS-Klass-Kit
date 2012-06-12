require('./../../src/Class');
require('./Statics');

// Unit Test (node-jasmine)
describe
(
	"The JSKK Classing Engine's basic Class functionality",
	function()
	{
		it
		(
			"can access the superclass static attributes",
			function()
			{
				expect(jskk.test.SuperClass.name).toBe('default name');
			}
		);
		
		it
		(
			"can access the sub class static attributes",
			function()
			{
				expect(jskk.test.SubClass.name).toBe('new name');
			}
		);
		
	}
);