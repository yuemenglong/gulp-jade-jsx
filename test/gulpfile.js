var gulp = require('gulp');
var rename = require("gulp-rename");
var jadeToJsx = require("..");

gulp.task("default", function() {
    return gulp.src("**/*.jsx")
        .pipe(jadeToJsx())
        .pipe(rename({ extname: ".js" }))
        .pipe(gulp.dest("."));
})
