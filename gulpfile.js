const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const nunjucksRend = require('gulp-nunjucks-render');

function nunjucks() {
  return src('app/*.njk')
    .pipe(nunjucksRend())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function styles() {
  return src([
    'app/scss/*.scss',
    'app/modules/**/*.scss',
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
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
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/js/main.js'], scripts);
  watch(['app/*.njk'], nunjucks);
  watch(['app/*.html']).on('change', browserSync.reload);
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
    },
    notify: false
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
exports.nunjucks = nunjucks;
exports.build = series(cleanDist, images, building);
exports.default = parallel(nunjucks, styles, scripts, browsersync, watching);
