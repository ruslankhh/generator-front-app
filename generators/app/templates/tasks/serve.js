import browserSync from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync.create('server');

gulp.task('serve', () =>
	bs.init({
    notify: false,
    open: true,
		port: 8080,
    server: './public',
		reloadOnRestart: true
	})
);
