var gulp=require('gulp');
var server=require('gulp-webserver');
var sass=require('gulp-sass');
  gulp.task('sass',function(){
      return gulp.src('./src/sass/*.scss')
             .pipe(sass())
             .pipe(gulp.dest('./src/css'))
  })
  gulp.task('watch',function(){
      return gulp.watch('./src/sass/*.scss',gulp.series('sass'));
  })
  gulp.task('server',function(){
        return gulp.src('src')
               .pipe(server(
                   {
                    port:'9090',
                    proxies:[
                        {
                            source:'/api/getList',target:'http://localhost:3000/api/getList'
                        },
                        {
                            source:'/api/getSpan',target:'http://localhost:3000/api/getSpan'
                        },
                        {
                            source:'/api/addList',target:'http://localhost:3000/api/addList'
                        }
                    ]
                    }
            ))
  })
  gulp.task('default',gulp.parallel('sass','server','watch'))