/* global QUnit:false, $:false */
QUnit.test( 'change default options', function( assert ) {
	'use strict';

	// Change instance option from default

	var defaults = $.extend( {}, $.fn.groupRequired.defaults );

	var $form   = $( '#second' ),
		$inputs = $form.find( 'input[type=tel]' );

	$inputs.groupRequired( {
		namespace: 'groupRequiredUnitTest1'
	} );

	var settings = $inputs.groupRequired( 'getOptions' );

	assert.notStrictEqual( settings.namespace, defaults.namespace, 'option changed from default.' );

	// Change default

	$.fn.groupRequired.defaults.namespace = 'groupRequiredUnitTest2';

	$inputs.groupRequired( 'destroy' );

	$inputs.groupRequired();

	var namespace = $inputs.groupRequired( 'getOptions' ).namespace;

	assert.strictEqual( namespace, 'groupRequiredUnitTest2', 'default option changed.' );
} );

