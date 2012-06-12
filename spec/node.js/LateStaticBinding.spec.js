require('./../../src/Class');
require('./Statics');

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
				expect(jskk.test.SuperClass.foo).toBe('default foo');
				expect(jskk.test.SuperClass.bar).toBe('default bar');
			}
		);
		
		it
		(
			"can access the sub class static attributes, one of which is overwritten",
			function()
			{
				expect(jskk.test.SubClass.foo).toBe('new foo');
				expect(jskk.test.SubClass.bar).toBe('default bar');
			}
		)
		
		it
		(
			"can access its own static attribute from an instance function",
			function()
			{
				var mySuperClass = new jskk.test.SuperClass();
				expect(mySuperClass.getFoo()).toBe('default foo');
				expect(mySuperClass.getBar()).toBe('default bar');
			}
		)
		
		it
		(
			"can access its parents static attribute from a parent instance function, one of which is overwritten",
			function()
			{
				var mySubClass = new jskk.test.SubClass();
				expect(mySubClass.getFoo()).toBe('new foo');
				expect(mySubClass.getBar()).toBe('default bar');
			}
		)
		
		it
		(
			"can access its parents static attribute from a parent static function, one of which is overwritten",
			function()
			{
				expect(jskk.test.SubClass.getFoo()).toBe('new foo');
				expect(jskk.test.SubClass.getBar()).toBe('default bar');
			}
		)
		
	}
);