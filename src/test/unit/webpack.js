/* global QUnit:false */
QUnit.test('webpack', function (assert) {
    'use strict';

    var $ = require('jquery');

    require('../../../dist/jquery.grouprequired')($);

    assert.ok($.isFunction($.fn.groupRequired));
});
