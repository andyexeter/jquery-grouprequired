module.exports = function( grunt ) {
	'use strict';

	grunt.option( 'stack', true );
	grunt.util.linefeed = '\n';

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			dist: {
				src: 'src/jquery.grouprequired.js'
			},
			grunt: {
				options: {
					node: true
				},
				src: 'Gruntfile.js'
			}
		},

		includes: {
			dist: {
				options: {
					includeRegexp: /^(\s*)\/\/\s*include\s+['"]?([^'"]+)['"]?\s*$/,
					banner: '/**\n' +
					' * <%= pkg.name %> v<%= pkg.version %>\n' +
					' *\n' +
					' * @author <%= pkg.author %>\n' +
					' * @license <%= pkg.license %>\n' +
					' */\n'
				},
				src: 'src/boilerplate.js',
				dest: 'dist/jquery.grouprequired.js'
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: false,
					report: 'gzip',
					preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
				},
				src: 'dist/jquery.grouprequired.js',
				dest: 'dist/jquery.grouprequired.min.js'
			}
		},

		watch: {
			js: {
				files: [ '<%= jshint.dist.src %>' ],
				tasks: [ 'jshint:dist', 'includes:dist', 'uglify:dist' ]
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-includes' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', [
		'jshint',
		'includes:dist',
		'uglify:dist'
	] );
};
