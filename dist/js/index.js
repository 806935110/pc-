"use strict";require(["config"],function(){require(["jquery","template","load","carousel"],function(t,c){t.getJSON("/mock/list.json",function(i){i={list:i.res_body.data};var e=c("list_template",i);t(".list").html(e)}),t(".list").delegate(".shangping","click",function(){var i={id:t(this).children(".id").text(),img:t(this).children("a").children("img").attr("src"),title:t(this).children("h5").text(),price:t(this).children(".jiage").children("h3").text()};t.cookie.json=!0,t.cookie("shangping",i,{path:"/"})}),t("dl").click(function(){var i={id:t(this).children(".id").text(),img:t(this).children("dt").children("a").children("img").attr("src"),title:t(this).children("dd").children("p").text(),price:t(this).children("dd").children("i").text()};t.cookie.json=!0,t.cookie("shangping",i,{path:"/"}),location="/html/detail.html"}),t(".ccc").click(function(){location="/html/list.html"}),t(".carousel").carousel({imgs:[{src:"../images/carouse-1.jpg",href:"#"},{src:"../images/carouse-2.jpg",href:"#"},{src:"../images/carouse-3.jpg",href:"#"},{src:"../images/carouse-4.jpg",href:"#"}],width:700,height:400,type:"fade",duration:3e3})})});