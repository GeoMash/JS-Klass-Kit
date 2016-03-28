JS-Klass-Kit
============

## This Repo is Deprecated
For the latest version please see [JSKK](https://github.com/GeoMash/JS-Klass-Kit).


------


JSKK is a classing engine which brings object-oriented programming to the popular JavaScript language.
JSKK allows you to create classes and extend those classes, attach interfaces, mix-in traits and a
whole lot more. JSKK is light weight and easy to implement, has built in require.js support and
is compatible with node.js.

Key Features
------------

* True Object Oriented JavaScript. Give structure and meaning to your code.
* Full **Inheritance** model, allowing proper Aspect Oriented Programming.
* Model your classes around **Interfaces**.
* Class & Method **Abstraction**.
* Class **Finalisation**.
* Reusable code with **Traits**.
* Define **Required** classes and have them loaded dynamically before the class is executed.
* React to change with JSKK's variable condition watching engine.
* Built-In [RequireJS](http://requirejs.org/) compatibility.

Browser Compatibility
---------------------

* IE 8+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

How to Build JSKK
--------------------

### Install Grunt

Strappy is built using [Grunt](http://gruntjs.com/).

```
npm install -g grunt-cli
npm install
```

With grunt installed, you can not only build JSKK from source.

### Build JSKK

Use [NPM Version](https://docs.npmjs.com/cli/version)

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease] [-m "version commit message"]
```

This will:

- build new dist and minified dist files (by that version number)
- add them to a new commit with the given commit message
- git tag the version
- push the commit and tag to git
- publish the version to bower and npm (implicitly)

Roadmap
-------



