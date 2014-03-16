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
);