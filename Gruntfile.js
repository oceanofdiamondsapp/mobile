module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concat scripts
        concat: {
            app: {
                src: ['./assets/js/**/*.js'],
                dest: './www/js/app.js'
            },

            vendor: {
                src: [
                    './node_modules/angular/angular.js',
                    './node_modules/angular-resource/angular-resource.js',
                    './node_modules/angular-animate/angular-animate.js',
                    './node_modules/angular-ui-router/build/angular-ui-router.js',
                    './node_modules/ui-router-extras/release/ct-ui-router-extras.js',
                    './node_modules/fastclick/lib/fastclick.js',
                    './node_modules/jquery/dist/jquery.js'
                ],

                dest: './www/js/vendor.js'
            }
        },

        // Minify the mixed down scripts
        uglify: {
            app: {
                files: {
                    './www/js/app.min.js': ['./www/js/app.js']
                }
            },

            vendor: {
                files: {
                    './www/js/vendor.min.js': ['./www/js/vendor.js']
                }
            }
        },

        // Mix down sass files
        sass: { 
            dist: {
                files: {
                    './www/css/app.css': './assets/sass/app.scss'
                }
            }
        },

        // Minify mixed down styles
        cssmin: {
            app: {
                files: {
                    './www/css/app.min.css': ['./www/css/app.css']
                }
            }
        },

        // Watch files for updates
        watch: {
            concat: {
                files: ['./assets/js/**/*.js'],
                tasks: ['concat:app']
            },

            sass: {
                files: ['./assets/sass/**/*.scss'],
                tasks: ['sass:dist']
            },
            
            uglify: {
                files: ['./www/js/app.js'],
                tasks: ['uglify:app']
            },

            cssmin: {
                files: ['./www/css/app.css'],
                tasks: ['cssmin']
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Register tasks
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin']);

};
