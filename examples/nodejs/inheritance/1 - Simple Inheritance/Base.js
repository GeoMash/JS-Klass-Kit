$JSKK.Class.create
(
	{
		$namespace:	'example',
		$name:		'Base'
	}
)
(
	{},
	{
		init: function()
		{
			console.log("Base Class Instantiated");
		},
		helloWorld: function()
		{
			console.log('Hello World!');
		}
	}
);