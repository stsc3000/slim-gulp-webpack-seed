var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var connect = require("gulp-connect");
var jasmineBrowser = require('gulp-jasmine-browser');
var webpackStream = require('webpack-stream');

gulp.task("default", ["build-dev", "serve"]);

gulp.task("build-dev", ["webpack:build-dev", "static"], function() {
  gulp.run(['jasmine']);
  gulp.watch(["app/**/*"], function() {
    gulp.run(['static']);
  });
  gulp.watch(["test/**/*"], function() {
    gulp.run(['jasmine']);
  });
});

gulp.task("serve", function() {
	connect.server({
		root: 'dist'
	});
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.debug = true;

var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('static', function() {
  gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img'));
  gulp.src('app/css/**')
    .pipe(gulp.dest('dist/css'));
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('jasmine', function() {
  return gulp.src(['test/**/*.js'])
    .pipe(webpackStream({watch: true, output: {filename: 'spec.js'}}))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server());
});
