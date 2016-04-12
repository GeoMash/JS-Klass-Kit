Classes
-------

## Introduction

`$JSKK.Class.create` is the method which you use to create a class.

There are a couple ways to use this method. You can either pass in a string or an object.

A JSKK class consists of two main blocks:

* The class definition block.
* The class body block.

The class definition block defines everything about the class. It must always define a class name. However it can also define other things, such as what namespace it belongs to and what class it extends from. Additional meta data about the class can also be defined in this block.

The class body block is broken into two parts. The first is for defining static properties and methods. The second is for defining class properties and methods which will be available to the class instance.

Once class has been created, it can be instantiated like any other class in JavaScript using the "new" statement.


## Constructors

A note on constructors.

A constructor is a method which you can define in a class which is always executed whenever a class is initalized.

In JSKK, this constructor method must be named "init".

There are examples of this in use later in this page.

## Scope

A note on scope.

When using callbacks within a JSKK class, it is necessary to bind the callback back to the scope of the class instance (this).

Example:

```js
{
	foo: function()
	{
		doSomething(this.onAfterSomething.bind(this));
	},
	onAfterSomething: function()
	{
		console.log(this);//"this" will be the correct scope.
	}
}
```

## Simple Class Creation

This method of class creation accepts a simple string which follows the same rules and conventions as standard variables.
Note that this means it does not support namespaces.

```js
$JSKK.Class.create('Application')
(
	{},
	{
		myFunc: function()
		{
			//Do Something...
		}
	}
);
```

This will create the class "Application" with no static properties or methods and an instnace method named "myFunc". It can be used like this:

```js
var app=new Application();
app.myFunc();
```

## Advanced Class Creation

This method of class creation accepts an object with label or key value pairs.

Here is the same class as above, using the advanced method.


```js
$JSKK.Class.create
(
	{
		$name: 'Main'
	}
)
(
	{},
	{
		myFunc: function()
		{
			//Do Something...
		}
	}
);

var app=new Main();
app.myFunc();
```


As you can see, it is used in the exact same way as the basic example above. However the definition block looks more verbose. That's okay though, because we get a lot more power and control over the class like this.

There are more labels than `$name`. But `$name` is the one that is always required. Without it, your class cannot be accessed and cannot function.

Let's look at all the labels and see how they can be used:

#### $name

Defines the name of the class.

Note that this is the only label which is required.

#### $namespace

Namespaces are used to organise objects into logical containers.

JSKK manages namespaces for you automagically. By specifying a namespace, JSKK will create the namespace and place the class in that namespace.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main'
	}
)
(
	{},
	{
		myFunc: function()
		{
			//Do Something...
		}
	}
);

var app=new acme.app.demo.Main();
app.myFunc();
```


#### $extends

Inheritance is fundemental to object oriented programming. It allows you to build upon existing functionality and encourages code reuse.

JSKK supports class inheritance by use of the `$extends` label.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.base',
		$name:		'Controller'
	}
)
(
	{},
	{
		apiURL:	null,
		init: function(apiURL)
		{
			this.apiURL=apiURL;
		},
		doRequest: function(endPoint,data,callback)
		{
			//Assume jQuery is loaded.
			$.post
			(
				this.apiURL+endPoint,
				data,
				callback
			);
		}
	}
);

$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller'
	}
)
(
	{},
	{
		id:		null,
		data:	null,
		init: function(id)
		{
			this.id=id;
			this.init.$parent('http://api.acme.org/');
		},
		loadData: function(callback)
		{
			this.doRequest
			(
				'user',
				{id:this.id},
				function(response)
				{
					if (response.success && Object.isDefined(response.data))
					{
						this.data=response.data;
						if (Object.isFunction(callback))
						{
							callback(this.data);
						}
					}
					else
					{
						throw new Error('Unable to load user data!');
					}
				}.bind(this)
			);
		},
		getData: function(callback)
		{
			if (Object.isNull(this.data))
			{
				this.loadData(callback);
			}
			else
			{
				if (Object.isFunction(callback))
				{
					callback(this.data);
				}
			}
		}
	}
);

var user=new acme.app.demo.controller.User(200);
user.getData
(
	function(data)
	{
		console.log(data);
	}
);
```

The above is a big example. And there is a lot going on. If you are new to JSKK, some of the things there may seem a little forign to you. You can learn about them in the JSKK Extensions section.

There is a base class `acme.app.demo.base.Controller` which the new class `acme.app.demo.controller.User` extends from.

Note that we use a string to represent the class which we are extending from. Do not use the object literal, JSKK will reject it.

This is very important as it enables the class auto loading to properly map and load any dependencies before executing the extension process.

The constructor is represented as the `init` method, and it is automatically executed when the class is initalized.


```js
init: function(id)
{
	this.id=id;
	this.init.$parent('http://api.acme.org/');
}
```

The init method is overriden, however it's not gone. You can still call the parent class's init method via `$parent`.

In the above example, the init method calls the parent init method and passes it the API URL.

The method `loadData` calls `doRequest`, which is from the parent class. But notice we don't call `$parent` with this one. That's because we havent overwritten this in the `User` class, so we've inherited it from the `Controller` class.

It becomes a first-class member of `User`, so no need to access it via `$parent`.

#### $implements

