$JSKK.Trait.create
(
	{
		$namespace:		'$JSKK.trait',
		$name:			'Configurable',
		$implements:	$JSKK.iface.Configurable
	}
)
(
	{
		init: function(config)
		{
			Object.extend(this.config,config);
		}
	}
);