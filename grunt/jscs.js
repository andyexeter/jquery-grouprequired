module.exports = {
    options: {
        config: '.jscsrc'
    },
    src: {
        src: 'src/**/*.js'
    },
    dist: {
        src: '<%= files.main %>'
    },
    grunt: {
        src: 'Gruntfile.js'
    }
};
