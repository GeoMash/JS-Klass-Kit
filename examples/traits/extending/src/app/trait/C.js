$JSKK.Trait.create
(
	{
		$namespace:	'app.trait',
		$name:		'C',
		$uses:		'app.trait.B'
	}
)
(
	{
		C: function()
		{
			console.log('Trait C Function C');
		},
		D: function()
		{
			console.log('Trait C Function D');
		}
	}
);