"use strict";define(["jquery","cookie"],function(){$("header").load("/html/include/header.html",function(){$(".text").on("keyup",function(){var t="https://suggest.taobao.com/sug?code=utf-8&q="+$(this).val()+"&callback=?";$.ajax({type:"get",url:t,dataType:"jsonp",success:function(t){var e="";t.result.forEach(function(t){e+="<div>"+t[0]+"</div>"}),$(".suggest").html(e)}})})}),$("footer").load("/html/include/footer.html",function(){})});