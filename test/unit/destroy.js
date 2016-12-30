/* global QUnit:false, $:false */
QUnit.test( 'destroy method should remove all traces of plugin instance', function( assert ) {
	'use strict';

	var done = assert.async();

	$( function() {
		var $form   = $( '#destroy' ),
			$inputs = $form.find( 'input[type=tel]' );

		$inputs.val( '' ).groupRequired();

		$inputs.eq( -1 ).one( 'invalid', function() {
			assert.ok( true, 'Form was not submitted.' );
			done();
		} );

		$form.one( 'submit', function( e ) {
			e.preventDefault();

			assert.ok( false, 'Form was submitted.' );
			done();
		} );

		$inputs.groupRequired( 'destroy' );

		$form.find( '[type=submit]' ).click();
	} );

} );
