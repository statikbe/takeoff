module.exports = function(grunt) {
    // Grunt options
    var target = grunt.option('target') || '../public';

    var uglifyTargets = {
        main: {},
        polyfill: {},
        modernizr: {}
    };
    uglifyTargets['main'][target + '/js/main.min.js'] = ['build/js/main.js'];
    uglifyTargets['polyfill'][target + '/js/polyfill.min.js'] = ['build/js/polyfill.js'];


    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CONCAT FILES
        concat: {
            main: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/libs/bootstrap/*.js', // All JS in the bootstrap folder
                    '!js/bootstrap/excludes/*', // Exclude some of the bootstrap files
                    'js/components/*.js', // All JS in the components folder
                    'js/main.js'  // The big main file!
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
                files: uglifyTargets['main']
            },
            polyfill: {
                files: uglifyTargets['polyfill']
            },
            singles: {
                files: [{
                  expand: true,
                  cwd: 'js/singles',
                  src: '**/*.js',
                  dest: target + '/js'
              }]
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
                files: [
                    {
                        cwd: 'img/svg/',
                        src: ['**/*.svg'],
                        dest: 'img/svg/fallback/'
                    }
                ]
            }
        },

        // CLEAN
        clean: {
            img: {
                src: ['build/img', target + '/img']
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
                dest: target + '/img',
                filter: 'isFile'
            },
            fonts: {
                src: 'fonts/*',
                dest: target + '/'
            },
            svgs: {
                cwd: 'build/img/svg',
                src: '**/*.*',
                expand: true,
                dest: target + '/img/svg',
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
                    'build/css/main.css': 'sass/main.scss'
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
                options: {
                    legacyWidth: 1200
                },
                files: {
                    'build/css/main-legacy.css': 'build/css/main.css'
                },
            }
        },

        // CSSMIN
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: target + '/css/',
                ext: '.min.css'
            }
        },

        // WEBFONT
        webfont: {
            icons: {
                src: 'icons/*.svg',
                dest: 'fonts',
                destCss: 'sass/core',
                options: {
                    types: 'eot,woff2,woff,ttf',
                    order: 'eot,woff2,woff,ttf',
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts',
                    template: 'templates/icons.css',
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon--',
                        mixinPrefix: 'icon--'
                    },
                    htmlDemo: false
                }
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

    // Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('img', ['clean:img', 'svg2png', 'imagemin','svgmin', 'copy:images', 'copy:svgs']);
    grunt.registerTask('fonts', ['copy:fonts']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'legacssy', 'cssmin']);
    // grunt.registerTask('fonts', ['webfont', 'copy:fonts']);
    grunt.registerTask('build', ['fonts', 'css', 'js', 'img']);
};
