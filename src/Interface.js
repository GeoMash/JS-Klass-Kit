/**
 * 
 * 
 */
$JSKK.Interface=
{
	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	create: function(definition)
	{
		if (Object.isString(definition))
		{
			var	namespace		=window,
				interfaceName	=definition,
				def				={};
			
			def.$name		=definition;
			def.$namespace	='window';
			definition		=def;
		}
		else
		{
			if (Object.isUndefined(definition.$name))
			{
				throw Error('Interface name must be defined.');
			}
			else
			{
				var interfaceName=definition.$name;
				if (Object.isUndefined(definition.$namespace))
				{
					definition.$namespace='window';
					var namespace=window;
				}
				else
				{
					var namespace=$JSKK.namespace(definition.$namespace);
				}
			}
		}
		namespace[interfaceName]=function()
		{
			throw [
				'Interface "'+interfaceName+'" cannot be initiated because interfaces',
				' are abstract classes which cannot be directly initiated.'
			].join('');
		}
		
		//Set the class type.
		definition.$type='interface';
		
		//Create a reflection method.
		namespace[interfaceName].prototype.$reflect=function(what)
		{
			switch (what)
			{
				case 'type':		return definition.$type;
				case 'namespace':	return definition.$namespace;
				case 'name':		return definition.$name;
				case 'extends':		return definition.$extends;
				case 'implements':	return definition.$implements;
			}
		}
		
		return function(interfaceBody)
		{
			if (!Object.isUndefined(definition.$extends))
			{
				if (definition.$extends.definition.$type=='trait')
				{
					throw new Error('Interfaces cannot extend Traits.');
				}
				else if (definition.$extends.definition.$type=='class')
				{
					throw new Error('Interfaces cannot extend Classes.');
				}
				else
				{
					namespace[interfaceName].prototype=Object.extend(namespace[interfaceName].prototype,definition.$extends.prototype);
				}
			}
			if (!Object.isUndefined(definition.$implements))
			{
				throw new Error('Interfaces cannot implement other Interfaces. Interfaces can only extend other Interfaces.');
			}
			for (var item in interfaceBody)
			{
				if (Object.isFunction(interfaceBody[item])
				&& interfaceBody[item]!=$JSKK.Interface.METHOD)
				{
					throw new Error('Interfaces may only contain empty functions. Use $JSKK.Interface.METHOD.');
				}
				else
				{
					namespace[interfaceName].prototype[item]=interfaceBody[item];
				}
			}
		}
	},
	PROPERTY:	function(){},
	METHOD: 	function(){},
	validate: function(thisInterface)
	{
		if (Object.isUndefined(thisInterface))
		{
			throw new Error('Unable to implement interface. Interface to implement is undefined.');
		}
		else if (thisInterface.$type=='class')
		{
			throw new Error
			(
				[
					'Unable to implement interface. Interface to implement is a "$JSKK.Class".',
					' An interface must be a "$JSKK.Interface".'
				]
			);
		}
		else if (thisInterface.$type=='trait')
		{
			throw new Error
			(
				[
					'Unable to implement interface. Interface to implement is a "$JSKK.Trait".',
					' An interface must be a "$JSKK.Interface".'
				]
			);
		}
		else if (thisInterface.$type=='interface')
		{
			throw new Error('Unable to implement interface. Interface to implement is not an instance of "$JSKK.Interface".');
		}
		return true;
	},
	add: function(Class,classBody,trait,thisInterface)
	{
		for (var item in thisInterface.prototype)
		{
			if (item!='interfaceName')
			{
				if (thisInterface.prototype[item]==$JSKK.Interface.METHOD)
				{
					if (!Object.isFunction(classBody[item]) && !(trait && Object.isFunction(trait.prototype[item])))
					{
						throw new Error
						(
							[
								'The implementation of interface "'+thisInterface.prototype.interfaceName+'" requires',
								' the method "'+item+'" be implemented.'
							].join('')
						);
					}
				}
				if (Object.isAssocArray(thisInterface.prototype[item]))
				{
					Class.prototype[item]=Object.clone(thisInterface.prototype[item]);
				}
				else
				{
					Class.prototype[item]=thisInterface.prototype[item];
				}
			}
		}
	}
}