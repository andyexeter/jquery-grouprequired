/**
 * jquery-grouprequired v2.0.6
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
	/* jshint unused: vars */

	'use strict';

	var pluginName = 'groupRequired';

	$.fn[ pluginName ] = function( options ) {
		var $inputs = this;

		options = $.extend( {}, $.fn[ pluginName ].defaults, options );

		$inputs.prop( 'required', true );

		$inputs
			.on( 'input.' + options.namespace + ' change.' + options.namespace, function( event ) {
				var $this    = $( this ),
					required = ( $this.is( ':checkbox,:radio' ) ) ? !$this.is( ':checked' ) : !$this.val().length;

				$inputs.each( function() {
					this.setCustomValidity( '' );
				} );

				if ( $.isFunction( options.requiredFilter ) ) {
					required = options.requiredFilter.call( this, required, $inputs, options, event );
				}

				$inputs.not( this ).prop( 'required', required );
			} )
			.on( 'invalid.' + options.namespace, function( event ) {
				var errorMessage = '';

				if ( typeof options.errorMessage === 'string' ) {
					errorMessage = options.errorMessage;
				} else if ( $.isFunction( options.errorMessage ) ) {
					errorMessage = options.errorMessage.call( this, errorMessage, $inputs, options, event );
				}

				this.setCustomValidity( errorMessage );
			} );

		return this;
	};

	$.fn[ pluginName ].defaults = {
		namespace: 'groupRequired',
		requiredFilter: false,
		errorMessage: false
	};

} ) );
