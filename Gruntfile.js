module.exports = function(grunt) {
    "use strict";

    grunt.option("stack", true);
    grunt.util.linefeed = "\n";

    var project = {
        pkg: grunt.file.readJSON("package.json"),

        files: {
            main: "dist/jquery.grouprequired.js",
            min: "dist/jquery.grouprequired.min.js",
            boilerplate: "src/boilerplate.js"
        },

        paths: {}
    };

    require("load-grunt-config")(grunt, {
        data: project
    });
};
