Getting Started
---------------

#### 1. Install Packages

JSKK depends on RequireJS. So install that along with JSKK.

``sh
$ npm install --save jskk requirejs
``


#### 2. RequireJS Configuration

Create a file `src/main.js`. This will be the entry point of your application. This must contain the RequireJS config, and initialize your application. Normally we would have a separate file for each class we create. But for this simple example, we'll put it in the `main.js` file.


**main.js**

``javascript
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

#### 3. Create a Class.

Add the following to the `scr/main.js`, just after the `require.config()`.

**main.js**

``
require
(
	['JSKK'],
	function()
	{
		$JSKK.Class.create('Application')
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
		var app=new Application();
		document.getElementsByTagName('h2')[0].innerHTML='App Version v'+Application.VERSION;
	}
);
``

#### 4. HTML Example

Because we're using RequireJS, we only need to specify 1 script tag, which loads RequireJS. We add an additional property `data-main` to the script tag so that RequireJS knows the entry point of your application.

**index.html**

``html
<!DOCTYPE html>
<html>
	<head>
		<title>JSKK Intro</title>
	</head>
	<body>
		<h1></h1>
		<h2></h2>
		<script data-main="src/main" src="node_modules/requirejs/require.js" async></script>
	</body>
</html>
``

### 5. Run it!

Load up index.html in your browser and see the result.

JSKK is capable of much more. This really is just the beginning of your new Object Oriented JavaScript journey. Read through the rest of the JSKK documentation to discover it's full capabilities.

