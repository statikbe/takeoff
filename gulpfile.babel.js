import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import autoprefixer from 'autoprefixer';
import pngquant from 'imagemin-pngquant';
import del from 'del';
import path from 'path';

const plugins = loadPlugins();

const pkg = require('./package.json');

gulp.task('css', () => 
    gulp.src('sass/main.scss')
        .pipe(plugins.sass().on('error', handleError))
        .pipe(plugins.postcss(postcssPlugins))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename(minifiedRenameConfig))
        .pipe(gulp.dest(targetDir('css')))
        .pipe(plugins.notify('CSS task complete'))
);

gulp.task('jshint', () => 
    gulp.src([
        'js/main.js',
        'js/components/*.js',
        '!js/**/_*.js'  //  Exclude files that start with an underscore
    ])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
);

gulp.task('js:main', () =>
    gulp.src([
        'js/libs/*.js',
        'js/components/*.js',
        'js/main.js',
        '!js/**/_*.js'  //  Exclude files that start with an underscore
    ])
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(minifiedRenameConfig))
        .pipe(gulp.dest(targetDir('js')))
        .pipe(plugins.notify('JS task complete'))
);

gulp.task('js:singles', () =>
    gulp.src([
        'js/singles/*.js',
        '!js/**/_*.js'  //  Exclude files that start with an underscore
    ])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(targetDir('js')))
        .pipe(plugins.notify('JS task complete'))
);

gulp.task('js', gulp.series('jshint', gulp.parallel('js:main', 'js:singles')));

gulp.task('img', () => 
    gulp.src('img/**/*.{svg,png,jpg,gif,ico}')
        .pipe(plugins.imagemin(imageminConfig))
        .pipe(gulp.dest(targetDir('img')))
        .pipe(svgFilter)
        .pipe(plugins.svg2png())
        .pipe(plugins.imagemin(imageminConfig))
        .pipe(gulp.dest(targetDir('img/svg/fallback')))
        .pipe(plugins.notify('IMG task complete'))
);

gulp.task('fonts', () => 
    gulp.src('fonts/**/*.*')
        .pipe(gulp.dest(targetDir('fonts')))
);

gulp.task('iconfont', () => 
    gulp.src('icons/svg/**/*.svg')
        .pipe(plugins.iconfont(iconfontConfig))
        .on('glyphs', function (glyphs, options) {
            gulp.src('icons/_template.scss')
                .pipe(plugins.consolidate('lodash', {
                    fontName: options.fontName,
                    glyphs: glyphs
                }))
                .pipe(plugins.rename('_icons.scss'))
                .pipe(gulp.dest('sass/core/'));
        })
        .pipe(gulp.dest(targetDir('fonts')))
);

gulp.task('html', () => 
    gulp.src('html/*.html')
        .pipe(gulp.dest(targetDir('static')))
);

gulp.task('build', gulp.series('iconfont', gulp.parallel('css', 'js', 'img', 'fonts')));

gulp.task('watch', () => {

    gulp.watch('sass/**/*.scss', gulp.task('css'));
    gulp.watch('js/**/*.js', gulp.task('js'));
    gulp.watch('img/**/*.{svg,png,jpg,gif,ico}', gulp.task('img'));
    gulp.watch('fonts/**/*.*', gulp.task('fonts'));
    gulp.watch('icons/**/*.*', gulp.task('iconfont'));
});

gulp.task('default', gulp.series('build', 'watch'));

// CONFIGURATION

const minifiedRenameConfig = {
    suffix: '.min'
};

const postcssPlugins = [
    autoprefixer({
        browsers: ['last 2 versions']
    })
];

const imageminConfig = {
    progressive: true,
    interlaced: true,
    svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false },
        { removeUselessStrokeAndFill: false }
    ],
    use: [ pngquant() ]
};

const timeStamp = Math.round(Date.now() / 1000);

const iconfontName = 'icons';

const iconfontConfig = {
    // formats: ,
    // autohint: ,
    fontName: iconfontName,
    // fontWeight: ,
    // fontStyle: ,
    // fixedWidth: ,
    // centerHorizontally: ,
    normalize: true,
    // fontHeight: ,
    // round: ,
    // descent: ,
    // metadata: ,
    // log: ,
    // startUnicode: ,
    prependUnicode: true,
    timeStamp: timeStamp
};

const svgFilter = plugins.filter('**/*.svg');

//  HELPER FUNCTIONS

//  Log and notify errors
function handleError(error) {

    plugins.util.log(`${plugins.util.colors.red.bold(`[✘] ${error.plugin}`)} error in ${plugins.util.colors.underline(error.relativePath)}:\n
        ${error.messageOriginal} (line ${error.line}, column ${error.column})\n`);

    return plugins.notify.onError({
        title: `${error.plugin} error in ${plugins.util.colors.underline(error.relativePath)}`,
        message: `${error.messageOriginal} (line ${error.line}, column ${error.column})`
    })(error);
}

//  Helper function for gulp.dest() to make sure 'target' in package.json is used as target directory.
function targetDir(dir) {
    return path.join(pkg.config.target, dir);
}