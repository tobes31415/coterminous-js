var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');

gulp.task('clean', function(){
    return gulp.src('bin', {read:false}).pipe(clean())
})

gulp.task('copyIndex', function(){
    return gulp.src(["./src/index.html"]).pipe(
    gulp.dest("./bin"))
});

function packFiles(entryFilename, outputPath, outputFilename, debug, callback)
{
    var options = {
        entry: [
            entryFilename
        ],
        output: {
          path:outputPath,
          publicPath:'',
          filename: outputFilename,
        }
    };
    if (debug)
    {
        options.debug=true,
        options.devtool='inline-source-map';
    }
    webpack(options
    ,function(err, stats){
        callback(err);
    });
}

gulp.task('webpack-dev', function(callback){
    packFiles('./src/main','./bin', 'main.js', true, callback);
})

gulp.task('build-npm', function(callback){
    packFiles('./publish','./npm', 'jsrpc.js', false, callback);
})
gulp.task('build-bower', function(callback){
    packFiles('./publish','./bower', 'jsrpc.js', false, callback);
})

gulp.task('build', function(done){
    runSequence('webpack-dev', 'copyIndex', done);
});
gulp.task('build-clean', function(done){
    runSequence('clean', 'build', done);
})

gulp.task('start', function(done){
    runSequence('build-clean', function(done){
       gulp.src("bin").pipe(webserver({open:true})); 
    })  
});

gulp.task('publish', function(done){
    runSequence('clean', ['build-bower','build-npm'])
})

gulp.task('default',['start']);