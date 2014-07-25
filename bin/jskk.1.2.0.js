/**
 * Deeply extends or merges one object into another object.
 * Note that this function will in most cases copy the properties,
 * so references will be lost.
 * @member Object
 * @param {Object} destination Destination variable to extend or merge into.
 * @param {Object} source Source object to extend or merge from.
 * @return {Object} destination
 */
Object.extend=function(destination,source)
{
	if (Object.isAssocArray(source))
	{
		if (destination==null || Object.isUndefined(destination))destination={};
		for (var property in source)
		{
			//If the source is null, simply set it to null.
			if (Object.isNull(source[property]))
			{
				destination[property]=null;
			}
			//If the source is an object, we need to extend down into it.
			else if (Object.isAssocArray(source[property]))
			{
				//Force the destination to be an object if it isn't already one.
				if (!Object.isAssocArray(destination[property]))
				{
					destination[property]={};
				}
				destination[property]=Object.extend(destination[property],source[property]);
			}
			//If the source is an array, we need to extend down into it.
			else if (Object.isArray(source[property]))
			{
				destination[property]=Object.extend(destination[property],source[property]);
			}
			//For everything else, do a direct set which will remove the reference.
			else
			{
				destination[property]=source[property];
			}
		}
	}
	else if (Object.isArray(source))
	{
		if (!Object.isArray(destination))destination=[];
		for (var i=0,j=source.length; i<j; i++)
		{
			destination[i]=Object.extend(destination[i],source[i]);
		}
	}
	else
	{
		destination=source;
	}
	return destination;
};
/**
 * Clones an object, returning a new object containing
 * a copy of everything the source object had.
 * @member Object
 * @param {Object} The source object which will be cloned.
 * @return {Object} The cloned source.
 */
Object.clone=			function(source)
{
	var clone={};
	clone=Object.extend(clone,source);
	return clone;
}
/**
 * Checks if the given object is undefined.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isUndefined=		function(object)
{
	return typeof object=='undefined';
}
/**
 * Checks if the given object is defined.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isDefined=		function(object)
{
	return typeof object!='undefined';
}
/**
 * Checks if the given object is a function.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {BObjectlean}
 */
Object.isFunction=		function(object)
{
	return typeof object=='function';
}
/**
 * Checks if the given object is a string.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {BObjectlean}
 */
Object.isString=		function(object)
{
	return typeof object=='string';
}
/**
 * Checks if the given object is a number.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isNumber=		function(object)
{
	return typeof object=='number';
}
/**
 * Checks if the given object is numeric.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isNumeric=		function(object)
{
	return 	object!==null	&& typeof object!='boolean'
							&& Object.prototype.toString.call(object)!=='[object Array]'
							&& !isNaN(Number(object));
}
/**
 * Checks if the given object is a DOM element.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isElement=		function(object)
{
	return object && object.nodeType==1;
}
/**
 * Checks if the given object is an array.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 * @credit http://thinkweb2.com/projects/prototype/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
 */
Object.isArray=			function(object)
{
	return Object.prototype.toString.call(object)==='[object Array]';
}
/**
 * Checks if the given object is a date.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 * @credit http://thinkweb2.com/projects/prototype/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
 */
Object.isDate=			function(object)
{
	return Object.prototype.toString.call(object)==='[object Date]';
}
/**
 * Checks if the given object is null.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isNull=			function(object)
{
	return object===null;
}
/**
 * Checks if the given object is an associative array.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isAssocArray=	function(object)
{
	if (object===null)return false;
	return Object.prototype.toString.call(object)==='[object Object]';
}
/**
 * Checks if the given object is a boolean value.
 * @member Object
 * @param {Object} The object to be checked.
 * @return {Boolean}
 */
Object.isBoolean=		function(object)
{
	return typeof object=='boolean';
}
/**
 * Checks if the given object is considered an empty value.
 * 
 * Empty values include:
 * '' - An empty String.
 * ' ' - A string with only one or more spaces.
 * 0 - As an Integer.
 * '0' - As a String.
 * [] - An empty array.
 * null
 * false
 * undefined
 * 
 * In Strict Mode, these values are also included:
 * \t - A tab character.
 * \v - A vertical tab.
 * \s - any white space character, including space, tab, form feed, line feed and other unicode spaces.
 * Also included in strict mode are the previous values, mixed in
 * with the non-strict values (where applicable).
 * @member Object
 * @param {Object} The object to be checked.
 * @param {Boolean} True for strict mode. Defaults to false.
 * @return {Boolean}
 */