JSKK supports the use of interfaces. Interfaces are a way to apply a type of blueprint to your class. Any class which implements the interface, must respect that "blueprint" and implement all the methods it defines.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data'
	}
)
(
	{},
	{
		id:		null,
		data:	null,
		init: function(id)
		{
			//...
		},
		loadData: function(callback)
		{
			//...
		},
		getData: function(callback)
		{
			//...
		}
	}
);
```

Continuing with the same example. Here we implement an interface called "data".

`$implements` also accepts an array of interfaces.

This is one area which JSKK allows multiple inheritance.

Check the documentation on using Interfaces to see how they are created.


#### $uses

Traits are a form of multiple inheritance and a great way to reuse code.

JSKK enables you to attach a trait to any class by way of the `$uses` label.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data',
		$uses:		'acme.app.demo.trait.Data'
	}
)
(
	{},
	{
		id:		null,
		data:	null,
		init: function(id)
		{
			//...
		},
		loadData: function(callback)
		{
			//...
		},
		getData: function(callback)
		{
			//...
		}
	}
);
```

Like `$implements`, `$uses` also accepts an array of traits.

Check the documentation on using Traits to see how they are created and how to resolve conflicts with existing methods.


#### $requires

The `$requires` label is a way to list other JSKK classes and have them loaded and made available before your class is executed.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data',
		$uses:		'acme.app.demo.trait.Data',
		$requires:
		[
			'acme.app.demo.lib.Foo',
			'acme.app.demo.lib.Bar',
			'acme.app.demo.lib.Baz'
		]
	}
)
(
	{},
	{
		foo:	null,
		bar:	null,
		baz:	null,
		init: function()
		{
			this.foo=new acme.app.demo.lib.Foo();
			this.bar=new acme.app.demo.lib.Bar();
			this.baz=new acme.app.demo.lib.Baz();
		}
	}
);
```

**Important Note:**

Things that are specified in `$extends`, `$implements` and `$uses` do not need to also be included in `$requires`. JSKK will collect these items and add them to the `$requires` stack for you.


#### $abstract

The `$abstract` keyword declares the class as an abstract class. As an abstract class, it cannot be directly initalized.

The class must be first extended by another class. Then the extending class may be initalized.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data',
		$uses:		'acme.app.demo.trait.Data',
		$requires:
		[
			'acme.app.demo.lib.Foo',
			'acme.app.demo.lib.Bar',
			'acme.app.demo.lib.Baz'
		],
		$abstract:	true
	}
)
(
	{},
	{
		foo: $JSKK.Class.ABSTRACT_METHOD,
		bar: $JSKK.Class.ABSTRACT_METHOD
	}
);
```

As you can see, you can also specify methods as being abstract.
This means that the class extending this class must implement those methods or declare itself abstract.


#### $final

The `$final` label declares the class to be final, which means no further extensions are possible.

Note that this is not compatible with the `$abstract` label as this would prevent it from even being initalized.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data',
		$uses:		'acme.app.demo.trait.Data',
		$requires:
		[
			'acme.app.demo.lib.Foo',
			'acme.app.demo.lib.Bar',
			'acme.app.demo.lib.Baz'
		],
		$final:	true
	}
)
(
	{},
	{
		//...
	}
);
```


## Meta Data

JSKK enables you to associate any arbitrary information with the class through key-value pairs.

These meta data items should not be represented as labels and should not begin with `$`.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo.controller',
		$name:		'User',
		$extends:	'acme.app.demo.base.Controller',
		$implements:'acme.app.demo.iface.Data',
		$uses:		'acme.app.demo.trait.Data',
		$requires:
		[
			'acme.app.demo.lib.Foo',
			'acme.app.demo.lib.Bar',
			'acme.app.demo.lib.Baz'
		],
		$final:	true,
		
		//Meta Data
		'description': 'Documentation class which cannot be extended.',
		'version':		'1.0.0'
	}
)
(
	{},
	{
		//...
	}
);
```

## Static Stuff

As mentioned in the introduction, the class body block is broken into two parts. The first block is for defining static properties and methods.

This is commonly where you would place class constants.

These are accessed through the class BEFORE it's initalized.

Example: 

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main'
	}
)
(
	{
		VERSION:	'1.0.0',
		API_URL:	'http://api.acme.org/',
		myFunc:		function()
		{
			//Do Something...
		}
	},
	{
		//...
	}
);
```

console.log(acme.app.demo.myFunc());
console.log(acme.app.demo.API_URL);
console.log(acme.app.demo.VERSION);


## Reflection

JSKK comes with a reflector. It is rather simple but it provides just enough for what you'll need when using the framework.

Reflection is performed by calling the method `$reflect`. This method is always available to every JSKK class and is accessed locally through `this.$reflect()`.

There are many reflection properties available. By not passing any property key to `$reflect`, it will return all reflection properties as an object with key value pairs.

Here are the available reflection properties:

#### type

This will return the JSKK object type. The possible returned values are:

* Class
* Interface
* Trait

#### namespace

This is the namespace which the class has been defined in.

#### name

This is the name of the class.

#### fullname

This will return the class namespace, concatinated with the class name.

#### extends

This will return an array of classes which the class extends.

#### implements

This will return an array of interfaces which the class implements.

#### uses

This will return an array of traits which the class uses.

#### abstract

This will return true or false depending on weather or not the class has been delcared as abstract.

#### final

This will return true or false depending on weather or not the class has been delcared as final.

#### requires

This will return an array of traits which the class uses.

#### self

This will return the static representation of the class.

Say we have defined the class `acme.app.demo.Main`.

```js
$JSKK.Class.create
(
	{
		$namespace:	'acme.app.demo',
		$name:		'Main'
	}
)
(
	{
		VERSION:	'1.0.0'
	},
	{
		//...
	}
);
```


Let's assume you wanted to access one of it's constants from within the class. You could do that 1 of 2 ways.

The first:

```js
(
	{
		VERSION:	'1.0.0'
	},
	{
		init: function()
		{
			console.log(acme.app.demo.Main.VERSION);
		}
	}
);
```

The Second (with reflection):

```js
(
	{
		VERSION:	'1.0.0'
	},
	{
		init: function()
		{
			console.log(this.$reflect('self').VERSION);
		}
	}
);
```
