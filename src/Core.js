/**
 * @class $JSKK
 * //Description
 * 
 * 
 * 
 * @author Timothy Chandler tim@s3.net.au
 * @version 1.0.0
 */
var $JSKK=
{
	version:		'1.0.0',
	emptyFunction:	function(){},
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
				throw new TypeError();
			}
		}
		return function(spec,context)
		{
			return inOrderDescend(spec, context||window);	
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
	}
}
if (Object.isUndefined(window.console))
{
	window.console=
	{
		log:	$JSKK.emptyFunction,
		debug:	$JSKK.emptyFunction
	}
}
else
{
	if (Object.isUndefined(window.console.debug))
	{
		window.console.debug=window.console.log;
	}
}