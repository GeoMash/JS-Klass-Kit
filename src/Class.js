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
		var def={};
		if (typeof definition=='string')
		{
			var	namespace	=$JSKK.global,
				className	=definition;
			
			def.$name		=definition;
			def.$namespace	=(window)?'window':'global';
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
					def.$namespace	=(window)?'window':'global';
					var namespace	=$JSKK.global;
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
			//Private Extension Functions
			var processExtensions=function(scope,definition)
			{
				var doNextExtend=function(scope,object,$parent,extension,args)
				{
					//THIS WILL HANDLE PARENT METHOD CALLS - eg: this.init.$parent()
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
				}//end doNextExtend
				
				
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
				}//end doExtend
				
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
			//Make arguments easier to work with.
			var init=function(args)
			{
				if (Object.isUndefined(namespace[className].definition))
				{
					window.setTimeout(init,200);
				}
				else
				{
					if (definition.$abstract)
					{
						throw '"'+className+'" is an abstract class and cannot be directly initiated.';
					}
					//The first and most important thing to do is to make a clone of the class prototype.
					var prototype=Object.clone(namespace[className].prototype);
					
					//Handle trait related initiation functionality.
					if (Object.isDefined(namespace[className].prototype.__behaviors)
					&& namespace[className].prototype.__behaviors.length)
					{
						for (var i=0,j=namespace[className].prototype.__behaviors.length; i<j; i++)
						{
							var thisArg=args.shift();
							namespace[className].prototype.__behaviors[i].call(this,thisArg);
						}
					}
					//Now restore the class prototype back to its original form.
					namespace[className].prototype=prototype;
					
					if (!Object.isUndefined(namespace[className].definition.$extends))
					{
						processExtensions(this,namespace[className].definition);
					}
					//Finally, initiate the class.
					if (Object.isFunction(this.init))
					{
						this.init.apply(this,args);
					}
				}
			}.bind(this,$JSKK.toArray(arguments))
			init();
		};
		return function(classStatics,classBody)
		{
			var exec=function(namespace,classStatics,classBody)
			{
				//Do the extending first, because the new class body and traits will overwrite existing methods and properties.
				if (Object.isDefined(this.$extends))
				{
					if (Object.isUndefined(this.$extends.definition))
					{
						window.setTimeout
						(
							exec.bind(this,namespace,classStatics,classBody),
							200
						);
						return;
					}
					if (this.$extends.definition.$type=='interface')
					{
						throw new Error('Unable to extend class from interface. Use $implements followed by interface.');
					}
					else if (this.$extends.definition.$type=='trait')
					{
						throw new Error('Unable to extend class from trait. Use $uses followed by the trait or an array of traits.');
					}
					else if (!Object.isFunction(this.$extends.prototype.$reflect))
					{
						throw new Error('Unable to extend class. Class to extend from is not an instance of "$JSKK.Class".');
					}
					else if (Object.isDefined(this.$extends.definition.$final) && this.$extends.definition.$final)
					{
						throw new Error('Unable to extend class. Class to extend from is declared as final.');
					}
					else
					{
						for (var prop in this.$extends)
						{
							if (this.$extends.definition.$statics.methods.inArray(prop)
							|| this.$extends.definition.$statics.properties.inArray(prop))
							{
								namespace[className][prop]=this.$extends[prop];
							}
						}
						this.$statics=Object.extend(this.$statics,this.$extends.definition.$statics);
						namespace[className].prototype=Object.extend(namespace[className].prototype,this.$extends.prototype);
					}
				}
				if (Object.isUndefined(namespace[className].prototype))
				{
					namespace[className].prototype={};
				}
				//Normalize the traits before adding them so that the normalized
				//trait can be used to validate any interfaces.
				var normalizedTrait=false;
				if (!Object.isArray(namespace[className].prototype.__behaviors))
				{
					namespace[className].prototype.__behaviors=[];
				}
				if (!Object.isUndefined(this.$uses))
				{
					normalizedTrait=$JSKK.Trait.normalize(this.$uses);
					for (var i=0,j=this.$uses.length; i<j; i++)
					{
						if (Object.isFunction(this.$uses[i]) && Object.isFunction(this.$uses[i].prototype.init))
						{
							namespace[className].prototype.__behaviors.push(this.$uses[i].prototype.init);
						}
					}
					if (!Object.isArray(this.$uses))this.$uses=[this.$uses];
				}
				//Handle implementation of interfaces.
				if (!Object.isUndefined(this.$implements))
				{
					if (!Object.isArray(this.$implements))this.$implements=[this.$implements];
					for (var i=0,j=this.$implements.length; i<j; i++)
					{
						if (Object.isDefined(this.$implements[i]))
						{
							if (Object.isString(this.$implements[i]))
							{
								this.$implements[i]=$JSKK.strToObject(this.$implements[i]);
							}
							else
							{
								console.warn('Using object literals is deprecated as of JSKK v1.1 and will be disabled in v1.2. Please use strings instead.');
							}
						}
						if ($JSKK.Interface.validate(this.$implements[i]))
						{
							$JSKK.Interface.add(namespace[className],classBody,normalizedTrait,this.$implements[i]);
						}
					}
				}
				//Handle adding traits.
				if (!Object.isUndefined(this.$uses))
				{
					if ($JSKK.Trait.validate(normalizedTrait))
					{
						$JSKK.Trait.add(namespace[className],normalizedTrait);
					}
				}
				
				//Create a reflection method.
				namespace[className].prototype.$reflect=function(what)
				{
					switch (what)
					{
						case 'type':		return this.$type;
						case 'namespace':	return this.$namespace;
						case 'name':		return this.$name;
						case 'extends':		return this.$extends;
						case 'implements':	return this.$implements;
						case 'uses':		return this.$uses;
						case 'abstract':	return this.$abstract	|| false;
						case 'final':		return this.$final		|| false;
						case 'requires':	return this.$requires	|| false;
						case 'self':		return namespace[className];
					}
				}.bind(this)
				
				//Add the static stuff to the class.
				if (Object.isUndefined(this.$statics))
				{
					this.$statics={properties:[],methods:[]};
				}
				for (var item in classStatics)
				{
					if (Object.isFunction(classStatics[item]))
					{
						this.$statics.methods.push(item);
					}
					else
					{
						this.$statics.properties.push(item);
					}
					namespace[className][item]=Object.clone(classStatics[item]);
				}
				
				//Now apply the new class items.
				for (var item in classBody)
				{
					if (Object.isFunction(classBody[item]))
					{
						if (classBody[item]===$JSKK.Class.ABSTRACT_METHOD)
						{
							if (!this.$abstract)
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
					&& !this.$abstract)
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
					return '[JSKK Class ('+this.$namespace+'.'+this.$name+')]';
				}.bind(this)
				namespace[className].definition=this;
			}//end exec
			
			if (!Object.isArray(definition.$requires))
			{
				if (Object.isDefined(definition.$requires))
				{
					definition.$requires=[definition.$requires];
				}
				else
				{
					definition.$requires=[];
				}
			}
			
			// $JSKK.require
			// (
			// 	definition.$requires,
			// 	exec.bind(definition,namespace,classStatics,classBody)
			// );
			var readyRequiresAndExec=function()
			{
				//Extends SHOULD be ready at this stage.
				if (Object.isDefined(definition.$extends))
				{
					if (Object.isString(definition.$extends))
					{
						definition.$extends=$JSKK.strToObject(definition.$extends);
					}
					else
					{
						console.warn('The use of object literals is deprecated in JSKK 1.1. Use strings instead.');
					}
				}
				if (Object.isDefined(definition.$uses))
				{
					if (!Object.isArray(definition.$uses))
					{
						definition.$uses=[definition.$uses];
					}
					definition.$requires=definition.$requires.concat(definition.$uses);
				}
				if (Object.isDefined(definition.$implements))
				{
					if (!Object.isArray(definition.$implements))
					{
						definition.$implements=[definition.$implements];
					}
					definition.$requires=definition.$requires.concat(definition.$uses);
				}
				if (Object.isDefined(definition.$requires) && definition.$requires.length)
				{
					$JSKK.require
					(
						definition.$requires,
						exec.bind(definition,namespace,classStatics,classBody)
					);
				}
				else
				{
					exec.bind(definition)(namespace,classStatics,classBody);
				}
			}.bind(this)
			
			
			if (Object.isDefined(definition.$extends))
			{
				$JSKK.require
				(
					[definition.$extends],
					readyRequiresAndExec
				);
			}
			else
			{
				readyRequiresAndExec();
			}
		}
	},
	ABSTRACT_METHOD: function(){}
}