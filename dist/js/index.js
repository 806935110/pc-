"use strict";require(["config"],function(){require(["jquery","template","load","carousel"],function(t,r){t.getJSON("/mock/list.json",function(e){e={list:e.res_body.data};var i=r("list_template",e);t(".list").html(i)}),t(".list").delegate(".shangping","click",function(){var e={id:t(this).children(".id").text(),img:t(this).children("a").children("img").attr("src"),title:t(this).children("h5").text(),price:t(this).children(".jiage").children("h3").text()};t.cookie.json=!0,t.cookie("shangping",e,{path:"/"})}),t(".carousel").carousel({imgs:[{src:"../images/carouse-1.jpg",href:"#"},{src:"../images/carouse-2.jpg",href:"#"},{src:"../images/carouse-3.jpg",href:"#"},{src:"../images/carouse-4.jpg",href:"#"}],width:700,height:400,type:"fade",duration:3e3})})});