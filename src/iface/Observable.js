$JSKK.Interface.create
(
	{
		$namespace: '$JSKK.iface',
		$name:		'Observable'
	}
)
(
	{
		events:		[],
		observe:	$JSKK.Interface.METHOD,
		unobserve:	$JSKK.Interface.METHOD,
		fireEvent:	$JSKK.Interface.METHOD
	}
);