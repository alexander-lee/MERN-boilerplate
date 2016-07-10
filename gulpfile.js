var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    nodemon = require('gulp-nodemon'),
    webpack = require('gulp-webpack'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

var config = require('./webpack.config.js');


gulp.task('build', ['sass', 'images'], function(){
  return gulp.src('client/index/app.js')
             .pipe(notify('Starting Webpack Build'))
             .pipe(webpack(config))
             .pipe(notify('Build Finished'))
             .pipe(gulp.dest('./public/js'));
});

gulp.task('webpack-watch', function(){
  config.watch = true;
  return gulp.src('client/index/app.js')
             .pipe(webpack(config))
             .pipe(gulp.dest('./public/js'));
});

gulp.task('assets-watch', function(){
  gulp.watch('./public/css/**/*', ['sass']);
  gulp.watch('./public/images/*', ['images']);
});

gulp.task('sass', function(){
  return gulp.src('./public/css/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
                browsers: ['last 2 versions']
             }))
             .pipe(cleanCSS({compatibility: 'ie8'}))
             .pipe(gulp.dest('./public/css'))
});

gulp.task('images', function(){
  return gulp.src('./public/images')
             .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
             }))
             .pipe(gulp.dest('./public/images'));
})

gulp.task('default', ['webpack-watch', 'assets-watch'], function(){
  var forbidden = ['client', 'node_modules', 'public'];
  nodemon({
    script: './bin/www',
    ext: 'js',
    ignore: forbidden
  })
});
