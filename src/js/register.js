require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		// $.get("/mock/list.json", function(data){
		// 	data = {list : data.res_body.data};
		// 	let html = template("list_template", data);
		// 	$(".list").html(html);
		// });
			$(function(){
			/* 验证注册的邮箱是否被占用 */
			let isExist = true; // 标记邮箱是否被占用，true--占用 false--未被占用
			$("#sj").blur(function(){
				var so=$(this).val();
					$.get("http://localhost/php/check.php", {email: so}, function(data){
					console.log(so);
						if (data.res_body.status == 0) {
							isExist = false;
							$(".email_info").text("邮箱可用");
						} else {
							isExist = true;
							$(".email_info").text("邮箱已被注册，请重新输入");
						}
					},"json");
				});

				/* 提交注册表单，注册用户 */
				$("form").submit(function(){
					if (!isExist) { // 邮箱未被占用，则提交注册信息
						$.ajax({
							type : "post",
							url : "http://localhost/php/register.php",
							data : $(this).serialize(),
							dataType : "json",
							success : function(data){
								console.log(data);
								if (data.res_code === 0) {
									// 保存注册成功的用户信息到 cookie 中
									$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
									$.cookie("loginUser", data.res_body, {path:"/"});
									location = "/html/login.html";
								} else {
									$("#error").text("用户注册失败，请稍后重试...");
								}
							}
						});
					}

					/*{
							email : $(":text[name='email']").val(),
							password : $(":password[name='password']").val(),
							firstname : $(":text[name='firstname']").val(),
							lastname : $(":text[name='lastname']").val()
						}*/
					// console.log($(".reg_form").serialize());

					return false;
				});
			});
				
		
	});
});
