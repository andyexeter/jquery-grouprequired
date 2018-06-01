module.exports = function () {
    'use strict';

    var path = require('path');

    return {
        blah: {
            entry: './src/test/unit/webpack.js',
            mode: 'development',
            output: {
                path: path.resolve(__dirname, '../test/unit'),
                filename: 'webpack.js'
            }
        }
    };
};