Object.isEmpty=		function(object,strict)
{
	if (!object
	|| Object.isUndefined(object)
	|| Object.isNull(object)
	|| (Object.isArray(object) && object.length===0)
	|| (Object.isString(object) && (object.trim()==='' || object==='0'))
	|| (Object.isNumber(object && object===0)))
	{
		return true;
	}
	else if (strict && /^(\t*)|(\v*)|(\s*)$/.test(object))
	{
		return true;
	}
	return false;
}

/**
 * Converts the given object to a URL Encoded query string.
 * @member Object
 * @param {Object} The object to be converted.
 * @return {String} queryString
 */
Object.toQueryString=	function(object)
{
	if (this.isString(object))
	{
		return object;
	}
	var queryString='';
	for (var property in object)
	{
		if (!this.isFunction(object[property]) && typeof object[property]!='object')
		{
			queryString+=encodeURIComponent(property)+'='+encodeURIComponent(object[property])+'&';
		}
	}
	return queryString;
}
/**
 * Converts the given object to an Array, ignoring existing keys.
 * 
 * @member Object
 * @param {Object} The object to be converted.
 * @return {Array} The returned array.
 */
Object.toIndexedArray=function(object)
{
	var ret=[];
	for (var item in object)
	{
		ret.push(object[item]);
	}
	return ret;
}
/**
 * Converts the given object to an Array.
 * 
 * @member Object
 * @param {Object} The object to be converted.
 * @return {Array} The returned array.
 */
Object.toArray=function(object)
{
	if (Object.isArray(object))return object;
	if (Object.isString(object))
	{
		return object.split('');
	}
	else if (Object.isNumber(object))
	{
		return [object];
	}
	else if (Object.isAssocArray(object))
	{
		var ret=[];
		if (Object.isIndexed(object))
		{
			for (item in object)
			{
				if (Object.isNumber(item))
				{
					ret[item]=object[item];
				}
			}
		}
		else
		{
			var index=-1;
			for (item in object)
			{
				index++;
				if (Object.isNumber(item))
				{
					if (Object.isDefined(ret[index]))
					{
						var next=(index+1);
						ret[next]=ret[index];
						ret[index]=object[item];
						index++;
						continue;
					}
				}
				ret[index]=object[item];
			}
		}
		return ret;
	}
	return [object];
}
/**
 * Checks to see if the object is indexed like an array.
 * 
 * @member Object
 * @param {Object} The object to checked.
 * @return {Boolean} true if it is indexed, false if it is not.
 */
Object.isIndexed=function(object)
{
	if (Object.isAssocArray(object))
	{
		var oneItem=false;
		for (var item in object)
		{
			oneItem=true;
			if (!Object.isNumeric(item))
			{
				return false;
			}
		}
		return oneItem;
	}
	return false;
}
/**
 * If the object is undefined, it will set and return the object with 'or'. 
 * 
 * @member Object
 * @param {Object} The object to checked.
 * @param {Mixed} The value the object is set to if it is undefined.
 * @return {Mixed} The original value if it was defined, the new value if it was undefined or null if no default was defined.
 */
