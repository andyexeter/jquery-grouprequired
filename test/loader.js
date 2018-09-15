(function () {
    'use strict';

    // Inject full or minified version of script
    var src = '../dist/jquery.grouprequired' + (getUserAgentQuery().min ? '.min' : '') + '.js';
    console.log('');
    console.log('Using ' + src);
    injectScript(src);

    // Inject tests
    [
        'defaults',
        'two-fields',
        'selects',
        'checkboxes',
        'radios',
        'destroy',
        'browserify',
        'webpack',
        'custom-error-message'
    ].forEach(function (value) {
        injectScript('unit/' + value + '.js');
    });

    function injectScript(src) {
        var script = document.createElement('script');

        script.src = src;
        script.async = false;

        document.head.appendChild(script);
    }

    function getUserAgentQuery() {
        var parts = navigator.userAgent.split('?'),
            obj = {};

        if (parts.length > 1) {
            var query = parts[1].split('&'),
                pair;

            for (var i = 0; i < query.length; i++) {
                pair = query[i].split('=');
                obj[pair[0]] = pair[1];
            }
        }

        return obj;
    }
})();
