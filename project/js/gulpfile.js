let gulp = require("gulp");

// gulp的服务器插件
let connect = require("gulp-connect");

// gulp的connect的服务器代理插件
let proxy = require("http-proxy-middleware");

// 合并js
let concat = require("gulp-concat");

// 压缩js
let uglify = require("gulp-uglify");

// 改名js
let rename = require("gulp-rename");

// ES6转ES5的模块
let babel = require("gulp-babel");

// 引入sass转css的插件
let sass = require("gulp-sass-china");

// gulp提供了5个方法
// gulp.task();        定义指令
    // 第一个参数：当前自定义的指令的名字
    // 第二个参数：执行这个指令时要做的事情，是一个回调函数


// gulp.src()      查找文件
// 参数:数组中放要查找的文件的路径
// 假设：真实项目，开发过程中，修改，更新，修复；最后上线时，最终版本
    // 在开发过程中，存在两个大版本：开发版，上线版
    // 开发版:src
    // 上线版:server

// gulp.pipe()     用来做连缀的过渡方法
// gulp.dest()     用来实现文件转存
// 参数：目标文件夹

// 需求：实现文件的转存，自动转存
gulp.task("aa",()=>{
    // 找到源文件
    gulp.src(["./src/**/*","!./src/pass.txt"])
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
})

// gulp.watch()        监听方法
// 第一个参数：要监听的文件
// 第二个参数：当监听的文件发生变化时，执行的指令

// 实现自动转存
gulp.task("aaa",()=>{
    gulp.watch(["./sass/*.scss"],["sass"])
})



// sass转css
gulp.task("sass",()=>{
    gulp.src("./src/sass/style.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("server/css"))
    .pipe(connect.reload())
})


