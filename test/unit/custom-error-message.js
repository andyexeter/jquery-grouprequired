(function (addTest) {
    'use strict';

    addTest('custom error message', {
        form: '#custom-error-message',
        setup: function () {
            return {
                errorMessage: 'Hello World'
            };
        },
        onInvalid: function(assert, input) {
            assert.equal(input.validationMessage, 'Hello World');
        }
    });

    addTest('custom error message as function', {
        form: '#custom-error-message',
        setup: function () {
            return {
                errorMessage: function() {
                    return 'Hello World Function';
                }
            };
        },
        onInvalid: function(assert, input) {
            assert.equal(input.validationMessage, 'Hello World Function');
        }
    });
})($.fn.groupRequired.addUnitTest);
