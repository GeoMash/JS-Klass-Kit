module.exports = function(grunt)
{
	var	BANNER=
		[
			"/*\r\n",
			' JSKK v<%= pkg.version %>',
			' | (c) 2014 Timothy Chandler <tim@geomash.com>',
			' | http://github.com/melechi/JS-Klass-Kit/blob/master/LICENSE ',
			"\r\n",
			' Date Built: <%= grunt.template.today("yyyy-mm-dd") %>',
			"\r\n*/\r\n",
			"\r\n",
		].join(''),
		nodeJSFix="if (typeof define!=='function'){var define=require('amdefine')(module);}\r\n";
	

	// Project configuration.
	grunt.initConfig
	(
		{
			pkg:	grunt.file.readJSON('package.json'),
			uglify:
			{
				dist:
				{
					options:
					{
						banner:	BANNER
					},
					files:
					[
						{
							src:	'bin/<%= pkg.name %>.js',
							dest:	'bin/<%= pkg.name %>.min.js'
						}
					]
				}
			},
			copy:
			{
				main:
				{
					files:
					[
						{
							src: 	'bin/<%= pkg.name %>.js',
							dest: 	'bin/<%= pkg.name %>.<%= pkg.version %>.js',
							filter: 'isFile'
						},
						{
							src: 	'bin/<%= pkg.name %>.min.js',
							dest: 	'bin/<%= pkg.name %>.<%= pkg.version %>.min.js',
							filter: 'isFile'
						}
					]
				}
			},
			requirejs:
			{
				main:
				{
					options:
					{
						baseUrl:		"src/",
						name:			"JSKK",
						optimize:		"none",
						shim:			grunt.file.readJSON('Shim.json'),
						wrapShim:		true,
						out:			"bin/<%= pkg.name %>.js"
					}
				}
			},
			file_append:
			{
				default_options:
				{
					files:
					[
						{
							prepend:	nodeJSFix,
							input:		'bin/<%= pkg.name %>.js',
							output:		'bin/<%= pkg.name %>.js'
						}
					]
				}
			}
		}
	);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-file-append');
	
	// grunt.registerTask('default', ['requirejs','uglify','copy']);
	grunt.registerTask('default', ['requirejs','file_append','uglify','copy']);

};