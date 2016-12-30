/* global QUnit:false, $:false */
QUnit.test( 'form with radio buttons should submit if one radio button is checked.', function( assert ) {
	'use strict';

	var done = assert.async();

	$( function() {
		var $form   = $( '#radios' ),
			$inputs = $form.find( 'input[type=radio]' );

		$inputs.prop( 'checked', false ).last().prop( 'checked', true );

		$inputs.groupRequired();

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
