$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main'
	}
)
(
	{
		//Constants
		FOO:	'foo',
		BAR:	'bar',
		BAZ:	'baz',
		
		//Static methods. These don't hold scope.
		someStaticMethod: function()
		{
			document.body.innerHTML='Hello World';
			console.debug(this);
		}
	},
	{
		init: function()
		{
			console.debug('Class init.');
		}
	}
);
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main2',
		$extends:	application.Main
	}
)
(
	{
		//Constants
		FOO2:	'foo2',
		BAR2:	'bar2',
		BAZ2:	'baz2',
		
		//Static methods. These don't hold scope.
		someStaticMethod2: function()
		{
			document.body.innerHTML='Hello World';
			console.debug(this);
		}
	},
	{}
);
$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main3',
		$extends:	application.Main2
	}
)
(
	{
		//Constants
		FOO3:	'foo3',
		BAR3:	'bar3',
		BAZ3:	'baz3',
		
		//Static methods. These don't hold scope.
		someStaticMethod3: function()
		{
			document.body.innerHTML='Hello World';
			console.debug(this);
		}
	},
	{}
);

$JSKK.Class.create
(
	{
		$namespace:	'application',
		$name:		'Main4',
		$extends:	application.Main3
	}
)
(
	{
		//Constants
		FOO:	'foo4',
		BAR:	'bar4',
		BAZ:	'baz4',
		
		//Static methods. These don't hold scope.
		someStaticMethod: function()
		{
			document.body.innerHTML='override!';
			console.debug(this);
		}
	},
	{}
);

$application=new application.Main();

console.debug(application.Main.FOO);
console.debug(application.Main.BAR);
console.debug(application.Main.BAZ);

application.Main.someStaticMethod();


$application2=new application.Main2();

console.debug(application.Main2.FOO);
console.debug(application.Main2.BAR);
console.debug(application.Main2.BAZ);

application.Main2.someStaticMethod();

console.debug(application.Main2.FOO2);
console.debug(application.Main2.BAR2);
console.debug(application.Main2.BAZ2);

application.Main2.someStaticMethod2();


$application3=new application.Main3();

console.debug(application.Main3.FOO);
console.debug(application.Main3.BAR);
console.debug(application.Main3.BAZ);

application.Main3.someStaticMethod();

console.debug(application.Main3.FOO2);
console.debug(application.Main3.BAR2);
console.debug(application.Main3.BAZ2);

application.Main3.someStaticMethod2();

console.debug(application.Main3.FOO3);
console.debug(application.Main3.BAR3);
console.debug(application.Main3.BAZ3);

application.Main3.someStaticMethod3();



$application4=new application.Main4();

console.debug(application.Main4.FOO);
console.debug(application.Main4.BAR);
console.debug(application.Main4.BAZ);

application.Main4.someStaticMethod();
