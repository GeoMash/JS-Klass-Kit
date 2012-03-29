/*
 * Petim Web Tools v1.2
 * Copyright(c) 2008, Petim Pty. Ltd.
 * licensing@petim.com.au
 * 
 * See packaged license.txt
 * OR URL:
 * http://www.petim.com.au/products/pwt/license/view/
 * for full license terms.
 */

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
				args	=$A(arguments),
				object	=args.shift();
			return function()
			{
				return method.apply(object,args.concat($A(arguments)));
			}
		},
		curry: function()
		{
			if (!arguments.length)return this;
			var	__method=this,
			args=$A(arguments);
			return function()
			{
				return __method.apply(this, args.concat($A(arguments)));
			}
		},
		intercept: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$A(arguments),
				interceptor	=args.shift();
			return function()
			{
				interceptor.apply(this,args.concat($A(arguments)));
				return method.apply(this,args.concat($A(arguments)));
			}
		},
		join: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$A(arguments),
				joined		=args.shift();
			return function()
			{
				method.apply(this,args.concat($A(arguments)));
				return joined.apply(this,args.concat($A(arguments)));
			}
		},
		sequencedJoin: function()
		{
			if (arguments.length<1 && typeof arguments[0]!='function')return;
			var method		=this,
				args		=$A(arguments),
				joined		=args.shift();
			return function()
			{
				var ret=method.apply(this,args.concat($A(arguments)));
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
				xargs	=$A(arguments),
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