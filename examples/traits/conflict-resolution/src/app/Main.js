$JSKK.Class.create
(
	{
		$namespace: 'app',
		$name:		'Main',
		$uses:
		[
			'app.trait.A',
			'app.trait.B',
			{
				A: 'app.trait.B',
				B: 'app.trait.A'
			}
		]
	}
)
(
	{},
	{
		init: function()
		{
			
		}
	}
);