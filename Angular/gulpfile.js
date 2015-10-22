var gulp = require('gulp'),
    htmlValidate = require('gulp-accessibility'),
    gulpIncludeTemplate = require("gulp-include-template"),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    sass = require("gulp-sass"),
    livereload = require('gulp-livereload'),
    gulpSequence = require('gulp-sequence'),
    prettify = require('gulp-prettify'),
    w3cvalidate = require('gulp-w3cjs'),
    htmlhint = require('gulp-htmlhint'),
    csslint = require('gulp-csslint');

var customReporter = function(file) {
    gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(result.error.message + ' on line ' + result.error.line);
    });
};

gulp.task('validate', function() {
    return gulp.src('templates/staffing.html')
        .pipe(htmlValidate());
});

gulp.task("includeTemplate", function() {
    return gulp.src(["templates/dashboard.html", "templates/create_project.html"])
        .pipe(gulpIncludeTemplate())
        .pipe(gulp.dest("assets/"))
        .pipe(livereload());
});

gulp.task('w3cvalidate', function() {
    return gulp.src(['templates/staffing.html'])
        .pipe(w3cvalidate());
});

gulp.task('prettify', function() {
    gulp.src('assets/*.html')
        .pipe(prettify({
            indent_size: 4
        }))
        .pipe(gulp.dest('assets/'))
        .pipe(livereload());
});

gulp.task('seq', function(callback) {
    gulpSequence('includeTemplate')(callback)
});

gulp.task('sass', function() {
    gulp.src('assets/scss/components/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css/components/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('templates/*.html', ['seq']);
    gulp.watch('assets/scss/components/*.scss', ['sass']);
    gulp.watch('assets/css/components/*.css', ['seq']);
    gulp.watch('assets/*.html', ['prettify']);
});



gulp.task('default', ['watch', 'sass', 'prettify']);

gulp.task('htmlhint', function() {
    gulp.src('Assets/dashboard.html')
        .pipe(htmlhint('configfile/.htmlhintrc'))
        .pipe(htmlhint.failReporter());
});

gulp.task('csslint', function() {
    gulp.src('Assets/css/components/*.css')
        .pipe(csslint('configfile/csslintrc.json'))
        .pipe(csslint.reporter(customReporter))
        .pipe(csslint.reporter('fail'));
});
