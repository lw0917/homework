/*
 * @Author: LiWei 
 * @Date: 2018-12-21 14:11:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-15 20:35:11
 */
 var gulp=require('gulp');
 var sass=require('gulp-sass');
 var server=require('gulp-webserver');

    //编译sass
    gulp.task('sass',function(){
        return gulp.src('./src/sass/*.scss')
               .pipe(sass())
               .pipe(gulp.dest('./src/css'))
    })
    //监听sass
    gulp.task('watch',function(){
        return gulp.watch('./src/sass/*.scss',gulp.series('sass'))
    })
    //起服务
    gulp.task('dev',function(){
        return gulp.src('./src')
               .pipe(server({
                   port:9090,
                   proxies:[
                       {
                           source:'/api/icon-list',target:'http://127.0.0.1:3000/api/icon-list'
                       },
                      {
                        source:'/api/bill-list',target:'http://127.0.0.1:3000/api/bill-list'
                      },
                      {
                          source:'/api/addList',target:'http://127.0.0.1:3000/api/addList'
                      }
                   ]
               }))
    })
   
    //前端开发
    gulp.task('default',gulp.series('sass','dev','watch'));
