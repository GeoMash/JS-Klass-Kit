$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main'
	}
)
(
	{
		//Constants
		FOO:	'foo',
		BAR:	'bar',
		BAZ:	'baz',
		
		//Static methods. These don't hold scope.
		someStaticMethod: function()
		{
			document.body.innerHTML='Hello World';
			console.debug(this);
		}
	},
	{
		init: function()
		{
			console.debug('Class init.');
		}
	}
);
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main2',
		$extends:	application.Main
	}
)
(
	{},
	{}
);

$application=new application.Main();

console.debug(application.Main.FOO);
console.debug(application.Main.BAR);
console.debug(application.Main.BAZ);

application.Main.someStaticMethod();

$application2=new application.Main2();

console.debug(application.Main2.FOO);
console.debug(application.Main2.BAR);
console.debug(application.Main2.BAZ);

application.Main2.someStaticMethod();