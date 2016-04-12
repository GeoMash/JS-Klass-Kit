Namespaces
----------

Namespaces are used to organise objects into logical containers. They are actually just objects, which 

JSKK manages namespaces for you automagically. By specifying a namespace in your class, JSKK will create the namespace and place the class in that namespace.

An example of a namespace in action:

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
		//...
	}
);

var app=new acme.app.demo.Main();
app.myFunc();
```

Notice we use a string. You cannot use a literal object as part of the namespace may not exist yet. JSKK will create the namespace objects for you.

You can also convert a string representation of a namespace to an object with `$JSKK.namespace()`.

Example:

```js
var container=$JSKK.namespace('acme.app.demo');
console.log(container);
``

