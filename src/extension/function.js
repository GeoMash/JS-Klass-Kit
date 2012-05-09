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