Object.ifSetOr=function(object,or)
{
	return Object.isDefined(object)?object:or || null;
}
Object.isEqual=function(object1,object2)
{
	var i;
	if (typeof(object1)!=typeof(object2))
	{
		return false;
	}
	for (i in object1)
	{
		if (typeof(object2[i])=='undefined')
		{
			return false;
		}
	}
	for(i in object1)
	{
		if (object1[i])
		{
			switch(typeof(object1[i]))
			{
				case 'object':
				{
					if (!Object.isEqual(object1[i],object2[i]))
					{
						return false;
					}
					break;
				}
				case 'function':
				{
					if (typeof(object2[i])=='undefined' || object1[i].toString()!=object2[i].toString())
					{
						return false;
					}
					break;
				}
				default:
				{
					if (object1[i]!=object2[i])
					{
						return false;
					}
				}
			}
		}
		else
		{
			if (object2[i])return false;
		}
	}
	for(i in object2)
	{
		if (typeof(object1[i])=='undefined')
		{
			return false;
		}
	}
	return true;
}
define('extension/Object', [],function(){});
Object.extend
(
	Function.prototype,
	{
		/**
		 * Binds a function to a new scope and returns that function.
		 * 
		 * @param {Object, Function} [arguments]
		 * @param {Mixed} arguments Parameters to bind after scope. Will map to arguments.
		 * @return {Function} Function with new scope.
		 */
		bind: function()
		{
			if (arguments.length<2 && typeof arguments[0]=='undefined')return this;
			var	method	=this,
				args	=$JSKK.toArray(arguments),
				object	=args.shift();
			return function()
			{
				return method.apply(object,args.concat($JSKK.toArray(arguments)));
			}
		},
		curry: function()
		{
			if (!arguments.length)return this;
			var	__method=this,
			args=$JSKK.toArray(arguments);
			return function()
			{
				return __method.apply(this, args.concat($JSKK.toArray(arguments)));
			}
		},
		intercept: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$JSKK.toArray(arguments),
				interceptor	=args.shift();
			return function()
			{
				interceptor.apply(this,args.concat($JSKK.toArray(arguments)));
				return method.apply(this,args.concat($JSKK.toArray(arguments)));
			}
		},
		join: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$JSKK.toArray(arguments),
				joined		=args.shift();
			return function()
			{
				method.apply(this,args.concat($JSKK.toArray(arguments)));
				return joined.apply(this,args.concat($JSKK.toArray(arguments)));
			}
		},
		sequencedJoin: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$JSKK.toArray(arguments),
				joined		=args.shift();
			return function()
			{
				var ret=method.apply(this,args.concat($JSKK.toArray(arguments)));
				if (Object.isNull(ret))return null;
				if (Object.isAssocArray(ret) && Object.isDefined(ret.args))
				{
					return joined.apply(this,ret.args);
				}
				return joined.call(this,ret);
			}
		},
		defer: function()
		{
			var method	=this,
				xargs	=$JSKK.toArray(arguments),
				time	=xargs.shift(),
				scope	=xargs.shift(),
				args	=xargs.shift();
				if (!Object.isArray(args))args=[args];
			window.setTimeout
			(
				function()
				{
					method.apply(scope,args);
				},
				time
			);
		},
		delay: function()
		{
			arguments[0]=arguments[0]*1000;
			this.defer.apply(this,arguments)
		}
	}
);
define('extension/Function', [],function(){});
var $break={};
Object.extend
(
	Array.prototype,
	{
		/**
		 * @private
		 */
		_each: function(iterator)
		{
			for (var i=0,length=this.length; i<length; i++)iterator(this[i]);
		},
		/**
		 * Pass in a function which will act as the iterator.
		 * 
		 * @param {Function} iterator The interator method.
		 * @!param {Object} context 
		 * @return {Array}
		 */
		each: function(iterator)//,context)
		{
			var index=0;
//			iterator=iterator.bind(context);
			try
			{
				this._each
				(
					function(value)
					{
						iterator(value,index++);
					}
				);
			}
			catch(e)
			{
				if (e!=$break)throw e;
			}
			return this;
		},
		/**
		 * Iterates over an array and returns the first item which returns true.
		 * 
		 * @param {Function} iterator The interator function which will be called for each iteration over the array.
		 * @return {Mixed} The found item in the array.
		 */
		find: function(iterator)//,context)
		{
//			iterator=iterator.bind(context);
			var result;
			this.each
			(
				function(value,index)
				{
					if (iterator(value,index))
					{
						result=value;
						throw $break;
					}
				}
			);
			return result;
		},
		/**
		 * Iterates over an array and returns each item in the array
		 * in which the iterator returns true.
		 * 
		 * @param {Function} iterator The interator function which will be called for each iteration over the array.
		 * @return {Array} Array of matching items.
		 */
		findAll: function(iterator)//,context)
		{
//			iterator	=iterator.bind(context);
			var results	=[];
			this.each
			(
				function(value, index)
				{
					if (iterator(value,index))results.push(value);
				}
			);
			return results;
		},
//		/**
//		 * 
//		 * 
//		 * @return {Array}
//		 */
//		sort: function()
//		{
//			var result=[];
//			this.each
//			(
//				function(item)
//				{
//					item.key
//				}
//			);
//			return result;
//		},
		/**
		 * Returns the first item in an array.
		 * 
		 * @return {Mixed}
		 */
		first: function() 
		{
			return this[0];
		},
		/**
		 * Returns the last item in an array.
		 * 
		 * @return {Mixed}
		 */
		last: function()
		{
			return this[this.length-1];
		},
		/**
		 * Returns a boolean result if needle is found.
		 * 
		 * @param {Mixed} needle to search for within array.
		 * @return {Boolean} True if need is found in array.
		 */
		inArray: function(needle)
		{
			return (this.find
			(
				function(iteration)
				{
					return (needle==iteration)?true:false;
				}
			)!=undefined)?true:false;
		},
		/**
		 * Returns an array without the values passed to it.
		 * 
		 * @param {Mixed} ... Values to remove from the array.
		 * @return {Array} Array excluded of values to be removed.
		 */
		without: function()
		{
			if (Object.isArray(arguments[0]))
			{
				var values=$JSKK.toArray(arguments[0]);
				return this.findAll
				(
					function(value)
					{
						return !values.include(value);
					}
				);
			}
			else
			{
				var values=$JSKK.toArray(arguments);
				return this.findAll
				(
					function(value)
					{
						return !values.include(value);
					}
				);
			}
		},
		/**
		 * Returns the minimum value found in the array.
		 * 
		 * @return {Number} The minimim number found in the array.
		 */
		min: function()
		{
			return Math.min.apply(this,this);
		},
		/**
		 * Returns the maximum value found in the array.
		 * 
		 * @return {Number} The maximum number found in the array.
		 */
		max: function()
		{
			return Math.max.apply(this,this);
		},
		/**
		 * Returns the sum of all values in the array.
		 * 
		 * Note: Non number values will be converted to a number before being summed.
		 * 
		 * @return {Number} The sum of all values.
		 */
		sum: function()
		{
			var total=0;
			for (var i=0,j=this.length; i<j; i++)
			{
				total+=Number(this[i]);
			}
			return total;
		},
		/**
		 * Returns the average of all values in the array.
		 * 
		 * Note: Non number values will be converted to a number before being averaged.
		 * 
		 * @return {Number} The average of all values.
		 */
		average: function()
		{
			return this.sum()/this.length;
		}
	}
);
define('extension/Array', [],function(){});
Object.extend
(
	String.prototype,
	{
		/**
		 * Replaces all new line characters with HTML br tags.
		 * 
		 * @return {String} Formatted string.
		 */
		nl2br: function()
		{
			return this.replace(/[\r\n\f]/g,'<br />');
		},
		/**
		 * Trims whitespace from each end of a string.
		 * @return {String} Trimmed string.
		 * 
		 * @credit http://blog.stevenlevithan.com/archives/faster-trim-javascript
		 */
		trim: function()
		{
			var	str	=this.replace(/^\s\s*/,''),
				ws	=/\s/,
				i	=str.length;
			while (ws.test(str.charAt(--i))){};
			return str.slice(0,i+1);
		},
		/**
		 * Parses a URI-like query string and returns an object representation of it.
		 * 
		 * This method is realy targeted at parsing query strings (hence the default value of "&" for the separator argument).
		 * 
		 * For this reason, it does not consider anything that is either before a question mark (which signals the beginning
		 * of a query string) or beyond the hash symbol ("#"), and runs decodeURIComponent() on each parameter/value pair.
		 * 
		 * String#toQueryParams also aggregates the values of identical keys into an array of values.
		 * 
		 * Note that parameters which do not have a specified value will be set to undefined.
		 * 
		 * @param {String} separator
		 * @returns {Object} Object composed of key/val pairs.
		 * 
		 * @credit http://www.prototypejs.org/api/string/toQueryParams
		 */
		toQueryParams: function(separator)
		{
			var match=this.trim().match(/([^?#]*)(#.*)?$/);
			if (!match)return {};
			return match[1].split(separator || '&').inject
			(
				{},
				function(hash,pair)
				{
					if ((pair=pair.split('='))[0])
					{
						var key		=decodeURIComponent(pair.shift());
						var value	=pair.length>1?pair.join('='):pair[0];
						if (!Object.isUndefined(value))value=decodeURIComponent(value);
						if (key in hash)
						{
							if (!Object.isArray(hash[key]))hash[key]=[hash[key]];
							hash[key].push(value);
						}
						else
						{
							hash[key]=value;
						}
					}
					return hash;
				}
			);
		},
		/**
		 * Truncates a string to a given length and adds an ellipse(...) to the end of it.
		 * 
		 * @param {Number} maxLength Specifies the point at which the string should be truncated.
		 * @return {String} The truncated string.
		 */
		ellipse: function(maxLength)
		{
			if(this.length>maxLength)
			{
				return this.substr(0,maxLength-3)+'...';
			}
			return this;
		},
		lowerFirst: function()
		{
			var	first	=this.substring(0,1),
				rest	=this.substring(1);
			return first.toLowerCase()+rest;
		}
	}
);
define('extension/String', [],function(){});
/**
 * @class $JSKK
 * //Description
 * 
 * 
 * 
 * @author Timothy Chandler tim@s3.net.au
 * @version 1.1.0
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
			version:		'1.1.0',
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
			 * Imports packagesinto a localized scope.
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
				if (!(typeof iterable=='function' && iterable=='[object NodeList]') && iterable.toArray)return iterable.toArray();
				var	length=iterable.length || 0,
					results=new Array(length);
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
					if (formattedRequires.length)
					{
						requirejs(formattedRequires,check);
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
		else
		{
			if (Object.isUndefined($JSKK.global.console.debug))
			{
				$JSKK.global.console.debug=$JSKK.global.console.log;
			}
		}
		
		return $JSKK;
	}
);
define
(
	'Interface',
 	[
		'./Core'
	],
	function()
	{
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
				namespace[traitName].toString=function()
				{
					return '[JSKK Interface ('+definition.$namespace+'.'+definition.$name+')]';
				}
				
				
				//Set the class type.
				definition.$type='interface';
				
				if (Object.isDefined(definition.$extends))
				{
					if (Object.isString(definition.$extends))
					{
						var	obj		=$JSKK.global,
							parts	=definition.$extends.split('.');
						
						for (var i=0,j=parts.length; i<j; i++)
						{
							if (Object.isDefined(obj[parts[i]]))
							{
								obj=obj[parts[i]];
							}
							else
							{
								throw new Error('Invalid extension. Class "'+definition.$extends+'" has not been loaded.');
							}
						}
						definition.$extends=obj;
					}
					else
					{
						console.warn('Using object literals is deprecated as of JSKK v1.1 and will be disabled in v1.2. Please use strings instead.');
					}
				}
				
				//Create a reflection method.
				namespace[interfaceName].prototype.$reflect=function(what)
				{
					switch (what)
					{
						case 'type':		return definition.$type;
						case 'namespace':	return definition.$namespace;
						case 'name':		return definition.$name;
						case 'fullname':	return this.$namespace+'.'+this.$name;
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
				// else if (thisInterface.$type!='interface')
				// {
				// 	console.debug(thisInterface.$type);
				// 	throw new Error('Unable to implement interface. Interface to implement is not an instance of "$JSKK.Interface".');
				// }
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
		return $JSKK.Interface;
	}
);
define
(
	'Trait',
 	['./Core'],
	function()
	{
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
				namespace[traitName].toString=function()
				{
					return '[JSKK Trait ('+definition.$namespace+'.'+definition.$name+')]';
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
						case 'fullname':	return this.$namespace+'.'+this.$name;
						// case 'extends':		return definition.$extends;
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
				};
			},
			normalize: function(traits,preserveInit)
			{
				//If traits is not an array, make it one so its easier to deal with.
				if (!Object.isArray(traits))traits=[traits];
				//Pluck out the conflict resolution object if present.
				var conflictResolutions={};
				if (!Object.isFunction(traits[traits.length-1])
				&& !Object.isString(traits[traits.length-1]))
				{
					conflictResolutions=traits[traits.length-1];
					delete traits[traits.length-1];
				}
				//Now loop through each trait and see if there are any conflicts.
				var	normalizedTrait					=function(){},
					methods							=[],
					resolved						=[];
				normalizedTrait.prototype.traitName	='Normalized';
				for (var i=0,j=traits.length; i<j; i++)
				{
					if (Object.isDefined(traits[i]))
					{
						if (Object.isString(traits[i]))
						{
							traits[i]=$JSKK.strToObject(traits[i]);
						}
						else
						{
							console.warn('Using object literals is deprecated as of JSKK v1.1 and will be disabled in v1.2. Please use strings instead.');
						}
					}
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
		return $JSKK.Trait;
	}
);
define
(
	'Class',
 	['./Core'],
	function()
	{
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
								case 'fullname':	return this.$namespace+'.'+this.$name;
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
								//TODO: Clean up this duplicated code.
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
		return $JSKK.Class;
	}
);
define
(
	'When',
	[
		'./Core'
	],
	function()
	{
		$JSKK.Class.create
		(
			{
				$namespace:	'$JSKK',
				$name:		'When_'
			}
		)
		(
			{},
			{
				timer:	null,
				items:
				{
					length:	0
				},
				init:	function()
				{
					this.timer=null;
					this.startTimer();
				},
				startTimer: function()
				{
					if (Object.isNull(this.timer))
					{
						this.timer=window.setInterval
						(
							function()
							{
								for (var item in this.items)
								{
									if (item=='length')continue;
									//Try to execute the condition.
									try
									{
										this[this.items[item].condition](this.items[item]);
									}
									//Catch any exceptions, remove the item, then release the exception so that we don't have this infinately executing.
									catch(e)
									{
										this.removeItem(this.items[item].id);
										throw e;
									}
								}
							}.bind(this),
							100
						);
					}
				},
				stopTimer: function()
				{
					window.clearInterval(this.timer);
					this.timer=null;
				},
				captureCondition: function(condition,id,args)
				{
					var	args		=$JSKK.toArray(args)
					if (args.length)
					{
						this.items[id].condition	=condition;
						this.items[id].callback		=args.shift();
						this.items[id].args			=args;
					}
					else
					{
						this.removeItem(id);
					}
				},
				addItem: function(scope,object)
				{
					var id=Math.round(Math.random()*1000000);
					this.items[id]=
					{
						id:			id,
						scope:		scope,
						object:		object,
						condition:	null,
						callback:	$JSKK.emptyFunction,
						args:		null
					};
					this.items.length++;
					if (this.items.length)
					{
						this.startTimer();
					}
					return id;
				},
				removeItem: function(id)
				{
					delete this.items[id];
					this.items.length--;
					if (!this.items.length)
					{
						this.stopTimer();
					}
				},
				assert: function(result,item)
				{
					if (result)
					{
						item.callback.apply(item.callback,item.args);
						this.removeItem(item.id);
					}
				},
				isDefined: function(item)
				{
					this.assert(Object.isDefined(item.scope[item.object]),item);
				},
				isUndefined: function(item)
				{
					this.assert(Object.isUndefined(item.scope[item.object]),item);
				},
				isTrue: function(item)
				{
					if (!Object.isFunction(item.scope))
					{
						this.assert((item.scope[item.object]===true),item);
					}
					else
					{
						this.assert((item.scope()===true),item);
					}
				},
				isFalse: function(item)
				{
					if (!Object.isFunction(item.scope))
					{
						this.assert((item.scope[item.object]===false),item);
					}
					else
					{
						this.assert((item.scope()===false),item);
					}
				},
				isBoolean: function(item)
				{
					this.assert(Object.isBoolean(item.scope[item.object]),item);
				},
				isFunction: function(item)
				{
					this.assert(Object.isFunction(item.scope[item.object]),item);
				},
				isArray: function(item)
				{
					this.assert(Object.isArray(item.scope[item.object]),item);
				},
				isAssocArray: function(item)
				{
					this.assert(Object.isAssocArray(item.scope[item.object]),item);
				},
				isString: function(item)
				{
					this.assert(Object.isString(item.scope[item.object]),item);
				},
				isNumber: function(item)
				{
					this.assert(Object.isNumber(item.scope[item.object]),item);
				},
				isElement: function(item)
				{
					this.assert(Object.isElement(item.scope[item.object]),item);
				},
				isNull: function(item)
				{
					this.assert(Object.isNull(item.scope[item.object]),item);
				},
				isEqualTo: function(item)
				{
					this.assert((item.scope[item.object.object]==item.object.value),item);
				},
				isNotEqualTo: function(item)
				{
					this.assert((item.scope[item.object.object]!=item.object.value),item);
				}
			}
		);
		$JSKK.When=new $JSKK.When_();
		$JSKK.when=function(scope,object)
		{
			var	id		=$JSKK.When.addItem(scope,object),
				callee	=arguments.callee,
				chain	=
				{
					andWhen: function()
					{
						if (!arguments.length)
						{
							return callee(scope,object);
						}
						else
						{
							return callee(arguments[0],arguments[1]);
						}
					}
				};
			return {
				isDefined: function()
				{
					$JSKK.When.captureCondition('isDefined',id,arguments);
					return chain;
				},
				isUndefined: function()
				{
					$JSKK.When.captureCondition('isUndefined',id,arguments);
					return chain;
				},
				isTrue: function()
				{
					$JSKK.When.captureCondition('isTrue',id,arguments);
					return chain;
				},
				isFalse: function()
				{
					$JSKK.When.captureCondition('isFalse',id,arguments);
					return chain;
				},
				isBoolean: function()
				{
					$JSKK.When.captureCondition('isBoolean',id,arguments);
					return chain;
				},
				isFunction: function()
				{
					$JSKK.When.captureCondition('isFunction',id,arguments);
					return chain;
				},
				isArray: function()
				{
					$JSKK.When.captureCondition('isArray',id,arguments);
					return chain;
				},
				isAssocArray: function()
				{
					$JSKK.When.captureCondition('isAssocArray',id,arguments);
					return chain;
				},
				isString: function()
				{
					$JSKK.When.captureCondition('isString',id,arguments);
					return chain;
				},
				isNumber: function()
				{
					$JSKK.When.captureCondition('isNumber',id,arguments);
					return chain;
				},
				isElement: function()
				{
					$JSKK.When.captureCondition('isElement',id,arguments);
					return chain;
				},
				isNull: function()
				{
					$JSKK.When.captureCondition('isNull',id,arguments);
					return chain;
				},
				/**
				 * 
				 * 
		$JSKK.when(stores,{object:'count',value:2}).isEqualTo
		(
			function()
			{
				...
			}.bind(this)
		);
				 * 
				 */
				isEqualTo: function()
				{
					$JSKK.When.captureCondition('isEqualTo',id,arguments);
					return chain;
				},
				isNotEqualTo: function()
				{
					$JSKK.When.captureCondition('isNotEqualTo',id,arguments);
					return chain;
				}
			};
		}
	}
);


