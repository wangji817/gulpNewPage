var gulp = require('gulp'),/*从node获取gulp对象*/
	sass = require('gulp-sass'),/*获取gulp-sass编译源,编译scss文件为css文件*/
	dest = require('gulp-dest'),/*获取dest输出源*/
	concat = require('gulp-concat'),/*合并文件后将输出的xxx文件*/
	minifycss = require('gulp-minify-css'),/*压缩css代码*/
	rename = require('gulp-rename'),/*重命名文件名*/
	watch  = require('gulp-watch'),/*监听事件*/	
	connect = require('gulp-connect');/*使用websocket实时监听文件刷新浏览器*/

var _public = {
	staticPath:"./static-dev/",
	devPath:"./dev/"
}

/*创建*/
gulp.task('static-html',function(){
	gulp.src('./template/css/*.scss').pipe(gulp.dest(_public.staticPath+'newhtml/css')).pipe(connect.reload());
	gulp.src('./template/js/*.js').pipe(gulp.dest(_public.staticPath+'newhtml/js')).pipe(connect.reload());
	gulp.src('./template/img/*.*').pipe(gulp.dest(_public.staticPath+'newhtml/img')).pipe(connect.reload());
	gulp.src('./template/index.html').pipe(gulp.dest(_public.staticPath+'newhtml/')).pipe(connect.reload());	
});

gulp.task('dev-html',['gulp-scss'],function(){
	/*生成编译后的html文件夹*/
	setTimeout(function(){		
		gulp.src(_public.staticPath+'newhtml/js/*.js').pipe(gulp.dest(_public.devPath+'newhtml/js')).pipe(connect.reload());
		gulp.src(_public.staticPath+'newhtml/img/*.*').pipe(gulp.dest(_public.devPath+'newhtml/img')).pipe(connect.reload());
		gulp.src(_public.staticPath+'newhtml/index.html').pipe(gulp.dest(_public.devPath+'newhtml/')).pipe(connect.reload());
	},100);
});

/*编译*/
gulp.task('gulp-scss',function(){	
	setTimeout(function(){
		gulp.src(_public.staticPath+'newhtml/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(_public.devPath+'newhtml/css'))
		.pipe(connect.reload());
	},50);
});

/*监听事件*/
gulp.task('static-hot-html',['dev-hot-html'],function(){
	console.log('dev下文件编译成功!!!');
});

gulp.task('dev-hot-html',function(){
	gulp.src(_public.staticPath+'newhtml/css/*.scss').pipe(sass()).pipe(gulp.dest(_public.devPath+'newhtml/css')).pipe(connect.reload());
	gulp.src(_public.staticPath+'newhtml/js/*.js').pipe(gulp.dest(_public.devPath+'newhtml/js')).pipe(connect.reload());
	gulp.src(_public.staticPath+'newhtml/img/*.*').pipe(gulp.dest(_public.devPath+'newhtml/img')).pipe(connect.reload());
	gulp.src(_public.staticPath+'newhtml/index.html').pipe(gulp.dest(_public.devPath+'newhtml/')).pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(_public.staticPath+'newhtml/css/*.scss', ['static-hot-html']);
	gulp.watch(_public.staticPath+'newhtml/js/*.js', ['static-hot-html']);
	gulp.watch(_public.staticPath+'newhtml/img/*.*', ['static-hot-html']);
	gulp.watch(_public.staticPath+'newhtml/*.html', ['static-hot-html']);
})

/*启动服务*/
gulp.task('webserver', function(){
	connect.server({
		livereload: true,
		port: 8888
	});
});

/*执行入口*/
gulp.task('new',['static-html','dev-html'],function(){
	console.log('----执行完毕----');
});

gulp.task('hot',['dev-hot-html','watch','webserver'],function(){
	console.log('----执行完毕----');
});