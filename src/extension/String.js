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