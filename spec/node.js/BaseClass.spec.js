require('./../../src/Class');
require('./JasmineSandbox');
require('./BaseClass');


$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'MyClass',
		$extends:	'helper.BaseClass'
	}
)
(
	// Static Block
	{
	
	},
	
	// Instance Block
	{
		/**
		 * jskk.test.MyClass Constructor
		 */
		init: function()
		{
			// constructor
		}
	}
);


describe
(
	"BaseClass",
	function()
	{
		var a = new jskk.test.MyClass();
		
		
		it
		(
			"can set",
			function()
			{
				a.set('foo', 1);
				a.set('bar', 2);
			}
		);
		
		
		it
		(
			"can get",
			function()
			{
				expect(a.get('foo')).toBe(1);
				expect(a.get('bar')).toBe(2);
			}
		);
		
		
		it
		(
			"can get lots",
			function()
			{
				var properties = a.getProperties(['foo', 'bar']);
				
				// var properties = {'a':'hello', 'gogo':123};
				// console.log(properties);
				
				expect(properties['foo']).toBe(1);
				expect(properties['bar']).toBe(2);
				
			}
		)
	}
);