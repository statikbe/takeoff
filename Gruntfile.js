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
                dest: 'js/build/main.js'
            },
            polyfill: {
                src: [
                    'js/polyfill/*.js' // All JS in the polyfill folder
                ],
                dest: 'js/build/polyfill.js'
            }
        },

        // UGLIFY FILES
        uglify: {
            main: {
                options: {
                    sourceMap: 'js/build/map/main.map.js',
                    sourceMappingURL: '/js/build/map/main.map.js',
                },
                files: {
                    'js/build/main.min.js': ['js/build/main.js']
                }
            },
            polyfill: {
                options: {
                    sourceMap: 'js/build/map/polyfill.map.js',
                    sourceMappingURL: '/js/build/map/polyfill.map.js',
                },
                files: {
                    'js/build/polyfill.min.js': ['js/build/polyfill.js']
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
                    dest: 'img/'
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
                    'css/main.css': 'sass/main.scss',
                    'css/wysiwyg.css': 'sass/wysiwyg.scss'
                }
            }
        },

        // AUTOPREFIXT
        autoprefixer: {
            dist: {
                src: 'css/*.css'
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
    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('build', ['css', 'js', 'img']);

};
