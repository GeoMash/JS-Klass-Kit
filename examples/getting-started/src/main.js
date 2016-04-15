requirejs.config
(
	{
		baseUrl:	'/node_modules',
		paths:
		{
			JSKK:	'jskk/bin/jskk.1.3.0.min'
		}
	}
);
require
(
	['JSKK'],
	function()
	{
		$JSKK.Class.create('Main')
		(
			{
				VERSION: '1.0.0'
			},
			{
				init: function()
				{
					document.getElementsByTagName('h1')[0].innerHTML='Hello JSKK v'+$JSKK.version;
				}
			}
		);
		var app=new Main();
		document.getElementsByTagName('h2')[0].innerHTML='App Version v'+Main.VERSION;
	}
);