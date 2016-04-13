$JSKK.Trait.create
(
	{
		$namespace:	'app.trait',
		$name:		'A'
	}
)
(
	{
		A: function()
		{
			console.log('Trait A Function A');
		},
		B: function()
		{
			console.log('Trait A Function B');
		}
	}
);