Interfaces
----------

Interfaces are a way to apply a type of blueprint to your class. Any class which implements the interface, must respect that "blueprint" and implement all the methods defineds without having to define how these methods are used or handled.

In JSKK, you can create an interface using `$JSKK.Interface.create`.
Methods are defined by specifying a key (the method name) and giving it the value `$JSKK.Interface.METHOD`.

Note that you cannot ever use the variable `interface` (lower case). This is a reserved word in JavaScript. It is encouraged to use `iface` instead.

```js
$JSKK.Interface.create
(
	{
		$namespace: 'acme.app.demo.iface',
		$name:		'Data'
	}
)
(
	{
		loadData:	$JSKK.Interface.METHOD,
		getData:	$JSKK.Interface.METHOD
	}
);
```

Interfaces can also extend other interfaces, however it can only extend another INTERFACE. It cannot extend a TRAIT or a CLASS.

Here is an example of an interface extending another interface:

```js
$JSKK.Interface.create
(
	{
		$namespace: 'acme.app.demo.iface',
		$name:		'A'
	}
)
(
	{
		A:	$JSKK.Interface.METHOD,
		B:	$JSKK.Interface.METHOD
	}
);

$JSKK.Interface.create
(
	{
		$namespace: 'acme.app.demo.iface',
		$name:		'B',
		$extends:	'acme.app.demo.iface.A'
	}
)
(
	{
		C:	$JSKK.Interface.METHOD,
		D:	$JSKK.Interface.METHOD
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main',
		$implements:'acme.app.demo.iface.B'
	}
)
(
	{},
	{
		A: function()
		{
			//...
		},
		B: function()
		{
			//...
		},
		C: function()
		{
			//...
		},
		D: function()
		{
			//...
		}
	}
);

var app=new acme.app.demo.Main();
app.A();
app.B();
app.C();
app.D();
```
