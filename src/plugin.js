'use strict';

var pluginName = 'groupRequired';

var publicAPI = {
	getOptions: function() {
		return this.options;
	},
	destroy: function() {
		this.$el.off( 'input.' + this.options.namespace + ' change.' + this.options.namespace );
		this.$el.off( 'invalid.' + this.options.namespace );

		this.$el.removeData( 'pluginName + '.plugin );

		return true;
	}
};

var privateAPI = {
	init: function() {
		var _this = this;
		var $inputs = this.$el;

		$inputs
			.prop( 'required', true )
			.each( function() {
				privateAPI.setRequired.call( _this, $( this ) );
			} )
			.on( 'input.' + this.options.namespace + ' change.' + this.options.namespace, function( event ) {
				privateAPI.setRequired.call( _this, $( this ), event );
			} )
			.on( 'invalid.' + this.options.namespace, function( event ) {
				var errorMessage = '';

				if ( typeof _this.options.errorMessage === 'string' ) {
					errorMessage = _this.options.errorMessage;
				} else if ( $.isFunction( _this.options.errorMessage ) ) {
					errorMessage = _this.options.errorMessage.call( this, errorMessage, $inputs, _this.options, event );
				}

				this.setCustomValidity( errorMessage );
			} );
	},
	setRequired: function( $element, event ) {
		var required = ( $element.is( ':checkbox,:radio' ) ) ? !$element.is( ':checked' ) : !$element.val().length;

		this.$el.each( function() {
			this.setCustomValidity( '' );
		} );

		if ( $.isFunction( this.options.requiredFilter ) ) {
			required = this.options.requiredFilter.call( $element, required, this, event );
		}

		this.$el.not( $element ).prop( 'required', required );
	}
};

function Plugin( element, options ) {
	this.$el = $( element );
	this.options = $.extend( {}, $.fn[ pluginName ].defaults, ( typeof options === 'object' ) ? options : {} );

	privateAPI.init.call( this );
}

$.extend( Plugin.prototype, publicAPI );

$.fn[ pluginName ] = function( options ) {
	var plugin = this.data( pluginName + '.plugin' );

	if ( !plugin ) {
		plugin = new Plugin( this, options );
		this.data( pluginName + '.plugin', plugin );
	}

	if ( typeof options === 'string' ) {
		if ( $.isFunction( publicAPI[ options ] ) ) {
			return plugin[ options ].apply( plugin, Array.prototype.slice.call( arguments, 1 ) );
		}
	}

	return this;
};

$.fn[ pluginName ].defaults = {
	namespace: 'groupRequired',
	requiredFilter: false,
	errorMessage: false
};
