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
					$(".suggest").html(html);
				}
			});
		});
		
		$.cookie.json=true;
		var _products=$.cookie("products");
		// console.log(_products);
		$(".cart_sum").text(_products.length);

	
	});
	// 尾部
	$("footer").load("/html/include/footer.html", function(){

	});
});
