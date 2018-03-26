//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    uglify= require('gulp-uglify'),
    concat= require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version');

//app.js
gulp.task('minifyjs', function() {
    return gulp.src('public/debug/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));
});

//buy.js
gulp.task('minifyjs2', function() {
    return gulp.src(['public/debug/js/buy/*.js','public/debug/js/public.js','public/debug/js/fx.js','public/debug/js/touch.js'])
        .pipe(concat('buy.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));
});

//user.js
gulp.task('minifyjs3', function() {
    return gulp.src(['public/debug/js/user/*.js','public/debug/js/public.js','public/debug/js/fx.js','public/debug/js/touch.js'])
        .pipe(concat('user.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));
});

//web.js
gulp.task('minifyjs4', function() {
    return gulp.src(['public/debug/js/web/*.js','public/debug/js/public.js','public/debug/js/fx.js','public/debug/js/touch.js'])
        .pipe(concat('web.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));
});

//config.js
gulp.task('configjs', function() {
    return gulp.src('public/debug/js/conf/config.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));
});

//省市区js
gulp.task('cityjs', function() {
    //全部省市区
    gulp.src(['public/debug/js/city/city-data.js','public/debug/js/city/city-picker.js'])
        .pipe(concat('citypicker.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest('public/dist/js/city'));

    //北京、上海、广东、山东、浙江及以下(昆仑健康宝)
    gulp.src(['public/debug/js/city/city-data-jkb.js','public/debug/js/city/city-picker.js'])
        .pipe(concat('citypicker01.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/city'));

    //阳光健康宝
    gulp.src(['public/debug/js/city/city-data-ygjk.js','public/debug/js/city/city-picker.js'])
        .pipe(concat('citypicker02.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/city'));

    //大都会
    gulp.src(['public/debug/js/city/city-data-ddh.js','public/debug/js/city/city-picker.js'])
        .pipe(concat('citypicker03.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/city'));
});

//lightbox
gulp.task('lightjs', function() {

    gulp.src(['public/debug/js/lightbox/*.js'])
        .pipe(concat('jquery.swipebox.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/'));

});

//职业
gulp.task('jobjs', function() {
    //昆仑吉祥年
    gulp.src(['public/debug/js/job/*.js'])
        .pipe(concat('job.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js/job/'));

});


//css
gulp.task('cssmin', function () {
    gulp.src(['public/debug/css/*.css','!public/debug/css/reset.css'])
        .pipe(concat('head.css'))
        //.pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）(由于iconfont.css会出错暂停使用)
        .pipe(cssmin())
        .pipe(gulp.dest('public/dist/css'));
    gulp.src('public/debug/css/reset.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/dist/css'));

});


gulp.task('watch',function(){
    gulp.watch('public/debug/js/*.js',['minifyjs']);
    gulp.watch(['public/debug/js/buy/*.js','public/debug/js/public.js'],['minifyjs2']);
    gulp.watch(['public/debug/js/user/*.js','public/debug/js/public.js'],['minifyjs3']);
    gulp.watch(['public/debug/js/web/*.js','public/debug/js/public.js'],['minifyjs4']);
    gulp.watch('public/debug/css/*.css',['cssmin']);
});


gulp.task('config',['configjs']);
gulp.task('city',['cityjs']);
gulp.task('lightbox',['lightjs']);
gulp.task('default',['minifyjs','cssmin','watch','minifyjs2','minifyjs3','minifyjs4']); //定义默认任务


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径