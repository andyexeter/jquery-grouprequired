(function (addTest) {
    'use strict';

    addTest('form with telephone inputs should submit if at least one of two fields are not empty', {
        form: '#first',
        setup: function ($inputs) {
            $inputs.eq(0).val('123456');
        }
    });
})($.fn.groupRequired.addUnitTest);
