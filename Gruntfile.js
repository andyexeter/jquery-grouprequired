module.exports = function( grunt ) {
	'use strict';

	grunt.option( 'stack', true );
	grunt.util.linefeed = '\n';

	grunt.initConfig( {
		pkg: getProcessedJSON( 'package.json' ),

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

		jscs: {
			options: {
				config: '.jscsrc'
			},
			src: {
				src: 'src/**/*.js'
			},
			dist: {
				src: 'dist/jquery.grouprequired.js'
			},
			grunt: {
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
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.loadNpmTasks( 'grunt-includes' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', [
		'jshint',
		'jscs',
		'dist'
	] );

	grunt.registerTask( 'dist', [
		'includes:dist',
		'uglify:dist'
	] );

	grunt.registerTask( 'readme', function() {
		var data = {
			pkg: getProcessedJSON( 'package.json' ),
			bwr: getProcessedJSON( 'bower.json' ),
			files: {}
		};

		data.files.main = getFile( 'dist/jquery.grouprequired.js' );
		data.files.min = getFile( 'dist/jquery.grouprequired.min.js' );

		var tpl = grunt.template.process( grunt.file.read( 'src/README.tpl.md' ), { data: data } );

		grunt.file.write( 'README.md', tpl );
	} );

	function getProcessedJSON( filepath, data ) {
		var contents = grunt.file.read( filepath );

		var processed = grunt.template.process( contents, data );

		return JSON.parse( processed );
	}

	var path = require( 'path' );
	var zlib = require( 'zlib' );

	function getFile( filepath ) {
		var contents = grunt.file.read( filepath );

		return {
			name: path.basename( filepath ),
			size: humanFileSize( contents.length ),
			gzipped: humanFileSize( zlib.gzipSync( contents, { level: 9 } ).length )
		};
	}

	function humanFileSize( size ) {
		var i = Math.floor( Math.log( size ) / Math.log( 1024 ) );
		return ( size / Math.pow( 1024, i ) ).toFixed( 2 ) * 1 + '' + [ 'B', 'kB', 'MB', 'GB', 'TB' ][ i ];
	}
};
