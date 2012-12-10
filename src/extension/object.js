/*
 * Petim Web Tools v1.0
 * Copyright(c) 2008, Petim Pty. Ltd.
 * licensing@petim.com.au
 * 
 * See packaged license.txt
 * OR URL:
 * http://www.petim.com.au/products/pwt/license/view/
 * for full license terms.
 */

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
		delete property;
	}
	else if (Object.isArray(source))
	{
		if (!Object.isArray(destination))destination=[];
		for (var i=0,j=source.length; i<j; i++)
		{
			destination[i]=Object.extend(destination[i],source[i]);
		}
		delete i,j;
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