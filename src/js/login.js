require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		// $.get("/mock/list.json", function(data){
		// 	data = {list : data.res_body.data};
		// 	let html = template("list_template", data);
		// 	$(".list").html(html);
		// });
		$(function(){
			/* 用户登录 */
			$("form").submit(function(){
				var so=$(this).serialize();
				$.post("http://localhost/php/login.php", so, function(data){
					console.log(so);
					if (data.res_code === 0) {
						// 保存登录成功的用户信息到 cookie 中
						$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
						$.cookie("loginUser", data.res_body, {path:"/"});
						location = "/index.html";
					} else {

						$("#error").text("用户名或密码错误");
					}
				}, "json");

				return false;
			});
		});
		
		
	});
});


