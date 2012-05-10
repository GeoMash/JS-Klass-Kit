$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'MainExt',
		$extends:	'gameHub.Main',
		$requires:	__dirname+'/Base'
	}
)
(
	{},
	{
		helloWorld: function()
		{
			this.helloWorld.$parent();
			console.log('Hello Other World!');
		}
	}
);
$APP=new gameHub.MainExt();
$APP.helloWorld();