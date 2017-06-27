var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var prefixer = require('gulp-autoprefixer');

// SASS preprocessing 
gulp.task('sass', function() {
	return gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest('src/'))
		// .pipe(browserSync.reload({
  //     		stream: true
  //   	}))
});


// Start BrowserSync Server
gulp.task('browserSync', function() {
  	browserSync.init({
    	server: {
      		baseDir: 'src'
    	},
  	})
});

// Watchers
gulp.task('watch', ['sass'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
	// reload the browser whenever HTML or JS files change
	// gulp.watch('src/*.html', browserSync.reload);
	// gulp.watch('src/**/*.js', browserSync.reload);
});


gulp.task('default', function(callback) {
 	runSequence(['sass', 'watch'],
		callback
	)
});