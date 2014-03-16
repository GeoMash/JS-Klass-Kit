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
);