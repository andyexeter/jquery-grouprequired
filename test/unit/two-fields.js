/* global QUnit:false, $:false */
QUnit.test( 'form with telephone inputs should submit if at least one of two fields are not empty', function( assert ) {
	'use strict';

	var done = assert.async();

	$( function() {
		var $form   = $( '#first' ),
			$inputs = $form.find( 'input[type=tel]' );

		$inputs.val( '' )
			   .eq( 0 ).val( '123456' )
			   .end()
			   .groupRequired();

		$inputs.eq( -1 ).one( 'invalid', function() {
			assert.ok( false, 'Form was not submitted.' );
			done();
		} );

		$form.one( 'submit', function( e ) {
			e.preventDefault();

			assert.ok( true, 'Form was submitted.' );
			done();
		} );

		$form.find( '[type=submit]' ).click();
	} );

} );
