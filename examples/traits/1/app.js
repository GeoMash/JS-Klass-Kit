$JSKK.Trait.create
(
	{
		$namespace:	'behaviour',
		$name:		'Writable'
	}
)
(
	{
		write: function(what)
		{
			document.body.innerHTML='Hello '+(what);
		}
	}
);



$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main',
		$uses:
		[
			'behaviour.Writable'
		]
	}
)
(
	{},
	{
		who:	'World',
		init: function(who)
		{
			if (who)this.who=who;
		},
		sayHello: function(who)
		{
			this.write(who || this.who);
		}
	}
);



var app=new application.Main();
app.sayHello();