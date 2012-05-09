/**
 * 
 * 
 */
$JSKK.Class=
{
	/**
	 * Creates a new class.
	 * 
	 * 
	 * 
	 * @memberOf $JSKK.Class
	 * @param {Object,String} [definition] Definition object which takes up to four parameters.
	 * $namespace - Defines the namespace which the class will be created in.
	 * $name - Defines the name of the class. This will be created within the specified namespace.
	 * $interfaces - Defines a single or an array of interfaces in which the class must conform to.
	 * $traits - Defines a single or an array of traits which the class will have.
	 * @return {Function} Returns a function which consumes the class body.
	 */
	create: function(definition)
	{
		if (typeof definition=='string')
		{
			var	namespace	=window,
				className	=definition,
				def			={};
			
			def.$name		=definition;
			def.$namespace	='window';
			definition		=def;
		}
		else
		{
			if (Object.isUndefined(definition.$name))
			{
				throw Error('Class name must be defined.');
			}
			else
			{
				var className=definition.$name;
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
		definition.$type='class';
		
		//When a new instance of the class is created, this is where it all begins.
		namespace[className]=function()
		{
			if (definition.$abstract)
			{
				throw '"'+className+'" is an abstract class and cannot be directly initiated.';
			}
			//The first and most important thing to do is to make a clone of the class prototype.
			var prototype=Object.clone(namespace[className].prototype);
			
			//Make arguments easier to work with.
			var args=$JSKK.toArray(arguments);
			//Handle trait related initiation functionality.
			if (namespace[className].prototype.__behaviors.length)
			{
				for (var i=0,j=namespace[className].prototype.__behaviors.length; i<j; i++)
				{
					var thisArg=args.shift();
					namespace[className].prototype.__behaviors[i].call(this,thisArg);
				}
			}
			//Now restore the class prototype back to its original form.
			namespace[className].prototype=prototype;
			//Private Extension Functions
			var processExtensions=function(scope,definition)
			{
				var doNextExtend=function(scope,object,$parent,extension,args)
				{
					//Save the old $parent in a temp var.
					var tmp=scope[object].$parent;
					//Now override this method with a new one.
					//- This is done so that IF this method calls ITS parent method, it won't recusively call the same method.
					scope[object].$parent=(function(scope,$parent)
					{
						return function()
						{
							var ret=null;
							if (!Object.isUndefined(extension.definition.$extends))
							{
								var ext			=extension.definition.$extends,
									gotExtension=false;
								while (1)
								{
									if (Object.isFunction(ext.prototype[object])
									&& scope[object]!==ext.prototype[object])
									{
										gotExtension=true;
										ret=doNextExtend(scope,object,$parent,ext,arguments);
										break;
									}
									else if (!Object.isUndefined(ext.definition.$extends))
									{
										ext=ext.definition.$extends;
									}
									else
									{
										break;
									}
								}
							}
							if (!gotExtension)
							{
								ret=$parent.apply(scope,arguments);
							}
							return ret;
						}
					})(scope,extension.prototype[object]);
					var ret=$parent.apply(scope,args);
					//Restore the old $parent method.
					scope[object].$parent=tmp;
					return ret;
				}
				var doExtend=function(scope,object,extension)
				{
					var func=scope[object];
					scope[object]=function()
					{
						//Setup this method's parent.
						scope[object].$parent=(function(scope,$parent)//$parent=Parent method that needs to be called.
						{
							//Returns a function which returns that result of the $parent method after being called with the correct scope.
							return function()
							{
								var ret=null;
								//If this parent method has a parent, it too needs to be setup. - This should be recusive from here on out.
								if (!Object.isUndefined(extension.definition.$extends))
								{
									var ext			=extension.definition.$extends,
										gotExtension=false;
									while (1)
									{
										if (Object.isFunction(ext.prototype[object])
										&& scope[object]!==ext.prototype[object])
										{
											gotExtension=true;
											ret=doNextExtend(scope,object,$parent,ext,arguments);
											break;
										}
										else if (!Object.isUndefined(ext.definition.$extends))
										{
											ext=ext.definition.$extends;
										}
										else
										{
											break;
										}
									}
								}
								if (!gotExtension)
								{
									ret=$parent.apply(scope,arguments);
								}
								return ret;
							}
						})(scope,extension.prototype[object]);
						//Execute this method.
						return func.apply(scope,arguments);
					}
				}
				if (!Object.isUndefined(definition.$extends))
				{
					for (object in definition.$extends.prototype)
					{
						//Immidiate Parents.
						if (Object.isFunction(scope[object])
						&& Object.isFunction(definition.$extends.prototype[object])
						&& scope[object]!==definition.$extends.prototype[object])
						{
							doExtend(scope,object,definition.$extends);
						}
						//
						else if (Object.isFunction(scope[object]))
						{
							var extension=definition.$extends;
							while (1)
							{
								if (Object.isFunction(extension.prototype[object])
								&& scope[object]!==extension.prototype[object])
								{
									doExtend(scope,object,extension);
									break;
								}
								else if (!Object.isUndefined(extension.definition.$extends))
								{
									extension=extension.definition.$extends;
								}
								else
								{
									break;
								}
							}
						}
					}
				}
			}
			if (!Object.isUndefined(namespace[className].definition.$extends))
			{
				processExtensions(this,namespace[className].definition);
			}
			delete processExtensions;
			//Finally, initiate the class.
			if (Object.isFunction(this.init))
			{
				this.init.apply(this,args);
			}
		};
		return function(classStatics,classBody)
		{
			//Do the extending first, because the new class body and traits will overwrite existing methods and properties.
			if (Object.isDefined(definition.$extends))
			{
				if (Object.isUndefined(definition.$extends))
				{
					throw new Error('Unable to extend class. Class to extend from is undefined.');
				}
				else if (definition.$extends.definition.$type=='interface')
				{
					throw new Error('Unable to extend class from interface. Use $implements followed by interface.');
				}
				else if (definition.$extends.definition.$type=='trait')
				{
					throw new Error('Unable to extend class from trait. Use $uses followed by the trait or an array of traits.');
				}
				else if (!Object.isFunction(definition.$extends.prototype.$reflect))
				{
					throw new Error('Unable to extend class. Class to extend from is not an instance of "$JSKK.Class".');
				}
				else if (Object.isDefined(definition.$extends.definition.$final) && definition.$extends.definition.$final)
				{
					throw new Error('Unable to extend class. Class to extend from is declared as final.');
				}
				else
				{
					namespace[className].prototype=Object.extend(namespace[className].prototype,definition.$extends.prototype);
				}
			}
			
			//Normalize the traits before adding them so that the normalized
			//trait can be used to validate any interfaces.
			var normalizedTrait=false;
			if (!Object.isArray(namespace[className].prototype.__behaviors))namespace[className].prototype.__behaviors=[];
			if (!Object.isUndefined(definition.$uses))
			{
				if (!Object.isArray(definition.$uses))definition.$uses=[definition.$uses];
				normalizedTrait=$JSKK.Trait.normalize(definition.$uses);
				for (var i=0,j=definition.$uses.length; i<j; i++)
				{
					if (Object.isFunction(definition.$uses[i]) && Object.isFunction(definition.$uses[i].prototype.init))
					{
						namespace[className].prototype.__behaviors.push(definition.$uses[i].prototype.init);
					}
				}
				if (!Object.isArray(definition.$uses))definition.$uses=[definition.$uses];
			}
			//Handle implementation of interfaces.
			if (!Object.isUndefined(definition.$implements))
			{
				if (!Object.isArray(definition.$implements))definition.$implements=[definition.$implements];
				for (var i=0,j=definition.$implements.length; i<j; i++)
				{
					if ($JSKK.Interface.validate(definition.$implements[i]))
					{
						$JSKK.Interface.add(namespace[className],classBody,normalizedTrait,definition.$implements[i]);
					}
				}
			}
			//Handle adding traits.
			if (!Object.isUndefined(definition.$uses))
			{
				if ($JSKK.Trait.validate(normalizedTrait))
				{
					$JSKK.Trait.add(namespace[className],normalizedTrait);
				}
			}
			delete normalizedTrait;
			
			//Create a reflection method.
			namespace[className].prototype.$reflect=function(what)
			{
				switch (what)
				{
					case 'type':		return definition.$type;
					case 'namespace':	return definition.$namespace;
					case 'name':		return definition.$name;
					case 'extends':		return definition.$extends;
					case 'implements':	return definition.$implements;
					case 'uses':		return definition.$uses;
					case 'abstract':	return definition.$abstract	|| false;
					case 'final':		return definition.$final	|| false;
					case 'self':		return namespace[className];
				}
			}
			
			//Add the static stuff to the class.
			for (var item in classStatics)
			{
				namespace[className][item]=Object.clone(classStatics[item]);
			}
			
			//Now apply the new class items.
			for (var item in classBody)
			{
				if (Object.isFunction(classBody[item]))
				{
					if (classBody[item]===$JSKK.Class.ABSTRACT_METHOD)
					{
						if (!definition.$abstract)
						{
							throw '"'+className+'" contains one or more abstract methods and must be declared as abstract.';
						}
						else
						{
							namespace[className].prototype[item]=Object.clone(classBody[item]);
						}
					}
					if (Object.isFunction(namespace[className].prototype[item]))
					{
						var tmp=namespace[className].prototype[item];
						namespace[className].prototype[item]=classBody[item];
						namespace[className].prototype[item].$parent=tmp;
					}
					//TODO: Clean up this duplacated code.
					else
					{
						if (Object.isAssocArray(classBody[item]))
						{
							namespace[className].prototype[item]=Object.clone(classBody[item]);
						}
						else
						{
							namespace[className].prototype[item]=classBody[item];
						}
					}
				}
				else
				{
					if (Object.isAssocArray(classBody[item]))
					{
						namespace[className].prototype[item]=Object.clone(classBody[item]);
					}
					else
					{
						namespace[className].prototype[item]=classBody[item];
					}
				}
			}
			for (item in namespace[className].prototype)
			{
				if (Object.isFunction(namespace[className].prototype[item])
				&& namespace[className].prototype[item]===$JSKK.Class.ABSTRACT_METHOD
				&& !definition.$abstract)
				{
					throw [
						'"'+item+'" is an abstract method and so must either be defined or the class ',
						' "'+className+'" must be declared as abstract by defining',
						' $abstract:true in the class definition.'
					].join('')
				}
			}
			namespace[className].toString=function()
			{
				return '[JSKK Class ('+definition.$namespace+'.'+definition.$name+')]';
			}
			namespace[className].definition=definition;
		}
	},
	ABSTRACT_METHOD: function(){}
}