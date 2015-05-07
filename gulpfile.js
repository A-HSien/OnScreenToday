var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var watch = require('gulp-watch');
var rev = require('gulp-rev');
var webpack = require("webpack");
var server = require('gulp-express');

// #
// # CONFIGS
// #

var webpackConfig = require("./webpack.config.js")
if (gulp.env.production) { //# i.e. we were executed with a --production option
	webpackConfig.plugins = webpackConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());
	webpackConfig.output.filename = "main-[hash].js";
}
var lessConfig = { includePaths : ['src/styles'] }
// # paths to files in bower_components that should be copied to dist/assets/vendor
var vendorPaths = ['es5-shim/es5-sham.js', 'es5-shim/es5-shim.js', 'bootstrap/dist/css/bootstrap.css']

// #
// # TASKS
// #
// 
gulp.task("webpack-watch", function() {
    var config = require('./webpack.config.js');
    config.watch = true;
    return gulp.src('./src/scripts/main.js')
      .pipe(webpack(config))
      .pipe(gulp.dest('dist/assets/'));
});

gulp.task('clean', function() {
    gulp.src('dist', {read: false})
      .pipe(del())
});

// # main.less should @include any other CSS you want
gulp.task('less', function() {
    gulp.src('src/styles/main.less')
      .pipe(less(lessConfig).on('error', gutil.log))
      .pipe(gulp.env.production =='prod' ? minifyCSS(): gutil.noop())
      .pipe(gulp.env.production == 'prod' ? rev() : gutil.noop())
      .pipe(gulp.dest('dist/assets'))
});


// # Some JS and CSS files we want to grab from Bower and put them in a dist/assets/vendor directory
// # For example, the es5-sham.js is loaded in the HTML only for IE via a conditional comment.
// 
// gulp.task('vendor', function() {
//     var paths = vendorPaths.map(function (p) {
//     	path.resolve("./bower_components", p);
//     })
//     gulp.src('paths')
//       .pipe(gulp.dest('dist/assets/vendor'))
// });


// # Just copy over remaining assets to dist. Exclude the styles and scripts as we process those elsewhere
// 
gulp.task('copy', function() {
    gulp.src(['src/**/*', '!src/scripts', '!src/scripts/**/*', '!src/styles', '!src/styles/**/*']).pipe(gulp.dest('dist'))
});


// #
// # HELPERS
// #
var execWebpack = function (config) {
	webpack(config, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('execWebpack', err);
		}
		gutil.log('[execWebpack]', stats.toString({colors: "true"}));
	} );
}