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
		a:	'bar',
		foo: function(){
//			console.log($self);
			console.log('static foo function called');
			console.log(application.Main.a);
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
		a:	'foo'
	},
	{
		
	}
)

application.Main.foo();
application.Sub.foo();