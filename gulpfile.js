const gulp = require("gulp");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

const files = require("./gulp_support/component_scss_automation");

const autoPrefixerOptions = {
    browsers : ['last 2 versions']
}

gulp.task('w:comp', function(){
    return watch('./src/app/**/*.component.scss', function ( vinyl ) {
        files[vinyl.event](vinyl);
    });
});

gulp.task('scss',function(){
    return gulp.src(["./src/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(autoPrefixer(autoPrefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src'));
});

gulp.task('w:scss', ['scss'], function(){
  gulp.watch("./src/**/*.scss", ['scss']);
});


gulp.task('default', ['w:scss'], function(){
  console.log("starting");
});
