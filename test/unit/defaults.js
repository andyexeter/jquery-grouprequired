/* global QUnit:false, $:false */
QUnit.test( 'change default options', function( assert ) {
	'use strict';

	var defaults = $.extend( {}, $.fn.groupRequired.defaults );


	var $form   = $( '#first' ),
		$inputs = $form.find( 'input[type=tel]' );

	$inputs.groupRequired( {
		namespace: 'groupRequiredUnitTest'
	} );

	var settings = $inputs.groupRequired( 'options' );

	console.log(settings);

	assert.notStrictEqual( settings.namespace, defaults.namespace, 'option changed from default.' );
} );

