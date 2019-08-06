	$(".buts").children("li").click(function(){
//			console.log($(".floor").eq($(this).index()).offset().top);

//			$(document).scrollTop($(".floor").eq($(this).index()).offset().top);
			
			
//			获取点击的索引
			var index = $(this).index();
//			根据索引获取对应的楼层
			var iNowFloor = $(".floor").eq(index);
//			计算楼层距离顶部的位置
			var t = iNowFloor.offset().top;
//			将这个位置设置给滚动条
			$("html").stop().animate({
				scrollTop:t
			})
			
		})