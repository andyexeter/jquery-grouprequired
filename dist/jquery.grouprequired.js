/**
 * jquery-grouprequired v0.9.9
 *
 * @author Andy Palmer <andy@andypalmer.me>
 * @license MIT
 */
(function( factory ) {
	// Universal Module Definition
	/* jshint strict:false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ 'jquery' ], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if ( typeof window !== 'undefined' ) {
					jQuery = require( 'jquery' );
				} else {
					jQuery = require( 'jquery' )( root );
				}
			}
			factory( jQuery );
			return jQuery;
		};
	} else {
		// Browser globals
		factory( window.jQuery );
	}
}( function( $ ) {
	'use strict';

	$.fn.groupRequired = function( options ) {
		var $inputs = this;

		options = $.extend( {}, $.fn.groupRequired.defaults, options );

		$inputs.prop( 'required', true );

		$inputs.on( 'input.' + options.namespace, function() {
			$inputs.not( this ).prop( 'required', !$( this ).val().length );
		} );
	};

	$.fn.groupRequired.defaults = {
		namespace: 'groupRequired'
	};

} ) );
