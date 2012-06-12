require('./../../src/Class');
require('./JasmineSandbox');

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'SuperClass'
	}
)
(
	// Static Block
	{
		foo: 'default foo',
		bar: 'default bar',
		
		getFoo: function()
		{
			return '?';
		},
		
		getBar: function()
		{
			return '?';
		}
	},
	
	// Instance Block
	{
		getFoo: function()
		{
			return this.$reflect('self').foo;
		},
		
		getBar: function()
		{
			return this.$reflect('self').bar;
		}
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'SubClass',
		$extends: 	'jskk.test.SuperClass'
	}
)
(
	// Static Block
	{
		foo: 'new foo'
	},
	
	// Instance Block
	{
		
	}
);

sandbox
(
	function()
	{
		console.log('testing');
		console.log(jskk.test.SuperClass.foo);
		console.log(jskk.test.SuperClass.bar);
	}
);