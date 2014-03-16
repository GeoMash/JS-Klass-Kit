
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