require('./../../src/Class');

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

