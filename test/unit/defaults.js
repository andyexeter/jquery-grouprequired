/* global QUnit:false, $:false */
QUnit.test('change default options', function (assert) {
	'use strict';

	// Change instance option from default
	var defaults = $.extend({}, $.fn.groupRequired.defaults);

	var $form   = $('#second'),
		$inputs = $form.find('input[type=tel]');

	$inputs.groupRequired({
		namespace: 'groupRequiredUnitTest1'
	});

	assert.notStrictEqual($inputs.groupRequired('getOptions').namespace, defaults.namespace, 'option changed from default.');

	var namespace = 'groupRequiredUnitTest2';

	// Change default
	$.fn.groupRequired.defaults.namespace = namespace;

	$inputs.groupRequired('destroy');

	$inputs.groupRequired();

	assert.strictEqual($inputs.groupRequired('getOptions').namespace, namespace, 'default option changed.');
});

