/**
 * jquery-grouprequired v0.9.9
 *
 * @author Andy Palmer <andy@andypalmer.me>
 * @license MIT
 */
(function( factory ) {
	// Universal Module Definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ 'jquery' ], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// Node/CommonJS
		module.exports = factory( require( 'jquery' ) );
	} else {
		// Browser globals
		factory( jQuery );
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
