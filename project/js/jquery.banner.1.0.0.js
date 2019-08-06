;(function($){
    "use strict";
    // $.fn.extend({
    //     banner:function(){
    //     }
    // })
    $.fn.banner = function(options){
        // console.log(this)
        var that = this;
        // 1.定义面向对象，的对象
        var ban = {};
        // 2.解析参数，处理默认参数
        // list:true,     //可选，默认有
        ban.list = options.list === false ? false : true;
        // autoPlay:true, //可选，默认有自动播放
        ban.autoPlay = options.autoPlay === false ? false : true;
        // delayTime:5000,//可选，默认2000
        ban.delayTime = options.delayTime || 5000;
        // moveTime:1000                           //可选，默认300
        ban.moveTime = options.moveTime || 5000;
        
        // 处理当前显示的索引的默认值：
            // 此值在list功能中表示要走的，因为点击的是进来的
            // 此值在btn功能中表示要进来的，因为点击时没有当前索引，只能在此值身上++，所以此值在btn中表示要进来的
        if(options.index >= 0 && options.index <= options.items.length-1){
            ban.index = options.index;
        }else if(options.index > options.items.length-1){
            ban.index = options.items.length-1
        }else{
            ban.index = 0;
        }
        // 假设在btn中要走的值
        ban.iPrev = null;


        // L1.生成list（最下面的小圆点）
        ban.init = function(){
            if(!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for(var i=0;i<options.items.length;i++){
                str += `<li>${i+1}</li>`
            }
            this.ul.html(str);
            that.append(this.ul);
            // 设置样式
            this.ul.css({
                width:90,
                height:30,
                lineHeight:"30px",
                display:"flex",
                backgroundColor:"rgba(200,200,200,0.4)",
                position:"absolute",
                left:600,
                bottom:0,
                margin:0,
                padding:0,
                listStyle:"none",
                textAlign:"center"
            }).children("li").css({
                flex:1,
                
                
            }).eq(ban.index).css({
                backgroundColor:"#78a000",
                color:"#fff"
            })
            this.listAction()
        }
        // L2.小圆点的点击切换对应图片的功能
        ban.listAction = function(){
            var _this = this;
            this.ul.children("li").click(function(){
                // 点击元素的索引：$(this).index()
                // 默认的索引：_this.index
                if($(this).index() > _this.index){
                    // console.log("左")
                    _this.listMove(1,$(this).index())
                }
                if($(this).index() < _this.index){
                    // console.log("右")
                    _this.listMove(-1,$(this).index())
                }

                // 点击之后，点击的就变成了当前
                _this.index = $(this).index();

                // 设置list的li当前项，取消所有，给点击的设置
                _this.ul.children("li").css({
                    backgroundColor:"",
                    color:""
                }).eq(_this.index).css({
                    backgroundColor:"#78a000",
                    color:"#fff"
                })
            })
        }
        // L3.根据计算好的索引，移动对应的图片
        ban.listMove = function(type,iNow){
            // 谁走：this.index
            // 谁进来：iNow
            options.items.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
            // 上一步：end()
            // 父级：parent()
        }
        

        // B1.绑定左右按钮的点击事件
        ban.btnActive = function(){
            // console.log(options.left)
            if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;

            var _this = this;

            // 绑定点击事件
            options.left.on("click",function(){
                // B2-1.计算索引
                if(_this.index == 0){
                    _this.index = options.items.length-1;
                    _this.iPrev = 0;
                }else{
                    _this.index--;
                    _this.iPrev = _this.index+1;
                }
                _this.btnMove(-1);
            })

            // 因为rightClick是事件处理函数，其中的this指向了触发事件的元素，为了能够在rightClick中继续找到ban，所以使用bind修改this指向
            options.right.on("click",this.rightClick.bind(this));
        }
        ban.rightClick = function(){
            // B2-2.计算索引
            if(this.index == options.items.length-1){
                this.index = 0;
                this.iPrev = options.items.length-1;
            }else{
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(1);
        }
        // B3.根据左右按钮计算的索引，移动对应的图片
        ban.btnMove = function(type){
            // 要走的：this.iPrev
            // 要进来：this.index
            options.items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)

            // B4.设置list的li当前项，取消所有，给点击的设置
            if(!this.list) return ;
            this.ul.children("li").css({
                backgroundColor:"",
                color:""
            }).eq(this.index).css({
                backgroundColor:"#78a000",
                color:"#fff"
            })
        }

        // A1.开启计时器，执行右按钮的事件处理函数
        ban.autoAction = function(){
            var _this = this;
            if(!ban.autoPlay) return;
            // 通过计时器执行右按钮的事件，实现自动轮播
            this.t = setInterval(() => {
                this.rightClick()
            }, this.delayTime);

            // A2.给大框添加鼠标进入和离开事件，做停止和继续
            that.hover(function(){
                clearInterval(_this.t)
            },function(){
                _this.t = setInterval(() => {
                    _this.rightClick()
                }, _this.delayTime);
            })
        }

        // list的启动方法
        ban.init();

        // 左右按钮的启动方法
        ban.btnActive();

        // 自动播放的启动方法
        ban.autoAction();
    }
})(jQuery);