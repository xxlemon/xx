
    class Register{
        constructor(){
            // 注册的接口
            this.url = "http://api.icodeilife.cn:81/user";
            // 获取元素
            this.user = $(".user");
            this.pass = $(".pass");
            this.btn = $(".btn");
            this.state = $("p em");
            // 绑定点击事件
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.click(function(){
                // 开启ajax
                that.load()
            })
        }
        load(){
            // 请求注册接口
            $.ajax({
                url:this.url,
                data:{
                    type:"register",
                    user:this.user.val(),
                    pass:this.pass.val(),
                   
                    
                },
                success:(res)=>{
                    // 请求成功之后，解析数据，根据数据的返回信息，决定不同的状态
                    res = JSON.parse(res);
                    // console.log(res);
                    if(res.code == 0){
                        
                        this.state.html("注册失败，请重新注册");

                    }else if(res.code == 1){
                        
                        this.state.html("注册成功，5秒后跳转到<a href='login.html'>登录</a>");
                        setTimeout(() => {
                            location.href = "login.html"
                        }, 5000);
                        
                    }
                }
            })
        }
    }
    
    new Register();
