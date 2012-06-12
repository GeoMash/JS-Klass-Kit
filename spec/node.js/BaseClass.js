require('./../../src/Class');

/**
 * Provides get and set functions, which store properties into the _properties object.
 */
$JSKK.Class.create
(
	{
		$namespace:	'helper',
		$name:		'BaseClass'
	}
)
(
	// Static Block
	{
		
	},
	
	// Instance Block
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
		},
		
		getProperties: function(/** list of property names */)
		{
			var args = $JSKK.toArray(arguments);
			var length = args.length;
			var rtn = [];
			
			for(var i=0; i<length; i++)
			{
				var val = args[i];
				rtn[val] = this.get(val);
			}
			return rtn;
		}
	}
);