require(["config"], function(){
	require(["jquery", "template", "load", "carousel"], function($, template){
		$.cookie.json=true;
		var _products=$.cookie("products")|| [];
		// console.log(_products);
		let len=_products.length;
		if(len===0){

			$(".ss").css("display","none");
			$(".kong").css("display","block");
			$("#hj").text(0);
		}else{
			$(".ss").css("display","block");
			$(".kong").css("display","none");
		}
			var so=_products[0];
			$(".id").text(so.id);
			$(".img").children("img").attr("src", so.img);
			$(".title").text(so.title);
			$(".price").text(so.price);
			$(".sub").text(so.sub);
			$(".amount").text(so.amount);

			var html="";
			_products.forEach( function(product){
			html += `<div class="header">
						<div class="id" style="display:none;">${product.id}</div>
						<div class="quanxuan"><input type="checkbox" name="" class="xz"></div>
						<div class="img"><img src="${product.img}"></div>
						<div class="title" title="${product.title}">${product.title}</div>
						<div class="price">${product.price}</div>
						<div class="amount"><span class="minus">-</span><input type="text" class="amount_input" value="${product.amount}"><span class="add">+</span></div>
						<div class="sub">${(product.price * product.amount).toFixed(2)}</div>
						<div class="oper"><a href="javascript:void(0);" class="del">删除</a></div>
					</div>`;
		});
		
		$(".cart").html(html);
		
		// 删除商品
		$(".cart").delegate(".oper","click",function(){
				let _id=Number($(this).parent(".header").children(".id").text());
			// 	var index = exist(_products,_id);
				for(let i=0,len=_products.length;i<len;i++){
					if(_products[i].id==_id){
						// console.log(i);
						location.reload();
						_products.splice(i,1);
						$(this).parent(".header").remove();
						$.cookie("products", _products, {path:"/"});
						// 商品件数
						$("#jianshu").text(_products.length);

						let _pro=$.cookie("products");
						let hj=0;
						for(let i=0,len=_pro.length;i<len;i++){
							hj+=Number(_pro[i].price*_pro[i].amount);
							let _hj=hj.toFixed(2);
							// console.log(hj);
							$("#hj").text(hj);

							return;
						}


						return;
				}
			}
		});

		// 商品加减
		$(".amount").delegate(".add","click",function(){
			let _id=Number($(this).parents(".header").children(".id").text());
			let _amount=Number($(this).parents(".header").children(".amount").children(".amount_input").val());
			for(let i=0,len=_products.length;i<len;i++){
					if(_products[i].id==_id){
						_products[i].amount++;

						$.cookie("products", _products, {path:"/"});
						$(this).parents(".header").children(".amount").children(".amount_input").val(_amount+1);
						$(this).parents(".header").children(".sub").text((_products[i].amount*_products[i].price).toFixed(2));
						// 商品件数
						$("#jianshu").text(_products.length);

						let _pro=$.cookie("products");
						let hj=0;
						for(let i=0,len=_pro.length;i<len;i++){
							hj+=Number(_pro[i].price*_pro[i].amount);
							let _hj=hj.toFixed(2);
							// console.log(hj);
							$("#hj").text(hj);
							return;
						}


						return;
				}
			}

		});

		$(".amount").delegate(".minus","click",function(){
			let _id=Number($(this).parents(".header").children(".id").text());
			let _amount=Number($(this).parents(".header").children(".amount").children(".amount_input").val());
			for(let i=0,len=_products.length;i<len;i++){
					if(_products[i].id==_id){
						if(_products[i].amount>1){
								_products[i].amount--;
								$.cookie("products", _products, {path:"/"});
								$(this).parents(".header").children(".amount").children(".amount_input").val(_amount-1);
								$(this).parents(".header").children(".sub").text((_products[i].amount*_products[i].price).toFixed(2));

								// 商品件数
								$("#jianshu").text(_products.length);

								let _pro=$.cookie("products");
								let hj=0;
								for(let i=0,len=_pro.length;i<len;i++){
									hj+=Number(_pro[i].price*_pro[i].amount);
									let _hj=hj.toFixed(2);
									// console.log(hj);
									$("#hj").text(hj);
									return;
								}


								return;
						}
						
						
				}
			}

		});
		// 输入商品
		$(".amount").delegate(".amount_input","blur",function(){
			let _id=Number($(this).parents(".header").children(".id").text());
			let _amount=Number($(this).parents(".header").children(".amount").children(".amount_input").val());
			for(let i=0,len=_products.length;i<len;i++){
					if(_products[i].id==_id){
						let _a=_products[i].amount;
						if(_amount>=1){
								_products[i].amount=_amount;
								$.cookie("products", _products, {path:"/"});
								// $(this).parents(".header").children(".amount").children(".amount_input").val(_amount-1);
								$(this).parents(".header").children(".sub").text((_products[i].amount*_products[i].price).toFixed(2));
								// 商品件数
								$("#jianshu").text(_products.length);

								let _pro=$.cookie("products");
								let hj=0;
								for(let i=0,len=_pro.length;i<len;i++){
									hj+=Number(_pro[i].price*_pro[i].amount);
									let _hj=hj.toFixed(2);
									// console.log(hj);
									$("#hj").text(hj);
									return;
								}

								return;
						}else{
								$.cookie("products", _products, {path:"/"});
								$(this).parents(".header").children(".amount").children(".amount_input").val(_a);
								$(this).parents(".header").children(".sub").text((_products[i].amount*_products[i].price).toFixed(2));



						}
						
						
				}
			}

		});

		// 商品件数
		$("#jianshu").text(_products.length);

		let _pro=$.cookie("products");
		let hj=0;
		for(let i=0,len=_pro.length;i<len;i++){
			hj+=Number(_pro[i].price*_pro[i].amount);
			let _hj=hj.toFixed(2);
			// console.log(hj);
			$("#hj").text(hj);

		}
		
		

				/* 全选 */
			$(".qx").click(function(){
				// 获取“全选”复选框选中状态
				let status = $(this).prop("checked");
				// 设置所有行前复选框选中状态与“全选”一致
				$(".xz").prop("checked", status);
				$(".qx").prop("checked", status);
				calcTotal()
			});
			/* 部分选中 */
			$(".cart").on("click", ".xz", function(){
				$(".qx").prop("checked", $(".xz:checked").length === _products.length)
				/*if ($(".ck_prod:checked").legnth === _products.length)
					$(".ck_all").prop("checked", true);
				else
					$(".ck_all").prop("checked", false);*/

				calcTotal();
			});
			/* 计算合计金额 */
			function calcTotal() {
				let total = 0;
				$(".xz:checked").each(function(){
					total += Number($(this).parents(".header").children(".sub").text())
				});
				// console.log(total);
				$(".c > p>span").text(total);
			}
		return;
			
	});
});
