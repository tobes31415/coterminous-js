var gulp = require('gulp');
var webserver = require('gulp-webserver');


gulp.task('start', function(done){
    gulp.src("./").pipe(webserver({open:true, livereload:false}));   
});

gulp.task('default',['start']);