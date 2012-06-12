require('./../../src/Class');
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
		name: 'default name',
		foo: 'bar'
	},
	
	// Instance Block
	{
		
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
		name: 'new name'
	},
	
	// Instance Block
	{
		
	}
);

console.log('testing');
console.log(jskk.test.SuperClass.name);
console.log(jskk.test.SuperClass["name"]);
console.log(jskk.test.SuperClass.asasd);
console.log(jskk.test.SuperClass.foo);