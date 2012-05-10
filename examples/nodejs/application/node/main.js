require('jskk');
SIGNALS = require('../public/js/nodeSignals');

$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'Main',
		$requires:
		[
          	 __dirname+'/config',
          	 __dirname+'/chat',
          	 __dirname+'/notification',
          	 __dirname+'/client'
      	 ]
	}
)
(
	{},
	{
		io: null,
		init: function()
		{
			console.log('gameHub.Main starting');
			
			var port = gameHub.Config.get('node_port');
			this.io = require('socket.io').listen(port);
			console.log('Node Serving on Port '+port);
			
			this.io.sockets.on('connection', this.onConnection.bind(this));
		},
		onConnection: function(socket)
		{
			console.log('someone connected');
			
			var client = new gameHub.Client(this, socket);
			new gameHub.Chat(this, client);
			new gameHub.Notification(this, client);
		}
	}
);
gameHub.Main=new gameHub.Main();
