/* global QUnit:false, $:false */
QUnit.test( 'form with checkboxes should submit if one checkbox is checked.', function( assert ) {
	'use strict';

	var done = assert.async();

	$( function() {
		var $form   = $( '#checkboxes' ),
			$inputs = $form.find( 'input[type=checkbox]' );

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
