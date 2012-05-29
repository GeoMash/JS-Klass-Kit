require('../../../../src/Class'); // Same as require('jskk');

$JSKK.Class.create
(
	{
		$namespace:	'example',
		$name:		'Main',
		$extends:	'example.Base',
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
$APP=new example.Main();
$APP.helloWorld();