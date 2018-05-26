/* global QUnit:false */
(function () {
    'use strict';

    /**
     * Adds a QUnit test for the jQuery groupRequired plugin.
     *
     * This exists as a convenience function wrapping similar/duplicate functionality
     * used in multiple tests into a single, reusable method.
     *
     * @param {string} name - Name of the unit test.
     *
     * @param {object} options
     * @param {string} options.form - Selector string for this test's form
     * @param {string} [options.inputs] - Selector string for inputs within options.form
     * @param {function} [options.setup] - Called before the plugin is initialised, events are added and the form is submitted
     * @param {function} [options.afterSetup] - Called after the plugin is initialised and events are added
     * @param {function} [options.onInvalid] - Called when the 'invalid' event fires for an input element
     * @param {function} [options.onSubmit] - Called when the 'submit' event fires for the form
     */
    function addUnitTest(name, options) {
        options = $.extend({}, addUnitTest.defaults, options);

        QUnit.test(name, function (assert) {
            var done = assert.async();

            // When the DOM is ready.
            $(function () {
                var $form   = $(options.form),
                    $inputs = $form.find(options.inputs);

                $inputs.val('');

                // Call the 'setup' method for this test.
                options.setup($inputs, $form);

                $inputs.groupRequired();

                $inputs.eq(-1).one('invalid', function () {
                    options.onInvalid(assert);

                    done();
                });

                $form.one('submit', function (e) {
                    e.preventDefault();

                    options.onSubmit(assert);

                    done();
                });

                // Call the 'afterSetup' method for this test.
                options.afterSetup($inputs, $form);

                // Fix for grunt-contrib-qunit. PhantomJS doesn't appear to call checkValidity() before
                // submitting the form so the 'invalid' event never fires.
                if ($form.get(0).checkValidity()) {
                    $form.find('[type=submit]').last().trigger('click');
                }
            });
        });
    }

    addUnitTest.defaults = {
        inputs: ':input:not([type=button]):not([type=submit]):not([type=reset])',
        setup: function () {
        },
        afterSetup: function () {
        },
        onInvalid: function (assert) {
            assert.ok(false, 'Form was not submitted.');
        },
        onSubmit: function (assert) {
            assert.ok(true, 'Form was submitted.');
        }
    };

    // Add as a property of the plugin so we don't pollute the global namespace
    $.fn.groupRequired.addUnitTest = addUnitTest;
})();
