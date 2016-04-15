requirejs.config
(
	{
		baseUrl:	'/node_modules',
		paths:
		{
			JSKK:	'jskk/bin/jskk.1.3.1',
			app:	'/src/app'
		}
	}
);
require
(
	['JSKK'],
	function()
	{
		$JSKK.require
		(
			'app.Main',
			function()
			{
				window.$application=new app.Main();
				$application.A();
				$application.B();
				$application.C();
				$application.D();
			}
		);
	}
);