(function(factory) {
    // Universal Module Definition
    /* jshint strict: false */
    if (typeof module === "object" && module.exports) {
        // Node/CommonJS (Browserify/Webpack)
        module.exports = factory;
    } else if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function($) {
    /* jshint unused: vars */
    // include "plugin.js"
});
