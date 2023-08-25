const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['app/scss/*.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

function images() {
  return src('app/img/**/*.*')
    .pipe(imagemin([imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 75, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false }
      ]
    })
    ]))
    .pipe(dest('dist/img'))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.build = series(cleanDist, images, building);
exports.default = parallel(styles, scripts, browsersync, watching);
