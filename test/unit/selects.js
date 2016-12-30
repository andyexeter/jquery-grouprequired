/* global QUnit:false, $:false */
QUnit.test( 'form with selects should submit if one select box has a selected option.', function( assert ) {
	'use strict';

	var done = assert.async();

	$( function() {
		var $form   = $( '#selects' ),
			$selects = $form.find( 'select' );

		var $select = $selects.first();

		$select.val( $select.find( 'option' ).last().val() );

		$selects.groupRequired();

		$selects.eq( -1 ).one( 'invalid', function() {
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
