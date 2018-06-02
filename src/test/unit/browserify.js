/* global QUnit:false */
QUnit.test('browserify require should attach plugin to required version of jQuery', function (assert) {
	'use strict';

	var $ = require('jquery');

	require('../../../dist/jquery.grouprequired')($);

	assert.ok($.isFunction($.fn.groupRequired));
});
