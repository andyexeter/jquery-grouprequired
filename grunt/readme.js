module.exports = function( grunt ) {
	'use strict';

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
