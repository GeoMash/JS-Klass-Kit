$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Base',
		$abstract:	true
	}
)
(
	{},
	{
		init: function()
		{
			console.debug(this.$reflect('name'));
		},
		foo:	$JSKK.Class.ABSTRACT_METHOD,
		bar:	$JSKK.Class.ABSTRACT_METHOD,
		baz:	$JSKK.Class.ABSTRACT_METHOD
	}
);
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main',
		$extends:	application.Base
	}
)
(
	{},
	{
		init: function()
		{
			console.debug(this.$reflect('name'));
		},
		foo:	function()
		{
			console.debug('Hello Foo :)');
		}
	}
);
//new application.Base();	//Error - "Base" is an abstract class and cannot be directly initiated.
new application.Main();		//Error - "bar" is an abstract method and so must either be defined or the class "Main" must be declared as abstract by defining $abstract:true in the class definition.