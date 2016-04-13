$JSKK.Class.create
(
	{
		$namespace: 'app',
		$name:		'Main',
		$uses:
		[
			'app.trait.A',
			'app.trait.C',
			{
				A: 'app.trait.C',
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