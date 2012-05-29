require('../../../../src/Class'); // Same as require('jskk');

$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main'
	}
)
(
	{
		foo: function(){
			console.log('static foo function called');
		}
	},
	{
		bar: function(){
			console.log('member bar function called');
		}
	}
)

$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Sub',
		$extends:	'application.Main'
	}
)
(
	{
	
	},
	{
		
	}
)

application.Main.foo();
application.Sub.foo();