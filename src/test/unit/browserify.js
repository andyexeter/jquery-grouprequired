/* global QUnit:false */
QUnit.test('browserify', function (assert) {
	'use strict';

	var $ = require('jquery');

	require('../../../dist/jquery.grouprequired')($);

	assert.ok($.isFunction($.fn.groupRequired));
});
