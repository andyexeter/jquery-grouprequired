/**
 * jquery-grouprequired v2.2.0
 *
 * @author Andy Palmer <andy@andypalmer.me>
 * @license MIT
 */
(function (factory) {
    // Universal Module Definition
    /* jshint strict: false */
    if (typeof module === 'object' && module.exports) {
        // Node/CommonJS (Browserify/Webpack)
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    /* jshint unused: vars */

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
            this.$el.each(function () {
                var origRequired = $(this).data('origRequired.' + pluginName);

                if (origRequired) {
                    $(this).attr('required', origRequired);
                } else {
                    $(this).removeAttr('required');
                }
            });

            // Remove all events and data added by the plugin.
            return this.$el
                .off('.' + this.options.namespace)
                .removeData([pluginName + '.plugin', 'origRequired.' + pluginName]);
        }
    };

    /**
     * Sets the required property of all other elements in the group based on the value of the given
     * element and the custom required filter function.
     *
     * Used as a handler for the 'input' event AND to initialise the plugin.
     *
     * @param {jQuery} $element
     * @param {jQuery.Event} event
     */
    Plugin.setRequired = function ($element, event) {
        /* jshint: validthis */
        var required = ($element.is(':checkbox,:radio')) ? !$element.is(':checked') : !$element.val().length;

        this.$el.each(function () {
            // Store this element's original 'required' attribute, for when the destroy method is called.
            if (event) {
                this.setCustomValidity('');
            } else {
                $(this).data('origRequired.' + pluginName, $(this).attr('required'));
            }
        });

        if ($.isFunction(this.options.requiredFilter)) {
            required = this.options.requiredFilter.call($element, required, this, event);
        }

        this.$el.not($element).prop('required', required);
    };

    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, (typeof options === 'object') ? options : {});

        var _this = this;
        var $inputs = this.$el;

        $inputs
            .each(function () {
                this.setRequired($(this));
            })
            .on('input.' + this.options.namespace + ' change.' + this.options.namespace, function (event) {
                this.setRequired($(this), event);
            })
            .on('invalid.' + this.options.namespace, function (event) {
                var errorMessage = _this.options.errorMessage;

                if ($.isFunction(errorMessage)) {
                    errorMessage = errorMessage.call(this, $inputs, _this.options, event);
                }

                this.setCustomValidity(errorMessage);
            });
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

}));
