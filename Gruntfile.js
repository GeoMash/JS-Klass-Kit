module.exports = function(grunt)
{
	var BANNER=	"/*\r\n"
				+' JSKK v<%= pkg.version %>'
				+' | (c) 2011, 2013 Timothy Chandler <tim@s3.net.au>'
				+' | http://github.com/melechi/JS-Klass-Kit/blob/master/LICENSE '
				+"\r\n"
				+' Date Built: <%= grunt.template.today("yyyy-mm-dd") %>'
				+"\r\n*/\r\n";
	
	// Project configuration.
	grunt.initConfig
	(
		{
			pkg:	grunt.file.readJSON('package.json'),
			concat:
			{
				options:
				{
					stripBanners:	true,
					banner:			BANNER,
				},
				dist:
				{
					src:
					[
						'src/extension/Object.js',
						'src/extension/Function.js',
						'src/extension/Array.js',
						'src/extension/String.js',
						'src/Core.js',
						'src/Interface.js',
						'src/Trait.js',
						'src/Class.js',
						'src/When.js',
						'src/iface/Configurable.js',
						'src/iface/Observable.js',
						'src/trait/Configurable.js',
						'src/trait/Observable.js',
						'src/trait/Timeable.js'
					],
					dest:	'dist/<%= pkg.name %>-<%= pkg.version %>.js'
				}
			},
			copy:
			{
				main:
				{
					files:
					[
						{
							src:	'dist/<%= pkg.name %>-<%= pkg.version %>.js',
							dest:	'dist/<%= pkg.name %>-<%= pkg.version_major %>.<%= pkg.version_minor %>-latest.js'
						}
					]
				}
			},
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
							src:	'dist/<%= pkg.name %>-<%= pkg.version %>.js',
							dest:	'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
						}
					]
				}
			}
		}
	);

	// Load the plugin that provides the 'uglify' task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['concat','copy','uglify']);

};