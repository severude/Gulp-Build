'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    del = require('del');

gulp.task('concatScripts', () => {
    return gulp.src(['js/jquery.js',
            'js/circle/circle.js',
            'js/circle/autogrow.js'])
    .pipe(concat("global.js"))
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
    .pipe(sass())
    .pipe(rename('global.css'))
    .pipe(gulp.dest('css'))
});

gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/global.css')
    .pipe(cleancss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('clean', () => {
    del(['css', 'js/global*.js*', 'dist']);
});

gulp.task("default", ["hello"], () => {
    console.log("This is the default task!");
});