'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    browser = require('browser-sync').create();

gulp.task('concatScripts', () => {
    return gulp.src(['js/jquery.js',
            'js/circle/circle.js',
            'js/circle/autogrow.js'])
    .pipe(maps.init())
    .pipe(concat("global.js"))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'))
});

gulp.task('scripts', ['concatScripts'], () => {
    return gulp.src('js/global.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
});

gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/global.css')
    .pipe(cleancss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('images', () =>
    gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'))
);

gulp.task('browser', () => {
    browser.init({
        server: { baseDir: './' }
    });

    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch("*.html").on('change', browser.reload);
});

gulp.task('clean', () => {
    del(['dist']);
});

gulp.task('build', ['scripts', 'styles', 'images']);

gulp.task("default", ["clean"], () => {
    gulp.start('build');
});
