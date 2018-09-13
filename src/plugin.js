'use strict';

var pluginName = 'groupRequired';

Plugin.prototype = {

    /**
     * Returns the plugin instance's options object.
     *
     * @returns {object}
     */
    getOptions: function () {
        return this.options;
    },

    /**
     * Destroys the plugin instance.
     *
     * @returns {jQuery}
     */
    destroy: function () {
        // Reset each element's 'required' attribute.
        this.$els.each(function () {
            var origRequired = $(this).data('origRequired.' + pluginName);

            if (origRequired) {
                $(this).attr('required', origRequired);
            } else {
                $(this).removeAttr('required');
            }
        });

        // Remove all events and data added by the plugin.
        return this.$els
            .off('.' + this.options.namespace)
            .removeData([pluginName + '.plugin', 'origRequired.' + pluginName]);
    }
};

/**
 *
 * @param {jQuery} $elements
 * @param {Object} options
 * @constructor
 */
function Plugin($elements, options) {
    this.$els = $elements;
    this.options = $.extend({}, $.fn[pluginName].defaults, options);

    var _this = this;

    this.$els
        .each(function () {
            setRequired.call(_this, $(this));
        })
        .on('input.' + this.options.namespace + ' change.' + this.options.namespace, function (event) {
            setRequired.call(_this, $(this), event);
        })
        .on('invalid.' + this.options.namespace, function (event) {
            var errorMessage = _this.options.errorMessage;

            if ($.isFunction(errorMessage)) {
                errorMessage = errorMessage.call(this, _this, event);
            }

            this.setCustomValidity(errorMessage);
        });
}

/**
 * Sets the required property of all other elements in the group based on the value of the given
 * element and the custom required filter function.
 *
 * Used as a handler for the 'input' event AND to initialise the plugin.
 *
 * @param {jQuery} $element
 * @param {jQuery.Event} [event]
 */
function setRequired($element, event) {
    /* jshint validthis: true */

    this.$els.each(function () {
        if (event) {
            this.setCustomValidity('');
        } else {
            // Store this element's original 'required' attribute, for when the destroy method is called.
            $(this).data('origRequired.' + pluginName, $(this).attr('required'));
        }
    });

    var required = $element.is(':checkbox,:radio') ? !$element.is(':checked') : !$element.val().length;

    if ($.isFunction(this.options.requiredFilter)) {
        required = this.options.requiredFilter.call($element, required, this, event);
    }

    this.$els.not($element).prop('required', required);
}

$.fn[pluginName] = function (options) {
    var plugin = this.data(pluginName + '.plugin');

    if (!plugin) {
        plugin = new Plugin(this, options);
        this.data(pluginName + '.plugin', plugin);
    }

    if ($.isFunction(Plugin.prototype[options])) {
        return plugin[options].apply(plugin, Array.prototype.slice.call(arguments, 1));
    }

    return this;
};

$.fn[pluginName].defaults = {
    namespace: 'groupRequired',
    requiredFilter: null,
    errorMessage: ''
};
