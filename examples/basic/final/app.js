$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main',
		$final:		true
	}
)
(
	{},
	{
		init: function()
		{
			console.debug(this.$reflect('name'));
		}
	}
);
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Foo',
		$extends:	application.Main
	}
)
(
	{},
	{
		init: function()
		{
			console.debug(this.$reflect('name'));
		}
	}
);
new application.Foo();		//Error - Unable to extend class. Class to extend from is declared as final.