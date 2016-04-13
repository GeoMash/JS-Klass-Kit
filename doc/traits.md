Traits
------

Traits are a form of multiple inheritance and a great way to reuse code.

They encourage code reuse by enabling developers to create functionality which can be attached to multiple classes.

A trait is much like a class. It may have properties and methods, and hold logic which interacts with other methods within the same class. But unlike a class, a trait cannot be directly instantiated.

You may be thinking that a trait sounds like a mixin. It's true, a mixin is similar, however traits offer and advantag over mixens as they have the ability to resolve conflicts when multiple traits clash.

## Simple Example

```js
$JSKK.Trait.create
(
	{
		$namespace:	'acme.app.demo.trait',
		$name:		'A'
	}
)
(
	{
		A: function()
		{
			//...
		},
		B: function()
		{
			//...
		}
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main',
		$uses:		'acme.app.demo.trait.A'
	}
)
(
	{},
	{
		//...
	}
);


$application=new application.Main();
$application.A();
$application.B();
```

Notice how the class which `$uses` the trait, doesn't need to implement the methods specified in the trait and yet it can call those methods without error. They become first-class members of the class.

## Multiple Traits

More than 1 trait can be attached to a class.

```js
$JSKK.Trait.create
(
	{
		$namespace:	'acme.app.demo.trait',
		$name:		'B'
	}
)
(
	{
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

$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main',
		$uses:
		[
			'acme.app.demo.trait.A',
			'acme.app.demo.trait.B'
		]
	}
)
(
	{},
	{
		//...
	}
);


var app=new acme.app.demo.Main();
app.A();
app.B();
app.C();
app.D();
```


But if two traits have conflicting methods, this can cause an error when the class is compiled.

Let's change Trait B to look like this:

```js
$JSKK.Trait.create
(
	{
		$namespace:	'acme.app.demo.trait',
		$name:		'B'
	}
)
(
	{
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
```

If you were to run this, the console would get an error:

`TypeError: $application.A is not a function`

Why does this happen?

When a trait has a conflict which it doesn't know how to resolve, it won't make a resolution on behalf of the developer. Instead, the conflicting methods are ignored. This means they won't be added to the class, so they cannot be used.

So rather than a JSKK picking the first trait or one at random, it hands control back to the developer by way of a conflict resolution syntax.

```js
$JSKK.Class.create
(
	{
		$namespace: 'acme.app.demo',
		$name:		'Main',
		$uses:
		[
			'app.trait.A',
			'app.trait.B',
			{
				A: 'acme.app.demo.trait.B',
				B: 'acme.app.demo.trait.A'
			}
		]
	}
)
(
	{},
	{
		//...
	}
);

var app=new acme.app.demo.Main();
app.A();
app.B();
```

The above would result in the output:

```
Trait B Function A
Trait A Function B
```

This is because we've manually mapped the methods to whichever trait we want to use, thereby removing any conflicts.

## Traits Using Other Traits

Traits cannot be extended. However they can use other traits.

Continuing with the above examples, we'll add a third trait.

```js
$JSKK.Trait.create
(
	{
		$namespace:	'acme.app.demo.trait',
		$name:		'C',
		$uses:		'acme.app.demo.trait.B'
	}
)
(
	{
		C: function()
		{
			console.log('Trait C Function C');
		},
		D: function()
		{
			console.log('Trait C Function D');
		}
	}
);

$JSKK.Class.create
(
	{
		$namespace: 'acme.app.demo',
		$name:		'Main',
		$uses:
		[
			'acme.app.demo.trait.C'
		]
	}
)
(
	{},
	{
		//...
	}
);
var app=new acme.app.demo.Main();
app.A();
app.B();
app.C();
app.D();
```

The above outputs:

```
Trait B Function A
Trait B Function B
Trait C Function C
Trait C Function D
```

So even though we only use trait C, we also get the methods from trait B. This is because the trait B methods get included in trait C.

When you start creating complex building blocks like this, it becomes more and more likely that you'll have a method name conflict.

Take the following as an example:

```js
$JSKK.Class.create
(
	{
		$namespace: 'acme.app.demo',
		$name:		'Main',
		$uses:
		[
			'acme.app.demo.trait.A',
			'acme.app.demo.trait.C'
		]
	}
)
(
	{},
	{
		init: function()
		{
			
		}
	}
);

var app=new acme.app.demo.Main();
app.A();
app.B();
app.C();
app.D();
```

We change the Main class to use both trait's A and C. And the result is:

`TypeError: $application.A is not a function`

Oops, there was a conflict between Trait A and Trait C, and so the method A was removed. Actually, in this case, B was also removed.

Remember Trait C `$uses` Trait B, and Trait B contains method's A and B, which conflicts with the A and B methods in Trait A.

Getting around this is the same as mentioned earlier. However in this scenario, you should never consider Trait B, as it is not listed. Remember, when a trait or a class `$uses` a trait, those methods become first-class members of that trait or class.

```js
$JSKK.Class.create
(
	{
		$namespace: 'acme.app.demo',
		$name:		'Main',
		$uses:
		[
			'acme.app.demo.trait.A',
			'acme.app.demo.trait.C',
			{
				A: 'acme.app.demo.trait.C',
				B: 'acme.app.demo.trait.A'
			}
		]
	}
)
(
	{},
	{
		init: function()
		{
			
		}
	}
);

var app=new acme.app.demo.Main();
app.A();
app.B();
app.C();
app.D();
```

The above would output:

```
Trait B Function A
Trait A Function B
Trait C Function C
Trait C Function D
```

Don't be confused by the fact that Trait B is mentioned in the first result. Remember, that method originated from Trait B, but it became a first-class member of Trait C when Trait C `used` Trait B.


