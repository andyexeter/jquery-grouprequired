(function (addTest) {
    'use strict';

    addTest('form with radio buttons should submit if one radio button is checked', {
        form: '#radios',
        setup: function ($inputs) {
            $inputs.prop('checked', false).last().prop('checked', true);
        }
    });
})(window.addUnitTest);

