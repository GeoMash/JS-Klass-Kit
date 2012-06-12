require('jskk');

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'TestClass'
	}
)
(
	// Static Block
	{
		myStaticAttribute: 'foo',
		
		myStaticMethod: function()
		{
			return 'bar';
		}
	},
	
	// Instance Block
	{
		myInstanceAttribute: null,
		
		/**
		 * jskk.test.TestClass Constructor
		 */
		init: function()
		{
			// constructor
			this.myInstanceAttribute = 'I have been instantiated';
		},
		
		myInstanceFunction: function()
		{
			return 'baz';
		}
	}
);


// Unit Test (node-jasmine)
describe
(
	"The JSKK Classing Engine's basic Class functionality",
	function()
	{
		it
		(
			"Provides static functionality",
			function()
			{
				expect(jskk.test.TestClass.myStaticAttribute).toBe('foo');
				expect(jskk.test.TestClass.myStaticMethod()).toBe('bar');
			}
		);
		
		it
		(
			"Does not allow static access to instance methods",
			function()
			{
				expect(jskk.test.myInstanceAttribute).toBeUndefined();
				expect(jskk.test.myInstanceFunction).toBeUndefined();
			}
		);
		
		it
		(
			"Creates unique instances",
			function()
			{
				var a = new jskk.test.TestClass();
				expect(a.myInstanceAttribute).toBe('I have been instantiated');
				expect(a.myInstanceFunction()).toBe('baz');
				
				var b = new jskk.test.TestClass();
				expect(b.myInstanceAttribute).toBe('I have been instantiated');
				expect(b.myInstanceFunction()).toBe('baz');
				
				b.myInstanceAttribute = 'My attribute has been changed';
				expect(b.myInstanceAttribute).toBe('My attribute has been changed');
				expect(a.myInstanceAttribute).not.toBe('My attribute has been changed');
			}
		);
	}
);