$JSKK.Trait.create
(
	{
		$namespace:	'app.trait',
		$name:		'B'
	}
)
(
	{
		C: function()
		{
			console.log('Trait B Function C');
		},
		D: function()
		{
			console.log('Trait B Function D');
		}
	}
);