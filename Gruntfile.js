module.exports = function(grunt) {

    var target = grunt.option('target') || '../application/public';

    var uglifyTargets = {
        main: {},
        polyfill: {},
        modernizr: {}
    };

    uglifyTargets.main[target + '/js/main.min.js'] = ['build/js/main.js'];
    uglifyTargets.polyfill[target + '/js/polyfill.min.js'] = ['build/js/polyfill.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    //  JAVASCRIPT TASKS

        concat: {
            main: {
                src: [
                    'js/libs/*.js',                 //  Libraries
                    'js/libs/bootstrap/*.js',       //  Bootstrap plugins
                    '!js/bootstrap/excludes/*',
                    'js/components/*.js',           //  Takeoff components
                    'js/main.js'                    //  Main javascript file
                ],
                dest: 'build/js/main.js'
            },
            polyfill: {
                src: [
                    'js/polyfill/*.js'              //  Polyfills
                ],
                dest: 'build/js/polyfill.js'
            }
        },

        uglify: {
            main: {
                files: uglifyTargets.main
            },
            polyfill: {
                files: uglifyTargets.polyfill
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

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['js/main.js', 'js/components/*.js']
        },


    //  CSS TASKS

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/css/main.css': 'sass/main.scss',
                    'build/css/main-legacy.css': 'sass/main-legacy.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                src: 'build/css/*.css'
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: target + '/css/',
                ext: '.min.css'
            }
        },


    //  IMAGE TASKS

        responsive_images: {
            dev: {
                options: {
                    sizes: [{
                        width: 420,
                        name: 'sml'
                    }, {
                        width: 820,
                        name: 'lrg'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'img/responsive',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/responsive'
                }]
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    pngquant: true,
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'build/img/'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: false },
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

        svg2png: {
            all: {
                files: [
                    {
                        cwd: 'img/svg/',
                        src: ['**/*.svg', '!grayscale.svg'],
                        dest: 'img/svg/fallback/'
                    }
                ]
            }
        },


    //  ICON TASKS

        webfont: {
            icons: {
                src: 'icons/*/*.svg',
                dest: 'build/fonts',
                destCss: 'sass/core',
                options: {
                    htmlDemo: false,
                    relativeFontPath: '/fonts/',
                    stylesheet: 'scss',
                    template: 'icons/_templates/custom.css',
                    codepointsFile: 'icons/codepoints.json'
                }
            }
        },

        svg_sprite: {
            icons: {
                src: 'icons/*/*.svg',
                dest: 'build/icons',
                options: {
                    shape: {
                        id: {
                            generator: function(name) {
                                return 'symbol--' + name.slice(name.lastIndexOf('/') + 1, -4);
                            }
                        }
                    },
                    mode: {
                        symbol: {
                            dest: '.',
                            sprite: 'symbols.svg',
                            render: {
                                scss: {
                                    dest: '_sprite.scss'
                                }
                            }
                        }
                    }
                }
            }
        },


    //  GENERAL TASKS

        clean: {
            img: {
                src: ['build/img', target + '/img']
            },
            fonts: {
                src: ['build/fonts', target + '/fonts']
            },
            options: {
                'force': true
            }
        },

        copy: {
            images: {
                cwd: 'build/img/',
                src: '**/*.*',
                expand: true,
                dest: target + '/img',
                filter: 'isFile'
            },
            fonts: {
                cwd: 'build/fonts/',
                src: '**/*.*',
                expand: true,
                dest: target + '/fonts/',
                filter: 'isFile'
            },
            svgs: {
                cwd: 'build/img/svg',
                src: '**/*.*',
                expand: true,
                dest: target + '/img/svg',
                filter: 'isFile'
            },
            html: {
                cwd: 'html',
                src: '**/*.*',
                expand: true,
                dest: target + '/static/',
                filter: 'isFile'
            }
        },

        notify: {
            css: {
                options: {
                    title: '✓ Task complete!',
                    message: 'CSS'
                }
            },
            js: {
                options: {
                    title: '✓ Task complete!',
                    message: 'Javascript'
                }
            },
            img: {
                options: {
                    title: '✓ Task complete!',
                    message: 'Images'
                }
            },
            fonts: {
                options: {
                    title: '✓ Task complete!',
                    message: 'Fonts'
                }
            },
            icons: {
                options: {
                    title: '✓ Task complete!',
                    message: 'Icons'
                }
            }
        },

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
                files: ['img/**/*.{png,jpg,gif,ico,svg}'],
                tasks: ['img', 'notify:img']
            },
            html: {
                files: ['html/**/*.html'],
                tasks: ['copy:html']
            },
            fonts: {
                files: ['fonts/**', 'icons/**'],
                tasks: ['fonts', 'notify:fonts']
            }
        }
    });

//  PLUGINS
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

//  COMBINED TASKS
    grunt.registerTask('default', ['build', 'copy:html', 'watch']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('img', ['clean:img', 'responsive_images', 'imagemin', 'svg2png', 'svgmin', 'copy:images', 'copy:svgs']);
    grunt.registerTask('fonts', ['clean:fonts', 'webfont', 'copy:fonts']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('build', ['fonts', 'css', 'js', 'img']);

};