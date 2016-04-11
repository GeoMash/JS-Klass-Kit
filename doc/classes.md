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

``js
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
``

## Simple Class Creation

This method of class creation accepts a simple string which follows the same rules and conventions as standard variables.
Note that this means it does not support namespaces.

``js
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
``

This will create the class "Application" with no static properties or methods and an instnace method named "myFunc". It can be used like this:

``js
var app=new Application();
app.myFunc();
``

## Advanced Class Creation

This method of class creation accepts an object with label or key value pairs.

Here is the same class as above, using the advanced method.


``js
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
``
As you can see, it is used in the exact same way as the basic example above. However the definition block looks more verbose. That's okay though, because we get a lot more power and control over the class like this.

There are more labels than `$name`. But `$name` is the one that is always required. Without it, your class cannot be accessed and cannot function.

Let's look at all the labels and see how they can be used:

#### $name

Defines the name of the class.

Note that this is the only label which is required.

#### $namespace

Namespaces are used to organise objects into logical containers.

JSKK manages namespaces for you automagically. By specifying a namespace, JSKK will create the namespace and place the class in that namespace.

``js
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
``


#### $extends

Inheritance is fundemental to object oriented programming. It allows you to build upon existing functionality and encourages code reuse.

JSKK supports class inheritance by use of the `$extends` label.

``js
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
``

The above is a big example. And there is a lot going on. If you are new to JSKK, some of the things there may seem a little forign to you. You can learn about them in the JSKK Extensions section.

There is a base class `acme.app.demo.base.Controller` which the new class `acme.app.demo.controller.User` extends from.

The constructor is represented as the `init` method, and it is automatically executed when the class is initalized.


``js
init: function(id)
{
	this.id=id;
	this.init.$parent('http://api.acme.org/');
}
``

The init method is overriden, however it's not gone. You can still call the parent class's init method via `$parent`.

In the above example, the init method calls the parent init method and passes it the API URL.

The method `loadData` calls `doRequest`, which is from the parent class. But notice we don't call `$parent` with this one. That's because we havent overwritten this in the `User` class, so we've inherited it from the `Controller` class.

It becomes a first-class member of `User`, so no need to access it via `$parent`.

#### $implements





#### $uses





#### $requires





#### $abstract





#### $final





#### Meta Data





## Static Stuff





## Reflection




