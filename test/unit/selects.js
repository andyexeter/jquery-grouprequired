(function( addTest ) {
	'use strict';

	addTest( 'form with selects should submit if one select box has a selected option', {
		form: '#selects',
		setup: function( $inputs ) {
			var $select = $inputs.first();

			$select.val( $select.find( 'option' ).last().val() );
		}
	} );
})( $.fn.groupRequired.addUnitTest );
