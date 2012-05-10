
$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'DB',
		$requires:	__dirname+'/config'
	}
)
(
	{},
	{
		connection:	this,
		loaded: false,
		init: function()
		{
			console.log('gameHub.DB loaded');
			var mysql = require('mysql');
			
			var a = this.connection = mysql.createClient
			(
				{
					user: gameHub.Config.get('dbase_user'),
					password: gameHub.Config.get('dbase_pass')
				}		
			);
			
			a.query("USE "+gameHub.Config.get('dbase_dbase'), function(){
				this.loaded=true;
			});
		},
		query: function(a,b,c)
		{
			this.connection.query(a,b,c);
			return this;
		}
	}
);
gameHub.DB=new gameHub.DB();