module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc:{
            compile:{
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options:{
                    paths: './',
                    outdir: '../docs/webservice_classes'
                }
            }
        },
        apidoc: {
            mappin: {
                src: "./",
                dest: "../docs/services",
                options:{
                    includeFilters:["routes.js","_apidoc.js"],
                    excludeFilters: [ "node_modules/" ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-apidoc')

    // Default task(s).
    grunt.registerTask('default', ['yuidoc','apidoc']);

};