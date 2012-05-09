$JSKK.Class.create('Base')();
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main',
		$extends:	Base,
		$final:		true
	}
)
(
	{},
	{
		init: function()
		{
			document.body.innerHTML=
			[
				this.$reflect('type'),
				this.$reflect('namespace'),
				this.$reflect('name'),
				this.$reflect('abstract'),
				this.$reflect('final'),
				this.$reflect('extends'),
				this.$reflect('implements'),
				this.$reflect('uses'),
				this.$reflect('self'),
			].join('<br />');
		}
	}
);

new application.Main();