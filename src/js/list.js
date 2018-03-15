require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		$.getJSON("/mock/list.json", function(data){
			data = {list : data.res_body.data};
			let html = template("list_template", data);
			$(".list").html(html);

	
	// 商品详情
		$(".list").delegate(".shangping","click",function(){
				var prod={
					id:$(this).children(".id").text(),
					img:$(this).children("a").children("img").attr("src"),
					title:$(this).children("h5").text(),
					price:$(this).children(".jiage").children("h3").text()
				}
				// console.log(prod);
				$.cookie.json=true;
				$.cookie("shangping", prod, {path:"/"});

			});
		});
	});
});