$JSKK.Class.create
(
	{
		$namespace:	'gameHub',
		$name:		'Client',
		$requires:	[__dirname+'/db', __dirname+'/BaseClass'],
		$extends:	'gameHub.BaseClass'
	}
)
(
	{},
	{
		main: null,
		socket: null,
		_properties:
		{
			id:   0,
			name: 'Unidentified User'
		},
		init: function(main, socket)
		{
			this.main = main;
			this.socket = socket;
			console.log('gameHub.Client instantiated');
			socket.on(SIGNALS.CLIENT_ID, this.getClientDetails.bind(this));
		},
		getClientDetails: function(id)
		{
			this.set('id', id);
			console.log('client provided id:' + id);
			gameHub.DB.query("SELECT * FROM USER WHERE id = ? LIMIT 1", [id], function(error, result){
				var name = result[0].username;
				this.set('name', name);
				console.log('client identified as', id, name);
				this.socket.emit(SIGNALS.IDENTIFIED, true);
			}.bind(this));
		}
	}
);