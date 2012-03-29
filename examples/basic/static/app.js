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

$application=new application.Main();

console.debug(application.Main.FOO);
console.debug(application.Main.BAR);
console.debug(application.Main.BAZ);

application.Main.someStaticMethod();