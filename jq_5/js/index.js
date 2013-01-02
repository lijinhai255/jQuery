(function() {
	// 将所有js语句书写在IIFE中，可以有效的避免变量之间的污染
	// 获取元素
	var $carousel = $("#carousel");
	var $circles = $("#circles ol li");
	var $imgs = $("#imgs ul li");
	// 创建li元素
	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));
	// width 138.33  height 143.66

	// 点击close对应的父元素消失
	$(".close").click(function() {
		$(this).parent().fadeOut(600);
	})


	// 当页面刷新第一个蒙版加入淡入效果
	$(".mask").eq(0).fadeOut(0).fadeIn(1000);


	// 设置一个数组， 用于存放18张碎图片， 图片1
	var arr = (function() {
		var temp = [];
		// 将图片分为3 * 6的格式
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 6; j++) {
				temp.push($("<div></div>").css({
					"width": 0,
					"height": 0,
					"background": "url(images/slider-img1.jpg) no-repeat " + - j * 138.33 + "px " + - i * 143.66 + "px",
					"position": "absolute",
					"left": j * 138.33,
					"top": i * 143.66
				}).appendTo($maoni));
			}
		}
		return temp;
	})();

	// 定义小圆点的信号量
	var small_idx = 0;
	// 定义大图的信号量
	var big_idx = 0;

	// 定义锁
	var lock = true;



	// 开启定时器
	var timer = setInterval(function() {
		// 小圆点的信号改变
		small_idx++;
		// 判断小圆点的信号，确保有效值
		if (small_idx > $circles.length - 1) {
			small_idx = 0;
		}
		// console.log(small_idx);
		// 使用call改变change函数的this指向
		change.call($circles.eq(small_idx));
	}, 6000);


	// 当鼠标移入carousel的时候， 停止定时器
	$carousel.mouseenter(function() {
		// 清除定时器
		clearInterval(timer);	
	})

	// 当鼠标离开carousel的时候， 重新开启定时器
	$carousel.mouseleave(function() {
		// 设表先关
		clearInterval(timer);

		// 重新赋值timer
		timer = setInterval(function() {
			// 小圆点的信号改变
			small_idx++;
			// 判断小圆点的信号，确保有效值
			if (small_idx > $circles.length - 1) {
				small_idx = 0;
			}
			// console.log(small_idx);
			// 使用call改变change函数的this指向
			change.call($circles.eq(small_idx));
		}, 6000);
	})

	// 小圆点点击事件
	$circles.click(change);

	function change() {
		// 节流
		if (!lock) {
			return;
		}
		// 关闭锁
		lock = false;

		// 改变小圆点信号量
		small_idx = $(this).index();
		// console.log(small_idx);

		// 如果小圆点的信号量与大图的信号量相等， 什么也不做
		if (small_idx === big_idx) {
			// 开锁
			lock = true;
			return;
		}


		// 当前小圆点加cur
		$(this).addClass("cur").siblings().removeClass("cur");
		// 原来对应大图的蒙版消失
		$(".mask").eq(big_idx).fadeOut(600);

		// 猫腻图出现, 添加active
		$maoni.addClass("active");

		// 轮换猫腻图
		// 使用$.each循环改变图片
		$.each(arr, function(index, value) {
			// console.log(value);
			// value表示的是每一个div
			// 对应小圆点信号量的大图要出现
			value.css("backgroundImage", "url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width": 138.33,
				"height": 143.66
			}, 300 + Math.random() * 3000);
		})

		// 定义延时器，在所有碎片图出现后要做的事情
		setTimeout(function() {
			// 碎图消失，把盛放碎片的容器宽高变为0
			$.each(arr, function(index, value) {
				value.css({
					"width": 0,
					"height": 0
				})
			})

			// 对应小圆点的真图要出现了
			big_idx = small_idx;
			// 让对应的大图添加active
			$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
			// 对应大图的蒙版淡入
			$(".mask").eq(big_idx).fadeOut(0).fadeIn(1000);

			// 所有的事情完毕之后， 打开锁
			lock = true;
		}, 3300)

	}














})();