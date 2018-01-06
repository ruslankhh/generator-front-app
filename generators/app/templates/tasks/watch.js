import browserSync from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync.create('server');

gulp.task('watch', () =>
  gulp.watch('app/**/*').on('change', bs.reload)
);
