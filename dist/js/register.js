"use strict";require(["config"],function(){require(["jquery","template","load","carousel"],function(i,o){i(function(){var e=!0;i("#sj").blur(function(){var t=i(this).val();i.get("http://localhost/php/check.php",{email:t},function(o){console.log(t),0==o.res_body.status?(e=!1,i(".email_info").text("邮箱可用")):(e=!0,i(".email_info").text("邮箱已被注册，请重新输入"))},"json")}),i("form").submit(function(){return e||i.ajax({type:"post",url:"http://localhost/php/register.php",data:i(this).serialize(),dataType:"json",success:function(o){console.log(o),0===o.res_code?(i.cookie.json=!0,i.cookie("loginUser",o.res_body,{path:"/"}),location="/html/login.html"):i("#error").text("用户注册失败，请稍后重试...")}}),!1})})})});