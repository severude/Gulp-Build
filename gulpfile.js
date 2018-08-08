'use strict';

// Gulp dependencies
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

// Concatenates all JavaScript files into a global.js file.
// JavaScript source maps are also created.
gulp.task('concatScripts', () => {
    return gulp.src(['js/jquery.js',
            'js/circle/circle.js',
            'js/circle/autogrow.js'])
    .pipe(maps.init())
    .pipe(concat("global.js"))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'))
});

// Runs the concatScripts task and then minifies and copies 
// all JavaScript files into a all.min.js file in the dist/scripts folder.
gulp.task('scripts', ['concatScripts'], () => {
    return gulp.src('js/global.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

// Compiles and concatenates SCSS files into a global.css file.
// CSS source maps are also created.
gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browser.stream({match: '**/*.css'}));
});

// Runs compileSass task and then minifies and copies 
// all CSS into a all.min.css file in the dist/styles folder.
gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/global.css')
    .pipe(cleancss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
});

// Optimizes images and then copies them into the dist/content folder.
gulp.task('images', () =>
    gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'))
);

// Serves the project on a local web server.
// Any changes to a SCSS file triggers the styles task 
// and reloads the browser to display the new changes.
gulp.task('browser', () => {
    browser.init({
        injectChanges: true,
        server: './'
    });
    gulp.watch('sass/**/*.scss', ['styles']);
});

// Deletes all files and folders within the dist folder.
gulp.task('clean', () => {
    del(['dist', 'js/global.js*', 'css']);
});

// Runs the clean, scripts, styles, and images tasks.
// Copies all project files to the dist folder.
gulp.task('dist', ['scripts', 'styles', 'images'], () => {
    return gulp.src(['index.html', 'icons/**'], { base: './' })
    .pipe(gulp.dest('dist'));
});

// Runs the clean task and then the dist task.
gulp.task("build", ["clean"], () => {
    gulp.start('dist');
});

// Runs the build task and serves the project on a local web server.
gulp.task('default', ['build'], () => {
    gulp.start('browser');
});
