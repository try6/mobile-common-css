var gulp = require('gulp'); //初始化gulp工具
var less = require('gulp-less'); //初始化less插件
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');

/*var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};
gulp.task('connect', function() {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});
*/

//将图片拷贝到目标目录
gulp.task('copy:images', function(done) {
    gulp.src(['myweb/img/*.*']).pipe(gulp.dest('dist/img')).on('end', done);
});

//样式的压缩
gulp.task('gulpLess', function() {
    gulp.src('myweb/less/*.less') //获取资源路径
        .pipe(less())
        .pipe(gulp.dest('dist/css')) //输出文件路径
});
//html文件的压缩
gulp.task('Htmlmin', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('myweb/view/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/view'));
});
//写监听执行命令
gulp.task('watch', function() {
    gulp.watch('myweb/**/*.*', ['gulpLess', 'Htmlmin', 'copy:images']);
});

//gulp.task（）是创建动作的，相当于我们的函数。
//gulp.src（）方法就是将指定的路径文件拿到
//pipe（）方法就是连接的管道，文件从这里进入，一顿操作后从另一头输出到我们指定的一个地方。
//gulp.dest（）就是我们指定的文件目录。
//gulp.watch（）是监听，里面有两个参数，
//一个是监听的文件地址，
//一个是监听到后要执行的动作，这个动作，放在数组里，逗号隔开，可以写入多个动作（任务）；
//目录里的**/*.*是node里的通配符