module.exports = function(grunt) {
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CONCAT FILES
        concat: {
            main: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    '!js/libs/modernizr.custom.min.js', // Exclude modernizr to load it at the top
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
                    sourceMappingURL: 'map/main.map.js'
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
            },
            modernizr: {
                files: {
                    '../public/js/modernizr.min.js': ['js/libs/modernizr.custom.min.js']
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
                    pngquant: true,
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },

        // SVGMIN
        svgmin: {
            options: {
                plugins: [
                  { removeViewBox: false },
                  { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/svg',
                    src: ['**/*.svg'],
                    dest: 'build/img/svg/'
                }]
            }
        },

        // SVG2PNG
        svg2png: {
            all: {
                // specify files in array format with multiple src-dest mapping
                files: [
                    // rasterize all SVG files in "img" and its subdirectories to "img/png"
                    {
                        src: ['img/**/*.svg'],
                        dest: 'img/svg/fallback/'
                    }
                ]
            }
        },

        // CLEAN
        clean: {
            img: {
                src: ['build/img', '../public/img']
            },
            options: {
                'force': true
            }
        },

        // COPY
        copy: {
            images: {
                cwd: 'build/img/',
                src: '**/*.*',
                expand: true,
                dest: '../public/img',
                filter: 'isFile'
            },
            fonts: {
                src: 'fonts/*',
                dest: '../public/'
            },
            svgs: {
                cwd: 'build/img/svg',
                src: '**/*.*',
                expand: true,
                dest: '../public/img/svg',
                filter: 'isFile'
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
                    'build/css/wysiwyg.css': 'sass/wysiwyg.scss'
                }
            }
        },

        // AUTOPREFIXT
        autoprefixer: {
            dist: {
                src: 'build/css/*.css'
            }
        },

        // LEGACCSY
        legacssy: {
            dist: {
                files: {
                    'build/css/main-legacy.css': 'build/css/main.css',
                    'build/css/register-legacy.css': 'build/css/register.css',
                },
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
            },
            svg: {
                options: {
                    message: 'SVG task complete'
                }
            }
        },

        // WATCH
        watch: {
            options: {
                livereload: false
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
            svgs: {
                files: ['img/**/*.svg'],
                tasks: ['svg', 'notify:svg']
            },
            html: {
                files: ['*.html']
            },
            fonts: {
                files: ['fonts/**'],
                tasks: ['fonts']
            }
        }

    });

    // 2. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);

    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('img', ['clean:img', 'imagemin', 'svg2png', 'svgmin', 'copy:images', 'copy:svgs']);
    grunt.registerTask('fonts', ['copy:fonts']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'legacssy', 'cssmin']);
    grunt.registerTask('build', ['css', 'js', 'img', 'fonts']);
};
