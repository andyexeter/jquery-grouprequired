(function (addTest) {
    'use strict';

    addTest('form with checkboxes should submit if one checkbox is checked', {
        form: '#checkboxes',
        setup: function ($inputs) {
            $inputs.prop('checked', false).last().prop('checked', true);
        }
    });
})($.fn.groupRequired.addUnitTest);
