$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'Notification',
		$requires:	__dirname+'/db'
	}
)
(
	{},
	{
		main: null,
		client: null,
		init: function(main, client)
		{
			this.main = main;
			this.client = client;
			console.log('gameHub.Notification starting');
	
			client.socket.on(SIGNALS.NOTIFICATION, this.handleNotification.bind(this));
	
		},
		handleNotification: function(message)
		{
			message = message.toString();
			this.main.io.sockets.emit(SIGNALS.NOTIFICATION, this.client.get('name') + " " + message);
		}
	}
);