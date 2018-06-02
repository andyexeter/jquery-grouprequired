(function (addTest) {
    'use strict';

    addTest('form with telephone inputs should submit if at least one of two fields are not empty', {
        form: '#first',
        setup: function ($inputs) {
            $inputs.eq(0).val('123456');
        }
    });

    addTest('form with telephone inputs should not submit if both fields are empty', {
        form: '#first',
        setup: function ($inputs) {
            $inputs.val('');
        },
        onInvalid: function (assert) {
            assert.ok(true, 'Form was not submitted.');
        }
    });
})($.fn.groupRequired.addUnitTest);
