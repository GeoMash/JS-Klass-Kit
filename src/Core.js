/**
 * @class $JSKK
 * //Description
 * 
 * 
 * 
 * @author Timothy Chandler tim@zinios.com
 */
define
(
	'Core',
	[
		'./extension/Object',
		'./extension/Function',
		'./extension/Array',
		'./extension/String',
	],
	function()
	{
		var $JSKK=
		{
			version:		'1.4.0',
			emptyFunction:	function(){},
			global:			window || global || null,
			/**
			 * Use this function to create a namespace.
			 * 
			 * This function will safely create a namespace and return it for use.
			 * Use this function before adding anything to a namespaced object to assure
			 * it exists and you won't suffer data loss.
			 * 
			 * @member $JSKK
			 * @param {String} namespace A string representation of the namespace to be created.
			 * @return {Object} namespace
			 */
			namespace:(function()
			{
				var validIdentifier=/^(?:[\$a-zA-Z_]\w*[.])*[\$a-zA-Z_]\w*$/;
				function inOrderDescend(t,initialContext)
				{
					var i,N;
					if (Object.isString(t))
					{
						var context,parts;
						if (!validIdentifier.test(t))
						{
							throw new Error('"'+t+'" is not a valid name for a package.');
						}
						context	=initialContext;
						parts	=t.split('.');
						for (var i=0,N=parts.length;i<N;i++)
						{
							t			=parts[i];
							context[t]	=context[t] || {};
							context		=context[t];
						}
						return context;
					}
					else
					{
						console.trace();
						throw new TypeError();
					}
				}
				return function(spec,context)
				{
					return inOrderDescend(spec, context||$JSKK.global);	
				};
			})(),
			/**
			 * Imports packages into a localized scope.
			 * 
			 * This function simulates packages by allowing you to import a packages
			 * into a localized scope. This can also be thought of as importing
			 * a set of namespaces which can then be aliased (maintaining reference)
			 * in the localized scope.
			 * 
			 * @member $JSKK
			 * @param {Mixed} arguments Accepts unlimited arguments to be imported.
			 * @return {Function} Function which accepts another function to act as the locaized scope.
			 */
			usingPackage: function()
			{
				var args=arguments;
				return function(inner){return inner.apply(args[0],args);};
			},
			toArray: function(iterable)
			{
				if (!iterable)return [];
				if (!(typeof iterable=='function'&& iterable=='[object NodeList]')
				&& iterable.toArray)
				{
					return iterable.toArray();
				}
				var	length	=iterable.length || 0,
					results	=new Array(length);
				while (length--)results[length]=iterable[length];
				return results;
			},
			strToObject: function(string)
			{
				var	obj		=$JSKK.global,
					parts	=string.split('.');
				
				for (var i=0,j=parts.length; i<j; i++)
				{
					if (Object.isDefined(obj[parts[i]]))
					{
						obj=obj[parts[i]];
					}
					else
					{
						throw new Error('Invalid string to object. Object "'+string+'" has not been loaded.');
					}
				}
				return obj;
			},
			require: function(requires,callback)
			{
				if (Object.isDefined(requires))
				{
					var formattedRequires=[];
					if (!Object.isArray(requires))
					{
						requires=[requires];
					}
					for (var i=0,j=requires.length; i<j; i++)
					{
						if (Object.isString(requires[i]))
						{
							try
							{
								$JSKK.strToObject(requires[i]);
							}
							catch (e)
							{
								formattedRequires.push(requires[i].replace(/\./g,'/'));
							}
						}
						else
						{
							throw new Error('Object literal "'+requires[i]+'" used in require. Only use strings.');
						}
						// console.info('Requiring "'+requires[i]+'".');
					}
					var check=function(requires)
					{
						for (var i=0,j=requires.length; i<j; i++)
						{
							try
							{
								var obj=$JSKK.strToObject(requires[i]);
								// console.debug(requires[i],obj.definition);
								if (Object.isUndefined(obj.prototype.$reflect))
								{
									// console.debug(requires[i]+' is not ready... waiting... 2');
									window.setTimeout(check,50);
									return;
								}
							}
							catch (e)
							{
								// console.debug(requires[i]+' is not ready... waiting... 1');
								window.setTimeout(check,50);
								return;
							}
						}
						// console.debug('all requires ready!!!');
						callback();
					}.bind(this,requires);
					//Don't do this if webpack is running as everything is already loaded!!!
					if (formattedRequires.length && Object.isUndefined(__webpack_require__))
					{
						//Small hack to trick webpack into not throwing a warning.
						var __REQUIRE__='require';
						$JSKK.global[__REQUIRE__](formattedRequires,check);
					}
					else
					{
						callback();
					}
				}
			}
		}
		if (Object.isDefined(window))
		{
			$JSKK.global.$JSKK=$JSKK;
		}
		else
		{
			exports.$JSKK=$JSKK;
		}
		if (Object.isUndefined($JSKK.global.console))
		{
			$JSKK.global.console=
			{
				log:	$JSKK.emptyFunction,
				debug:	$JSKK.emptyFunction,
				warn:	$JSKK.emptyFunction,
				info:	$JSKK.emptyFunction,
				trace:	$JSKK.emptyFunction
			}
		}
		else if (Object.isUndefined($JSKK.global.console.debug))
		{
			$JSKK.global.console.debug=$JSKK.global.console.log;
		}
		//Small hack to make "requireless" environments work. Only supports webpack for now.
		if (Object.isDefined(__webpack_require__))
		{
				window.require=function JSKKRequireless(modules,callback)
				{
						callback();
				}
		}
		return $JSKK;
	}
);