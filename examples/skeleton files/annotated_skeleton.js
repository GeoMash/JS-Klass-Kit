$JSKK.Class.create
( // This first block is the class-metadata block. It contains information about the class
        {
                $namespace:     'myNamespace',          // <string> a namespace specific to your project or module. (lowerCamelCase)
                $name:          'ClassName',            // <String> the name of this class (UpperCamelCase)
                $extends:       'SuperClass',           // <String> the name of the class this class extends
                $final:         false                           // <bool> if true this class cannot be extended
        }
)       // Yes that's right, 2 blocks of ()() next to eachother.
(       // This second block is the class-content block. It contains the class' actual addtibutes and methods 
        {       // This first content block is the Static block. It contains all static attributes and methods 
                MY_CONSTANT:            'foo',  // Not really constant, but ALL_UPPERCASE implies that you shouldn't mess with it
                someStaticAttribute: 7,
                someStaticMethod: function()
                {
                        console.debug("Static Method Called");
                }
        },
        {       // This second content block is the Instance block. It contains all the instance attribuites and methods    
                myInstanceVariable: null,
                myOtherInstanceVariable: 7, // Default to 7
                init: function(instanceVariable) // A Function named init will be called and passed any paramaters like a constructor
                {
                        this.myInstanceVariable = instanceVariable;
                        console.log('New instance created');
                        
                        // If you do not bind the handleSomeEvent method to this object, any reference to 'this' inside the handleSomeEvent method will not know what 'this' is.
                        someEvent.on('someBehavior', this.handleSomeEvent.bind(this));
                },
                handleSomeEvent: function(event) // Although no paramaters were specified in the above registering of this method, this method will receive whichever paramaters were originally passed in
                {
                        console.log("Handling some event:");
                        console.log(event);
                }
        }
);
var className = new myNamespace.ClassName();    // Creating an instance of this class