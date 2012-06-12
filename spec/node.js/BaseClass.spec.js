require('jskk');
require('./BaseClass.js');

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'MyClass',
		$requires:	'helper.BaseClass',
		$extends:	helper.BaseClass
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
				expect(a.get('foo').toBe(1);
				expect(a.get('bar').toBe(2);
			}
		);
	}
);