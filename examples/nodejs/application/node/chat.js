$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'Chat',
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
			console.log('gameHub.Chat starting');

			client.socket.on(SIGNALS.CHAT_MESSAGE, this.handleChatMessage.bind(this));

		},
		handleChatMessage: function(message)
		{
			message = message.toString();
			this.main.io.sockets.emit(SIGNALS.CHAT_MESSAGE, this.client.get('name') + ": " + message);
			gameHub.DB.query("INSERT INTO chatlog SET text=?, timestamp=?, user=?", [message, 1, this.client.get('id')]);
		}
	}
);