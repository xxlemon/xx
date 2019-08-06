let gulp=require("gulp")
let connect=require("gulp-connect")
let proxy=require("http-proxy-middleware")
let concat=require("gulp-concat")
let rename=require("gulp-rename")
let uglify=require("gulp-uglify")
let babel=require("gulp-babel");
let sass=require("gulp-sass");



// gulp.watch()        监听方法
// 第一个参数：要监听的文件
// 第二个参数：当监听的文件发生变化时，执行的指令



// 实现自动转存
gulp.task("aaa",()=>{
    gulp.watch(["./src/sass/*.scss"],["sass"])
})


gulp.task("hi",()=>{
    console.log("hellow");
})



// sass转css
gulp.task("aaaa",()=>{
    gulp.src("./src/sass/details.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("server/css"))
    .pipe(connect.reload())
})


