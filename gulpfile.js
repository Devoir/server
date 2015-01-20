var gulp	= require('gulp');
var less	= require('gulp-less');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./client/**')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify({
            preserveComments: "some",
            mangle: false
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('less', function() {

	return gulp.src('./less/style.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public/css'));
	//TODO
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./client/**', ['scripts']);
    gulp.watch('./less/**', ['less']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);