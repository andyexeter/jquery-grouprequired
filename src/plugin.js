'use strict';

var PLUGIN_NAME = 'groupRequired';

var CHECKABLE_TYPES = ['checkbox', 'radio'];

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
            var origRequired = $(this).data('origRequired.' + PLUGIN_NAME);

            if (origRequired) {
                $(this).attr('required', origRequired);
            } else {
                $(this).removeAttr('required');
            }
        });

        // Remove all events and data added by the plugin.
        return this.$els
            .off('.' + this.options.namespace)
            .removeData([PLUGIN_NAME + '.plugin', 'origRequired.' + PLUGIN_NAME]);
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
    this.options = $.extend({}, $.fn[PLUGIN_NAME].defaults, options);

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

    var required = true;

    this.$els.each(function () {
        if (event) {
            this.setCustomValidity('');
        } else {
            // No event passed so this is plugin initialisation. Store this element's original
            // 'required' attribute for when the destroy method is called.
            $(this).data('origRequired.' + PLUGIN_NAME, $(this).attr('required'));
        }

        if (CHECKABLE_TYPES.indexOf($element.prop('type')) > -1) {
            required = required && !$(this).prop('checked');
        } else {
            required = required && !$(this).val().length;
        }
    });

    if (this.options.requiredFilter) {
        required = this.options.requiredFilter.call($element, required, this, event);
    }

    this.$els.prop('required', required);
}

$.fn[PLUGIN_NAME] = function (options) {
    var plugin = this.data(PLUGIN_NAME + '.plugin');

    if (!plugin) {
        plugin = new Plugin(this, options);
        this.data(PLUGIN_NAME + '.plugin', plugin);
    }

    if ($.isFunction(Plugin.prototype[options])) {
        return plugin[options].apply(plugin, Array.prototype.slice.call(arguments, 1));
    }

    return this;
};

$.fn[PLUGIN_NAME].defaults = {
    namespace: 'groupRequired',
    requiredFilter: null,
    errorMessage: ''
};
