// Gets the config from redphp's /etc/config.ini file
$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'Config',
		$requires:	__dirname+'/BaseClass',
		$extends:	'gameHub.BaseClass'
	}
)
(
	{},
	{
		init: function()
		{
			console.log('gameHub.Config loaded');
			var iniparser = require('iniparser');
			this._properties = iniparser.parseSync('../etc/config.ini');
			this.set('node_port', parseInt(this.get('node_port')));
		}
	}
);
gameHub.Config=new gameHub.Config();