/*** TESTING ***/


//window.foobar=false;
//$JSKK.when(window,'foobar').isTrue
//(
//	function(a,b,c)
//	{
//		console.debug(a,b,c);
//	}.bind(this),
//	'arg1',
//	'arg2',
//	'arg3'
//);
//
//$JSKK.Class.create
//(
//	{
//		$namespace:	'foo.bar.baz',
//		$name:		'Foo'
//	}
//)
//(
//	{
//		bar:	null,
//		init:	function()
//		{
//			$JSKK.when(this,'bar').isTrue
//			(
//				function(a,b,c)
//				{
//					console.debug('bar has been set to true!');
//					console.debug(this,a,b,c);
//				}.bind(this),
//				'arg1',
//				'arg2',
//				'arg3'
//			);
//			$JSKK.when(this,'bar').isFalse
//			(
//				function()
//				{
//					console.debug('bar has been set to false!');
//				}
//			);
//			$JSKK.when(this,'baz').isDefined
//			(
//				function()
//				{
//					console.debug('baz has been defined!');
//					console.debug(this.baz);
//				}.bind(this)
//			).andWhen().isDefined
//			(
//				function()
//				{
//					console.debug('baz has been defined![second test(chained)]');
//				}.bind(this)
//			).andWhen().isTrue
//			(
//				function()
//				{
//					console.debug('baz is true!');
//				}.bind(this)
//			);
//			//Simulate adding and removing a variable.
//			window.setTimeout
//			(
//				function()
//				{
//					this.baz='foobarbaz';
//					$JSKK.when(this,'baz').isUndefined
//					(
//						function()
//						{
//							console.debug('baz has been deleted!');
//							console.debug(this.baz);
//						}.bind(this)
//					);
//					window.setTimeout
//					(
//						function()
//						{
//							delete this.baz;
//						}.bind(this),
//						2500
//					);
//				}.bind(this),
//				2500
//			);
//		},
//		setBar: function(val)
//		{
//			this.bar=val;
//		},
//		setBaz: function(val)
//		{
//			this.baz=val;
//		}
//	}
//);
//window.foo=new foo.bar.baz.Foo();
(function(root) {
define("iface/Configurable", ["Core"], function() {
      return (function() {
$JSKK.Interface.create
(
	{
		$namespace:	'$JSKK.iface',
		$name:		'Configurable'
	}
)
(
	{
		config:	{}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("iface/Observable", ["Core"], function() {
      return (function() {
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
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("trait/Configurable", ["Core"], function() {
      return (function() {
$JSKK.Trait.create
(
	{
		$namespace:		'$JSKK.trait',
		$name:			'Configurable',
		$implements:	'$JSKK.iface.Configurable'
	}
)
(
	{
		init: function(config)
		{
			Object.extend(this.config,config);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("trait/Observable", ["Core"], function() {
      return (function() {
$JSKK.Trait.create
(
	{
		$namespace:		'$JSKK.trait',
		$name:			'Observable',
		$implements:	'$JSKK.iface.Observable'
	}
)
(
	{
		init:		function(listeners)
		{
			for (var listener in listeners)
			{
				if (!Object.isFunction(listeners[listener]) && Object.isAssocArray(listeners[listener]))
				{
					if (!Object.isDefined(listeners[listener].callback))
					{
						throw new Error('Invalid observer. Observers defined as objects must specify "callback" as the callback function.');
					}
					else
					{
						if (Object.isDefined(listeners[listener].times))
						{
							this.observeTimes(listeners[listener].times,listener,listeners[listener]);
						}
						else
						{
							this.observe(listener,listeners[listener]);
						}
					}
				}
				else if (Object.isFunction(listeners[listener]))
				{
					this.observe(listener,listeners[listener]);
				}
				else
				{
					throw new Error('Invalid observer. Observers can only be functions.');
				}
			}
		},
		observe:	function(type,listener)
		{
			if (!Object.isArray(this.events[type]))this.events[type]=[];
			if (!Object.isArray(type))type=[type];
			for (var i=0,j=type.length; i<j; i++)
			{
				this.events[type[i]].push(listener);
				this.events[type[i]].last().times=0;
			}
			return this;
		},
		observeOnce: function(type,listener)
		{
			return this.observeTimes.call(this,1,type,listener);
		},
		observeTimes: function(numTimes,type,listener)
		{
			if (!Object.isArray(this.events[type]))this.events[type]=[];
			if (!Object.isArray(type))type=[type];
			for (var i=0,j=type.length; i<j; i++)
			{
				this.events[type[i]].push(listener);
				this.events[type[i]].last().times=numTimes;
			}
			return this;
		},
		unobserve: function(type,listener)
		{
			if (!Object.isArray(type))type=[type];
			for (var i=0,j=type.length; i<j; i++)
			{
				if (!Object.isUndefined(this.events[type[i]]))
				{
					var tmp=[];
					for (var k=0,l=this.events[type[i]].length; k<l; k++)
					{
						if (this.events[type[i]][k]==listener)
						{
							delete this.events[type[i]][k];
						}
						else
						{
							tmp.push(this.events[type[i]][k]);
						}
					}
				}
				this.events[type[i]]=tmp;
				if (!this.events[type[i]].length)this.events[type[i]]=true;
			}
			return this;
		},
		fireEvent: function()
		{
			var	args=$JSKK.toArray(arguments),
				type=args.shift();
			if (!Object.isArray(type))type=[type];
			for (var i=0,j=type.length; i<j; i++)
			{
				if (!Object.isUndefined(this.events[type[i]]) && Object.isArray(this.events[type[i]]))
				{
					for (var k=0,l=this.events[type[i]].length; k<l; k++)
					{
						if (Object.isFunction(this.events[type[i]][k]))
						{
							if (this.events[type[i]][k].apply(this,args)===false)
							{
								return false;
							}
							if (Object.isDefined(this.events[type[i]][k]) && this.events[type[i]][k].times!==0)
							{
								if (--this.events[type[i]][k].times===0)
								{
									this.unobserve(type[i],this.events[type[i]][k]);
								}
							}
						}
					}
				}
			}
			return true;
		},
		clearEvent: function(type)
		{
			if (!Object.isUndefined(this.events[type]))
			{
				this.events[type]=true;
			}
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("trait/Timeable", ["Core"], function() {
      return (function() {
$JSKK.Trait.create
(
	{
		$namespace:	'$JSKK.trait',
		$name:		'Timeable',
		$uses:		'$JSKK.trait.Observable'
	}
)
(
	{
		startTimer: function()
		{
			if (this.config.timeout)
			{
				this.timeout=this.config.timeout;
				window.clearInterval(this.timer);
				this.timer=window.setInterval
				(
					function()
					{
						this.timeout--;
						this.fireEvent('onTimerInterval',this,this.getElapsedTime());
						if (this.timeout<=0)
						{
							window.clearInterval(this.timer);
							this.fireEvent('onTimeout',this);
						}
					}.bind(this),
					1000
				);
			}
		},
		restartTimer: function()
		{
			this.startTimer();
		},
		pauseTimer: function()
		{
			window.clearInterval(this.timer);
		},
		resumeTimer: function()
		{
			this.startTimer();
		},
		stopTimer: function()
		{
			window.clearInterval(this.timer);
			this.timeout=this.config.timeout;
		},
		resetTimer: function()
		{
			this.timeout=this.config.timeout;
		},
		getElapsedTime: function()
		{
			return (this.config.timeout-this.timeout);
		},
		getRemainingTime: function()
		{
			return this.timeout;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

define
(
	'JSKK',
	[
		'./Core',
		'./Interface',
		'./Trait',
		'./Class',
		'./When',
		'./iface/Configurable',
		'./iface/Observable',
		'./trait/Configurable',
		'./trait/Observable',
		'./trait/Timeable'
	]
);
