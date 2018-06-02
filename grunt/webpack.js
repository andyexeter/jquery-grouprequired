module.exports = function () {
    'use strict';

    var path = require('path');

    return {
        test: {
            entry: './src/test/unit/webpack.js',
            mode: 'development',
            output: {
                path: path.resolve('./test/unit'),
                filename: 'webpack.js'
            }
        }
    };
};
