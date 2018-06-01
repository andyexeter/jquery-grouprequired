module.exports = function () {
    'use strict';

    var path = require('path');

    console.log(path.resolve(__dirname, '../test/unit'));
    console.log(path.resolve('./src/test/unit/webpack.js'));

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
