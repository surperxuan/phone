var gulp=require("gulp");//gulp
var sass = require('gulp-sass');//压缩css
var connect= require('gulp-connect');//服务器
var concat = require('gulp-concat'); //文件合并
var uglify = require('gulp-uglify');//压缩js
var rename = require('gulp-rename');//改名
//var cleanCss = require('gulp-clean-css');//压缩css
//var imagemin = require('gulp-imagemin'); //压缩图片
var sourcemaps = require('gulp-sourcemaps');//备注信息
gulp.task('copyIndex',function(){ 
	//gulp.src()找到我们的所有html然后使用.pipe()通道 
	//gulp.dest()拷贝 
	gulp.src('*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());//链接再加载
 });

gulp.task("sass",function(){//压缩css；gulp-sass
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())//备注信息
	.pipe(sass({outputStyle:"compact"}))//输出紧凑样式（无空隙）
	.pipe(sourcemaps.write())//还原错误信息
	.pipe(gulp.dest("dist/css"))
})
gulp.task('images',function(){//压缩图片
	gulp.src('img/*/**') 
	// .pipe(imagemin()) 
	.pipe(gulp.dest('dist/img'))
	});
gulp.task('scripts',function(){ //压缩js 
	 gulp.src('js/*.js')
	//.pipe(uglify())//压缩js
	.pipe(gulp.dest('dist/js'));
	});
gulp.task('sever',function(){ //链接本地服务器gulp-connect
	connect.server({
		"root":"dist",//路径
		"livereload":true//自动刷新
		});
});
gulp.task('watch',function(){//监控复制
	 gulp.watch(['*.html','sass/*.scss','img/**','js/*.js'],['copyIndex','sass','images','scripts']);
});
gulp.task('default',['sever','watch']); //创建服务器，随时监听




