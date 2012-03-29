$JSKK.Class.create('Application')
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

$application=new Application();
$application.sayHello();