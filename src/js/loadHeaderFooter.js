define(["jquery", "cookie"], function() {
	// 头部
	$("header").load("/html/include/header.html", function(){
		/* 绑定搜索键盘事件 */
		$(".text").on("keyup", function(){
			// jsonp 接口
		let val = $(this).val(),
			url = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`;
			$.ajax({
				type : "get",
				url : url,
				dataType : "jsonp",
				success : function(data){
					let html = "";
					data.result.forEach(function(curr){
						html += `<div>${curr[0]}</div>`;
					});
					$(".suggest").css("display","block");
					$(".suggest").html(html);
					$(".text").blur(function(){
							$(".suggest").css("display","none");
					});

					

				}
			});
		});
		
		$.cookie.json=true;
		var _products=$.cookie("products");
		var _login=$.cookie("loginUser");
		// console.log(_login);
		if(_products)
		$(".cart_sum").text(_products.length);
		else
		$(".cart_sum").text(0);
		// 用户状态
		if(_login.email){
			$(".ydl").css("display","block");
			$(".wdl").css("display","none");
			$(".ydl").children("span").text(_login.email);
		}else{
			$(".ydl").css("display","none");
			$(".wdl").css("display","block");
		}
		
		$(".ydl").children("i").click(function(){
			
			$.cookie("loginUser",{path:"/"});
			// console.log(_login);
			location.reload();
		});

		
			
	});
	// 尾部
	$("footer").load("/html/include/footer.html", function(){

	});
});
