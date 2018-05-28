'use strict';

var pluginName = 'groupRequired';

var publicAPI = {
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
     * @returns {boolean}
     */
    destroy: function () {
        // Reset each element's 'required' attribute.
        this.$el.each(function () {
            var origRequired = $(this).data('origRequired.' + pluginName);

            if (typeof origRequired === 'undefined') {
                $(this).removeAttr('required');
            } else {
                $(this).attr('required', origRequired);
            }
        });

        // Remove all events and data added by the plugin.
        return this.$el
            .off('.' + this.options.namespace)
            .removeData([pluginName + '.plugin', 'origRequired.' + pluginName]);
    }
};

var privateAPI = {
    init: function () {
        var _this = this;
        var $inputs = this.$el;

        $inputs
            .each(function () {
                privateAPI.setRequired.call(_this, $(this));
            })
            .on('input.' + this.options.namespace + ' change.' + this.options.namespace, function (event) {
                privateAPI.setRequired.call(_this, $(this), event);
            })
            .on('invalid.' + this.options.namespace, function (event) {
                var errorMessage = '';

                if (typeof _this.options.errorMessage === 'string') {
                    errorMessage = _this.options.errorMessage;
                } else if ($.isFunction(_this.options.errorMessage)) {
                    errorMessage = _this.options.errorMessage.call(this, errorMessage, $inputs, _this.options, event);
                }

                this.setCustomValidity(errorMessage);
            });
    },
    setRequired: function ($element, event) {
        var required = ($element.is(':checkbox,:radio')) ? !$element.is(':checked') : !$element.val().length;

        // If there's no event argument the function has been called on DOM ready.
        if (typeof event === 'undefined') {
            this.$el.each(function () {
                // Store this element's original 'required' attribute, for when the destroy method is called.
                $(this).data('origRequired.' + pluginName, $(this).attr('required'));
            });
        } else {
            this.$el.each(function () {
                // Clear custom validity message to stop browsers firing an 'invalid' event for this element.
                this.setCustomValidity('');
            });
        }

        if ($.isFunction(this.options.requiredFilter)) {
            required = this.options.requiredFilter.call($element, required, this, event);
        }

        this.$el.not($element).prop('required', required);
    }
};

function Plugin(element, options) {
    this.$el = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, (typeof options === 'object') ? options : {});

    privateAPI.init.call(this);
}

$.extend(Plugin.prototype, publicAPI);

$.fn[pluginName] = function (options) {
    var plugin = this.data(pluginName + '.plugin');

    if (!plugin) {
        plugin = new Plugin(this, options);
        this.data(pluginName + '.plugin', plugin);
    }

    if (typeof options === 'string') {
        if ($.isFunction(publicAPI[options])) {
            return plugin[options].apply(plugin, Array.prototype.slice.call(arguments, 1));
        }
    }

    return this;
};

$.fn[pluginName].defaults = {
    namespace: 'groupRequired',
    requiredFilter: false,
    errorMessage: false
};
