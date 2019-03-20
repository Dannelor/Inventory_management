var gulp = require('gulp')
var sass = require('gulp-sass')
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync').create()
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var minifycss = require('gulp-minify-css')

gulp.task('js', function() {
  return gulp
    .src('src/js/*.js')
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(gulp.dest('public/js'))
})

gulp.task('sass', function() {
  return gulp
    .src(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(gulp.dest('public/css'))
})

gulp.task(
  'browser-sync',
  gulp.series('js', 'sass', function(done) {
    browserSync.init(null, {
      proxy: 'http://localhost:80',
      files: ['public/**/*.*'],
      port: 7000,
    })

    done()
  })
)

gulp.task('nodemon', function(done) {
  var started = false
  nodemon({
    script: './bin/www',
    ext: 'js',
    ignore: ['gulpfile.js', 'public/**/*.js', 'js/*.*', 'scss/*.*'],
    env: {
      NODE_ENV: 'development',
    },
  })
    .on('start', function() {
      if (!started) {
        started = true
        done()
      }
    })
    .on('restart', function() {
      console.log('Restarted')
    })
    .on('crash', function() {
      console.error('Application crashed!')
      stream.emit('restart', 10)
    })
})

gulp.task(
  'dev',
  gulp.series('nodemon', 'browser-sync', function() {
    gulp.watch('./views/*.pug').on('change', browserSync.reload)

    gulp.watch('src/js/*.js', gulp.series('js'))
    gulp.watch('src/scss/*.scss', gulp.series('sass'))
  })
)

gulp.task(
  'default',
  gulp.series('js', 'sass', function() {
    require('./bin/www')
  })
)
