require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		$.getJSON("/mock/list.json", function(data){
			data = {list : data.res_body.data};
			let html = template("list_template", data);
			$(".list").html(html);

	
		});

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
		$("dl").click(function(){
			var prod={
					id:$(this).children(".id").text(),
					img:$(this).children("dt").children("a").children("img").attr("src"),
					title:$(this).children("dd").children("p").text(),
					price:$(this).children("dd").children("i").text()
				}
				// console.log(prod);
				$.cookie.json=true;
				$.cookie("shangping", prod, {path:"/"});
				location="/html/detail.html"
		});

		$(".ccc").click(function(){
			location="/html/list.html"
		});


		// 轮播图
		$(".carousel").carousel({
					imgs:[
						{src:"../images/carouse-1.jpg",href:"#"},
						{src:"../images/carouse-2.jpg",href:"#"},
						{src:"../images/carouse-3.jpg",href:"#"},
						{src:"../images/carouse-4.jpg",href:"#"}
					],
					width:700,
					height:400,
					type:"fade",
					duration:3000,
				});
		

	});
});



	