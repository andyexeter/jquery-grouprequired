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
