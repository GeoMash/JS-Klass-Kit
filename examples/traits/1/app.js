$JSKK.Trait.create
(
	{
		$namespace:	'behaviour',
		$name:		'Writable'
	}
)
(
	{},
	{
		write: function(what)
		{
			
		}
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main'
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
			document.body.innerHTML='Hello '+(who || this.who);
		}
	}
);



$application=new application.Main();
$application.sayHello();