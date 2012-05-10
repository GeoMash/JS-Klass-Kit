$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'BaseClass'
	}
)
(
	{},
	{
		_properties:{},
		
		init: function()
		{
		},
		get: function(key)
		{
			if (Object.isDefined(this._properties[key]))
			{
				return this._properties[key];
			}
			else
			{
				throw new Error('Invalid property: "'+key+'".');
			}
		},
		set: function(key, val)
		{
			this._properties[key] = val;
			return this;
		}
	}
);