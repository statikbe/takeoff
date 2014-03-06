module.exports = function(grunt) {
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CONCAT FILES
        concat: {
            // 2. Configuration for concatinating files goes here.
            main: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/components/*.js', // All JS in the components folder
                    'js/main.js'  // The pbig main file!
                ],
                dest: 'build/js/main.js'
            },
            polyfill: {
                src: [
                    'js/polyfill/*.js' // All JS in the polyfill folder
                ],
                dest: 'build/js/polyfill.js'
            }
        },

        // UGLIFY FILES
        uglify: {
            main: {
                options: {
                    sourceMap: '../public/js/map/main.map.js',
                    sourceMappingURL: 'map/main.map.js',
                },
                files: {
                    '../public/js/main.min.js': ['build/js/main.js']
                }
            },
            polyfill: {
                options: {
                    sourceMap: '../public/js/map/polyfill.map.js',
                    sourceMappingURL: 'map/polyfill.map.js',
                },
                files: {
                    '../public/js/polyfill.min.js': ['build/js/polyfill.js']
                }
            }
        },

        // JSHINT
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['js/main.js', 'js/components/*.js']
        },

        // IMAGEMIN
        imagemin: {
            dynamic: {
                options: {
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '../public/img/'
                }]
            }
        },

        // SASS
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/main.css': 'sass/main.scss',
                    'build/css/wysiwyg.css': 'sass/wysiwyg.scss',
                    'build/css/register.css': 'sass/register.scss'
                }
            }
        },

        // AUTOPREFIXT
        autoprefixer: {
            dist: {
                src: 'build/css/*.css'
            }
        },

        // CSSMIN
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: '../public/css/',
                ext: '.min.css'
            }
        },

        // NOTIFY
        notify: {
            css: {
                options: {
                    message: 'CSS task complete'
                }
            },
            js: {
                options: {
                    message: 'JS task complete'
                }
            },
            img: {
                options: {
                    message: 'IMG task complete'
                }
            }
        },

        // WATCH
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['js', 'notify:js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['css', 'notify:css'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['img/**/*.{png,jpg,gif,ico}'],
                tasks: ['img', 'notify:img']
            },
            html: {
                files: ['*.html']
            }
        }


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('build', ['css', 'js', 'img']);

};
