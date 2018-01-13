# mobile-common-css移动端通用样式设计规范
##### 包含内容:

1. 顶部标签：head_tab

2. 顶部导航：head_nav

3. 通用列表：common-list(目前完成个人设置列表personal_list模块）

4. 底部导航：foot_nav

##### 实现方法：

1. 使用less并用gulp解析为css
2. 使用规范请参考<移动端通用样式设计规范.dox>

##### 设计说明：
公司移动端产品多用于网关和设备配置，很多功能模块都很类似。而且所有的对外产品都应该在外观上保持风格和布局的统一。本模块内容根据近期开发项目“智慧用电”微信版和APP版，提炼出手机移动端可以通用的样式模块。

移动端（微信端）项目在准备期间，可以按照文档说明搭好框架，再引入`main.css`，只需要修改一点全局参数就能高效地完成通用组件的搭建。方便快捷 

##### 使用方式
###### 一 、配置gulp
本框架使用了预处理器Less,需要使用工具对文件进行解析。这里介绍gulp工具

less使用gulp实时监听

1. 全局安装gulp
```
npm install gulp -g
```
2. 在项目根目录下初始化Npm
```
npm init
```
3. 本地安装gulp --save-dev
```
npm install gulp --save-dev
```
4. 安装gulp插件 （gulp-less,gulp-connect）
```
npm install gulp-less gulp-connect --save-dev
```
5. 配置gulpfile.js文件
```
const gulp = require('gulp'); //初始化gulp工具
const less = require('gulp-less'); //初始化less插件

gulp.task('gulpLess', function() {
     //myweb为存放less文件路径
    gulp.src('myweb/**/*.less') //获取资源路径
        .pipe(less())
        .pipe(gulp.dest('websong')) //输出文件路径，自动生成Less/*.css文件
});
//写监听执行命令
gulp.task('watch', function() {
    gulp.watch('myweb/**/*.less', ['gulpLess']);
});
```
6. 在命令行执行`gulp watch`运行gulp
###### 二 、样式介绍
###### 全局样式
 为根目录设置字体大小，这里提供的设计稿为`750px*1334p`,iphone6的两倍大，设置根节点字体`font-size=50px`，就相当于设置`100px=1rem`,可以99%还原设计稿。原理请戳 
```
html {
    font-size: 50px;
}
```
1. 主题色
```
@theme_color:#4da3e6;   //主题色
```
可根据实际情况进行主题色设置

2. 字号
```
/* 字号设置 */

@normal_font:0.26rem;   //默认内容
@tab_title_font:0.36rem;    //顶部标签栏标题
@content_title_font:0.30rem;    //内容主标题
@sub_font:0.20rem;      //辅助性文字
.font(@font){ //字体使用方法
    font-size:@font;
}
```
* 可根据实际情况进行全局字号设置,引用方式如下
```
//示例
body{
    .font(@normal_font);
}
```
3. 按钮
* 参考示例图：
 ```
/* 小按钮 */
.btn-sm{
    .common_input(@theme_color,1rem,0.5rem,#fff);
}
/* 普通按钮 */
.btn{
    .common_input(@theme_color,1.5rem,0.7rem,#fff);
}
/* 登录、退出登录,确认等主按钮 */
.btn-lg{
    font-size: @content_title_font;
    .common_input(@theme_color,5rem,1rem,#fff)
}
```
* 使用方法：为input按钮设置相应类名即可
```
<input class="btn-sm" type="submit" name="" value="按钮">
<input class="btn" type="submit" name="" value="按钮">
<input class="btn-lg btn" type="submit" name="" value="按钮">
```
4. 其他样式
```
@defult_line:0.01rem solid #ddd;    //分割线
@radius:0.1rem;     //圆角
```
###### 组件使用
1. 顶部标签栏head_tab
* 参考示例图：
 
* 布局使用结构:
```
<div class="head_tab">
    /* a标签可视情况修改为div 不影响样式*/
    <a href="#"  class="head_left">  
        <!--head_left和head_right中可直接嵌入img标签或文字内容
        图片大小规范30px*30px-->
        <img src="img/back.png" alt="">   
        <!--  返回 -->
    </a>
    <h2>标签栏标题</h2>
    <a href="#"  class="head_right">
         <img src="img/in.png" alt="">
        <!-- 返回 -->
    </a>
</div>
```
2. 顶部导航head_nav
* 适用于四栏、三栏、两栏布局
* 参考示例图：
 
* 布局使用结构
```
<!-- 顶部导航 -->
    <div class="head_nav">
        <ul>    
            <!--可根据实际情况增减导航条数，最少两栏，最多四栏-->
            <li><a href="#">标题一</a></li>
            <li><a class="active" href="#">标题一</a></li>
        </ul>
    </div>
```
* 修改布局操作：
1. 在main.less中做如下修改：顶部导航布局，根据实际情况设置宽度值， 如两栏宽度为50%，三栏为33.3%，以此类推。
```
#head_nav {
        /* 如两栏宽度为50%，三栏为33.3%，以此类推 */ 
        .head_nav_set(50%); 
        margin: 0.2rem 0.3rem;
        .height_set(0.65rem);
        ...
```
2. 在命令行中执行gulp编译less文件
$ gulp
3. 通用样式列表
    1. 适用于图片+1到2行文字布局，如消息列表，网关列表等
    * 参考示例图：
 
    * 布局使用结构
```
<!-- 消息列表界面 -->
    <div class="message_list">
        <ul>
            <li>
                <div class="title">
                    <div class="mask color"></div>
                     <h5>报警信息</h5>
                </div>
                <div class="content">content</div>
            </li>
        </ul>
    </div>
```
    2. 适用于个人中心、设置界面
    * 参考示例图
 
    * 布局使用结构：
```
<!-- 设置和个人中心界面 -->
    <div class="content_list_set">
        <ul>
            <li>
                <!--图片尺寸大小30px-->
                <img src="../img/back.png">
                <div>修改密码</div>
                <img src="../img/in.png">
            </li>
        </ul>
    </div>
```
4. 底部导航栏foot_nav
* 适用于五栏、四栏、三栏布局
* 参考示例图：
 
* 布局使用结构：
```
<!-- 底部导航 -->
    <div class="foot_nav">
        <ul>
            <!-- 至少要有三个li class=”on”为高亮 -->
            <li class="on">
                <a href="#">
                    <!--图片大小54px*54px-->
                    <img src="../img/index_on.png">
                     <div>信息</div>
                </a>
            </li>
        </ul>
    </div>
```    
* 使用时根据实际情况选择布局，20%代表5栏，25%代表4栏，以此类推
```
  .foot_nav_set(25%);//这是四栏布局
    a{
        display: block;
        height: 100%;
        width: 100%;
    }
```
5. 密码修改界面
* 参考示例图
 
* 布局使用结构
```
<!-- 密码修改界面 -->
<div class="pass_update_container">
   <div class="head_tab">
       <a href="more.html" class="head_left"><img src="../img/back.png"></a>
       <h2>修改密码</h2>
   </div>
   <div class="wrapper">
       <div class="form">
            <p class="username">18625555444</p>
           <p class="form-group">
               <input type="password" class="password-item passwordOld" required placeholder="原密码">
           </p>
           <p class="form-group">
               <input type="password" class="password-item passwordNew" required placeholder="新密码">
           </p>
           <p class="form-group">
               <input type="password" class="password-item passwordNew" required placeholder="再次输入新密码">
           </p>
          <p class="form-group submit">
               <input type="submit" value="确认" class="btn-lg">
         </p>
       </div>
       <div class="wrong" style="color:#ff3c3c"></div>
   </div>
</div>
```
（持续更新）
* 注：
 1. 本文档有且不仅限于上述所说模块，在设计过程中会根据情况逐步添加新模块。
 2. 本文档在后续工作过程中可持续进行更新和修改


