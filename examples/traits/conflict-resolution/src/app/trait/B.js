$JSKK.Trait.create
(
	{
		$namespace:	'app.trait',
		$name:		'B'
	}
)
(
	{
		A: function()
		{
			console.log('Trait B Function A');
		},
		B: function()
		{
			console.log('Trait B Function B');
		}
	}
);