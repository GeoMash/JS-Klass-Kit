require('./../../../src/Class');
require('./../JasmineSandbox');

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'TestClassA'
	}
)
(
	// Static Block
	{
		name: 'some name',
		foo: 'some foo'
	},
	
	// Instance Block
	{
		
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'jskk.test',
		$name:		'TestClassB'
	}
)
(
	// Static Block
	{
		"name": 'some name',
		foo: 'some foo'
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
		console.log(jskk.test.TestClassA.name);
		console.log(jskk.test.TestClassA["name"]);
		console.log(jskk.test.TestClassA.somegarbage);
		console.log(jskk.test.TestClassA.foo);
		
		console.log('testing');
		console.log(jskk.test.TestClassB.name);
		console.log(jskk.test.TestClassB["name"]);
		console.log(jskk.test.TestClassB.somegarbage);
		console.log(jskk.test.TestClassB.foo);
	}
);

describe
(
	"demonstrates issue #11 https://github.com/melechi/JS-Klass-Kit/issues/11",
	function()
	{
		it
		(
			"test with unquoted name",
			function()
			{
				expect(jskk.test.TestClassA.name).toBe('some name');
				expect(jskk.test.TestClassA["name"]).toBe('some name');
				expect(jskk.test.TestClassA.somegarbage).toBeUndefined();
				expect(jskk.test.TestClassA.foo).toBe('some foo');
			}
		);
		
		it
		(
			"test with quoted name",
			function()
			{
				expect(jskk.test.TestClassB.name).toBe('some name');
				expect(jskk.test.TestClassB["name"]).toBe('some name');
				expect(jskk.test.TestClassB.somegarbage).toBeUndefined();
				expect(jskk.test.TestClassB.foo).toBe('some foo');
			}
		);
	}
);