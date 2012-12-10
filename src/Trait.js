$JSKK.Trait=
{
	create: function(definition)
	{
		if (typeof definition=='string')
		{
			var	namespace		=window,
				traitName		=definition,
				def				={};
			
			def.$name		=definition;
			def.$namespace	='window';
			definition		=def;
		}
		else
		{
			if (typeof definition.$name=='undefined')
			{
				throw Error('Trait name must be defined.');
			}
			else
			{
				var traitName=definition.$name;
				if (typeof definition.$namespace=='undefined')
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
		namespace[traitName]=function()
		{
			throw [
				'Trait "'+traitName+'" cannot be initiated because traits',
				' are abstract classes which cannot be directly initiated.'
			].join('');
		}
		//Set the class type.
		definition.$type='trait';
		
		//Create a reflection method.
		namespace[traitName].prototype.$reflect=function(what)
		{
			switch (what)
			{
				case 'type':		return definition.$type;
				case 'namespace':	return definition.$namespace;
				case 'name':		return definition.$name;
				case 'extends':		return definition.$extends;
				case 'implements':	return definition.$implements;
				case 'uses':		return definition.$uses;
			}
		}
		return function(traitBody)
		{
			//Normalize the traits before adding them so that the normalized 
			//trait can be used to validate any interfaces.
			var normalizedTrait=false;
			if (!Object.isUndefined(definition.$uses))
			{
				if (!Object.isArray(definition.$uses))definition.$uses=[definition.$uses];
				normalizedTrait=$JSKK.Trait.normalize(definition.$uses,true);
			}
			//Handle implementation of interfaces.
			if (!Object.isUndefined(definition.$implements))
			{
				if (!Object.isArray(definition.$implements))definition.$implements=[definition.$implements];
				for (var i=0,j=definition.$implements.length; i<j; i++)
				{
					if ($JSKK.Interface.validate(definition.$implements[i]))
					{
						$JSKK.Interface.add(namespace[traitName],traitBody,normalizedTrait,definition.$implements[i]);
					}
				}
			}
			//Handle adding traits.
			if (!Object.isUndefined(definition.$uses))
			{
				if ($JSKK.Trait.validate(normalizedTrait))
				{
					$JSKK.Trait.add(namespace[traitName],normalizedTrait);
				}
			}
			
			for (var item in traitBody)
			{
				if (typeof traitBody[item]!='function')
				{
					throw new Error('A trait may only contain methods.');
				}
				else
				{
					namespace[traitName].prototype[item]=traitBody[item];
				}
			}
		}
	},
	normalize: function(traits,preserveInit)
	{
		//If traits is not an array, make it one so its easier to deal with.
		if (!Object.isArray(traits))traits=[traits];
		//Pluck out the conflict resultion object if present.
		var conflictResolutions={};
		if (!Object.isFunction(traits[traits.length-1]))
		{
			conflictResolutions=traits[traits.length-1];
			delete traits[traits.length-1];
		}
		//Now loop through each trait and see if there are any conflicts.
		var normalizedTrait					=function(){};
		normalizedTrait.prototype.traitName	='Normalized';
		var methods							=[];
		var resolved						=[];
		for (var i=0,j=traits.length; i<j; i++)
		{
			if (Object.isFunction(traits[i]))
			{
				//Loop through each method in this trait.
				for (var method in traits[i].prototype)
				{
					//We only want to deal with methods.
					if (!Object.isFunction(traits[i].prototype[method]))	continue;
					//Skip init if present and preserveInit=false.
					if (method=='init' && !preserveInit)					continue;
					//If the method is not in the metods array, all is well.
					if (!methods.inArray(method))
					{
						//Add the method name to the methods array.
						methods.push(method);
						//Add the method it to the normalized trait.
						normalizedTrait.prototype[method]=traits[i].prototype[method];
					}
					//However if a method IS in the methods array, then we need to check for a resolution.
					else
					{
						//This check assures that conflicts are only delt with once.
						if (!resolved.inArray(method))
						{
							//If there is no conflict resolution defined for this method,
							// delete the method from the normalized trait but NOT from the methods array.
							if (Object.isUndefined(conflictResolutions[method]))
							{
								delete normalizedTrait.prototype[method];
							}
							//Else we replace the method in the normalized trait with the resolved one.
							else
							{
								normalizedTrait.prototype[method]=conflictResolutions[method].prototype[method];
							}
							//Mark this conflict as resolved.
							resolved.push(method);
						}
					}
				}
			}
		}
		return normalizedTrait;
	},
	validate: function(thisTrait)
	{
		if (Object.isUndefined(thisTrait))
		{
			throw new Error('Unable to add trait. Trait to add is undefined.');
		}
		else if (!Object.isUndefined(thisTrait.prototype.className))
		{
			throw new Error
			(
				[
					'Unable to add trait. Trait to add is an instance of "$JSKK.Class".',
					' A trait must be an instance of "$JSKK.Trait".'
				]
			);
		}
		else if (!Object.isUndefined(thisTrait.prototype.instanceName))
		{
			throw new Error
			(
				[
					'Unable to add trait. Trait to add is an instance of "$JSKK.Interface".',
					' A trait must be an instance of "$JSKK.Trait".'
				]
			);
		}
		else if (Object.isUndefined(thisTrait.prototype.traitName))
		{
			throw new Error('Unable to add trait. Trait to add is not an instance of "$JSKK.Trait".');
		}
		return true;
	},
	add: function(Class,thisTrait)
	{
		for (var item in thisTrait.prototype)
		{
			if (item!='traitName')
			{
				if (!Object.isFunction(thisTrait.prototype[item]))
				{
					throw new Error
					(
						
						[
							'Attempt to add trait to class instance failed because trait contained an entity that was not a method.',
							' Traits may only contain methods.'
						].join('')
					);
				}
				Class.prototype[item]=thisTrait.prototype[item];
			}
		}
	}
}