module.exports = function(grunt)
{
	var BANNER=	"/*\r\n"
				+' JSKK v<%= pkg.version %>'
				+' | (c) 2011, 2013 Timothy Chandler <tim@geomash.com>'
				+' | http://github.com/melechi/JS-Klass-Kit/blob/master/LICENSE '
				+"\r\n"
				+' Date Built: <%= grunt.template.today("yyyy-mm-dd") %>'
				+"\r\n*/\r\n";
	
	// Project configuration.
	grunt.initConfig
	(
		{
			pkg:	grunt.file.readJSON('package.json'),
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
							src:	'bin/<%= pkg.name %>.<%= pkg.version %>.js',
							dest:	'bin/<%= pkg.name %>.<%= pkg.version %>.min.js'
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
						stripBanners:	true,
						banner:			BANNER,
						baseUrl:		"src/",
						name:			"JSKK",
						optimize:		"none",
						out:			"bin/<%= pkg.name %>.<%= pkg.version %>.js",
						shim:			grunt.file.readJSON('Shim.json'),
						wrapShim:		true
					}
				}
			}
		}
	);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs','uglify']);

};