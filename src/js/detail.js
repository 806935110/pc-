require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		// $.get("/mock/list.json", function(data){
		// 	data = {list : data.res_body.data};
		// 	let html = template("list_template", data);
		// 	$(".list").html(html);
		// });


		// 加载商品
		$.cookie.json=true;
		var _prod=$.cookie("shangping");
		// console.log(_prod);
		$(".id").text(_prod.id);
		$("h5").text(_prod.title);
		$("h3").text(_prod.price);
		$(".im").attr("src", _prod.img);




		
		// 放大镜
		$.fn.extend({
			show : function(){
				this.css("display", "block");
			},
			hide : function(){
				this.css("display", "none");
			},
			offset : function(coordinates) {
				// 获取
				if (typeof coordinates === "undefined") {
					let _top = 0, _left = 0, element = this[0];
					while (element !== null) {
						_top += element.offsetTop;
						_left += element.offsetLeft;
						element = element.offsetParent;
					}

					return {
						top : _top,
						left : _left
					};
				}
				
				/* 设置 */
				for (let i = 0, len = this.length; i < len; i++) {
					let element = this[i],
						parent = element.offsetParent,
						_top = 0,
						_left = 0;
					// 计算父元素在文档中的坐标
					while (parent !== null) {
						_top += parent.offsetTop;
						_left += parent.offsetLeft;
						parent = parent.offsetParent;
					}
					// 计算子元素在其父元素坐标系中的坐标定位
					_top = coordinates.top - _top;
					_left = coordinates.left - _left;
					// 设置CSS
					$(element).css({
						top : _top + "px",
						left : _left + "px"
					});
				}

				return this;
			},
			position : function(){
				return {
					top : this[0].offsetTop,
					left : this[0].offsetLeft
				};
			}
		});

		

		// 放大镜对象
		var zoom = {
			enter : function() {
				$(".len,.big").show();
			},
			leave : function(){
				$(".len,.big").hide();
			},
			move : function(e){
				e = e || event;
				$(".len").offset({
					top : e.pageY - 50,
					left : e.pageX - 50
				});

				// 获取镜头在其有定位的父元素坐标系中的坐标
				let _top = $(".len").position().top,
					_left = $(".len").position().left;
				// 判断是否超出范围
				if (_top < 0)
					_top = 0;
				else if (_top > 300)
					_top = 300;
				if (_left < 0)
					_left = 0;
				else if (_left > 300)
					_left = 300
				$(".len").css({
					top : _top + "px",
					left : _left + "px"
				});
				// 移动放大图片
				$("#big_img").css({
					top : -1 * _top + "px",
					left : -1 * _left + "px"
				});
			},
			register : function(){
				$(".middle").on("mouseenter", () => {
					this.enter();
				}).on("mouseleave", ()=>{
					this.leave();
				}).on("mousemove", ()=>{
					this.move();
				});
			}
		};

		zoom.register();
		// 加入购物车
		$(".bt").click(function(){

					var product={
						id:$(".id").text(),
						img:$("#big_img").attr("src"),
						title:$("h5").text(),
						price:$("h3").text(),
						sub:$("h3").text(),
						amount:1
					};
					// 获取商品cookie信息
								$.cookie.json = true;
								let _cookie = $.cookie("products"),
									index;
								_cookie = _cookie || [];

								// 判断当前选购商品是否以前已经加入了购物车
								index = _cookie.length > 0 ? exist(_cookie,product.id) : -1;

								// 修改/添加商品信息
								if(index === -1)
									_cookie.push(product);
								else
									_cookie[index].amount += product.amount;

								// 保存到cookie
								$.cookie("products",_cookie,{expires: 7, path: "/"});

								// 跳转到购物车
								// location = "/html/cart.html";
								// 购物车商品数量
								$.cookie.json=true;
								var _products=$.cookie("products");
								var _login=$.cookie("loginUser");
								// console.log(_login);
								if(_products)
								$(".cart_sum").text(_products.length);
								else
								$(".cart_sum").text(0);
								location.reload(); 
								// alert("加入成功");
								return false;
			});

			// 		var _products=[];
			// 		_products.push(_prod);
			// 		// console.log(_prod);
				
			function exist(arr,id){
				for(let i = 0,len = arr.length; i < len; i++){
					if(arr[i].id == id)
						return i;
				}
				return -1;
			}			
			// 	$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
			// 	$.cookie("products", _products, {path:"/"});
			// 	alert("加入成功......")
			// });
		
		$(".minus").click(function(){
			// console.log(Number($(".amount").val()));
			var a=Number($(".amount").val());
			
			if(a=1){
				$(".amount").val(1);
			}else{
				$(".amount").val(a-1);
			}
			
		});
		$(".add").click(function(){
			// console.log(Number($(".amount").val()));
			var a=Number($(".amount").val());
			$(".amount").val(a+1);
			
			
		});
	});
});
