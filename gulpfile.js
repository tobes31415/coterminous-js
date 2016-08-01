var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');

gulp.task('clean', function(){
    return gulp.src('bin', {read:false}).pipe(clean())
})

gulp.task('copyIndex', function(){
    return gulp.src(["./index.html"]).pipe(
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
    else
    {
        //Minify
        //
        // Uglify doesn't support ES6 yet
        //options.plugins: [new webpack.optimize.UglifyJsPlugin()]
    }
    webpack(options
    ,function(err, stats){
        if (err)
        {
            console.log(err);
            callback(err);
            return;
        }
        var e = stats.compilation.errors;
        if (e && e.length > 0)
        {
            e.forEach(function(e){console.log (e.message);})
            callback("error");
            return;
        }
        callback(err);
    });
}

gulp.task('webpack-dev', function(callback){
    packFiles('./main','./bin', 'main.js', true, callback);
})

gulp.task('build-npm', function(callback){
    packFiles('./publish','./npm', 'coterminous.js', false, callback);
})
gulp.task('build-bower', function(callback){
    packFiles('./publish','./bower', 'coterminous.js', false, callback);
})

gulp.task('build', function(done){
    runSequence('webpack-dev', 'copyIndex', done);
});
gulp.task('build-clean', function(done){
    runSequence('clean', 'build', done);
})

gulp.task('start', function(done){
    runSequence('build-clean', 'watch',function(done){
       gulp.src("bin").pipe(webserver({open:false, livereload:true})); 
    })  
});
gulp.task('watch', function(){
    gulp.watch('./src/**/*.js',function(){
        runSequence('build');
    }, 10000);
})

gulp.task('publish', function(done){
    runSequence('clean', ['build-bower','build-npm'])
})

gulp.task('default',['start']);