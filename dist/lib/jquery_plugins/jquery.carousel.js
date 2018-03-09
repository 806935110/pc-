;
(function($){
	function Carousel({imgs, width, height,type,duration,isAutoPlay}) {
		this.len=imgs.length;
		this.imgs = imgs; // 待轮播图片的数组，数组元素是对象，包括图片路径与链接地址的属性
		this.width = width; // 轮播图宽度
		this.height = height; // 轮播图高度
		this.type=type;//fade-淡入淡出     slide-左右滑动
		this.lis=null;
		this.circles=null;//圆点
		this.duration = duration; // 轮播切换时间间隔
		this.currentIndex = 0; // 当前显示图片的索引
		this.nextIndex = 1; // 即将显示图片的索引
		this.ul=null;
		this.allImgs = null; // 所有待轮播的图片盒子
		this.circles = null; // 所有小圆点
		this.prev = null; // 向上
		this.next = null; // 向下
		this.timer = null; // 轮播计时器
		this.container = null; // 轮播图最外层容器
		this.isAutoPlay=isAutoPlay || true;
	}
	
	Carousel.prototype={
		constructor:Carousel,
		//初始化DOM元素
		init:function(container){
			//动态创建html结构
		var html=
			`<div class="hl_carousel">
				<ul class="imgs">`;
//		串连轮播的图片布局
		for(var i=0;i<this.len;i++){
			html+=`<li><a href="$(this.imgs[i].href)"><img src="${this.imgs[i].src}"></a></li>`
			
		}
		
		
		html+=`</ul>
				<div class="pages"></div>
				<div class="prev">&lt;</div>
				<div class="next">&gt</div>
			</div>`;
			//页面渲染
		$(container).html(html);
		//设置各元素css样式
		this.container = $(".hl_carousel",container).css({
			width:this.width,
			height:this.height,
			overflow:"hidden",
			position:"relative"
		});
		
		//ul宽度
		this.ul=$(".imgs",container).css({
			list_style:"none",
			width:(this.type==="fade"? this.width : this.width*this.len),
			height:this.height,
			position:this.type==="fade"?"relative" : "absolute"
		});
		//11111111111111111111111111111111
		this.quju=$("ul").css({
			padding:"0",
			margin:"0"
		});
		this.pages=$(".pages",container).css({
			height:"25px",
			position:"absolute",
			bottom:"0",
//			background:"#666666",
//			opacity:"0.8",
			textAlign:"center"
		});
	
		this.prev=$(".prev",container).css({
			width:"30px",
			height:"60",
			background:"#000",
			color:"#fff",
			position:"absolute",
			top:"0",
			bottom:"0",
			margin:"auto",
			textAlign:"center",
			lineHeight:"60px",
			fontSize:"40px",
			cursor:"pointer",
			opacity:"0.6"
		});
		this.next=$(".next",container).css({
			width:"30px",
			height:"60",
			background:"#000",
			color:"#fff",
			position:"absolute",
			top:"0",
			bottom:"0",
			margin:"auto",
			textAlign:"center",
			lineHeight:"60px",
			fontSize:"40px",
			cursor:"pointer",
			opacity:"0.6",
			right:"0"
		});
		
		
		if(this.type==="slide"){
			$(".imgs").first().children().first().clone().appendTo($(".imgs"));
		}                                                                                                                                                                                                               
		console.log($(".imgs").children());
//		所有li的样式设置
		this.lis=$(".imgs li",container).css({
			width: this.width,
			height: this.height
		});
		this.img=$("img",container).css({
			width:this.width,
			height:this.height
		});
		
		
		
		
		
		
		if(this.type==="fade"){
			this.lis.css({
				position:"absolute",
				top:0,
				left:0,
				display:"none"
			}).first().show();
		}else if(this.type==="slide"){
			
				//html+=`<li><a href="$(this.imgs[0.href)"><img src="${this.imgs[0].src}"></a></li>`
			this.lis.css({
				float:"left"
			});
		}
//		小圆点
		var html="";
		for(var i=0;i<this.len;i++){
			html+="<i></i>";
		}
		
		
		
		
		this.circles=$(".pages",container).css({
			width:this.width
		}).html(html).children("i");
		this.circles.first().addClass("current")
//		圆点样式
//		this.i=$(".pages i",container).css({
//			display:"inline-block",
//			width:"20px",
//			height:"20px",
//			borderRadius:"10px",
//			background:"#cccccc",
//			margin:"5px"
//		});
//		this.current=$(".current",container).css({
//			background:"red"
//		});
//		
		this.prev = $(".prev",container);
		this.next = $(".next",container);
		
		if(this.isAutoPlay)
			this.autoPlay();
		this.registerEventListener();
		
		
		},
	
	//自动轮播
	
	
	autoPlay:function(){
		this.timer= setInterval(()=>{
			this.move();
		},this.duration);
	},
	
	//方法
	move:function(){
		
		if(this.type==="fade"){
			this.fade();
		}else if(this.type==="slide"){
			
//			$(this).first().clone().appendTO("ul");
			this.slide();
//			console.log(this);
		}
	},
	//淡入方式
	fade:function(){
		this.lis.eq(this.currentIndex).fadeOut();
		this.lis.eq(this.nextIndex).fadeIn();
		
		this.circles.eq(this.currentIndex).removeClass("current");
		this.circles.eq(this.nextIndex).addClass("current");
		
		this.currentIndex=this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex>=this.len)
			this.nextIndex=0;
	
	},
	//滑动方式
	slide:function(){
		
		var _left=-1*this.width*this.nextIndex;
		this.ul.stop().animate({left:_left});
		
		this.circles.eq(this.currentIndex).removeClass("current")
		
		this.circles.eq(this.nextIndex).addClass("current");
		

				
				
		this.currentIndex=this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex>=this.len)
			this.nextIndex=0;
			

	},
	
		registerEventListener : function(){
			this.container.hover(()=>{
				clearInterval(this.timer);
			},()=>{
				this.timer = setInterval(()=>{
					this.move();
				},this.duration)
			});
			var that=this;
			this.circles.mouseover(function(){
				var index=$(this).index()
				if(that.currentIndex===index)
					return;
				that.nextIndex=index;
				that.move();
			});
			this.prev.click(()=>{
				this.nextIndex=this.currentIndex - 1;
				if(this.nextIndex<0)
					this.nextIndex = this.len-1;
				this.move();
			});
			this.next.click(()=>{
				this.move();
			});
		}
	};
//	圆点样式
//		console.log($(".box").first());
//		this.i=$(".pages i").css({
//			display:"inline-block",
//			width:"20px",
//			height:"20px",
//			borderRadius:"10px",
//			background:"#cccccc",
//			margin:"5px"
//		});
//		this.current=$(".current").css({
//			background:"red"
//		});
	$.fn.extend({
		carousel:function(options){
			this.each(function(index,element){
				new Carousel(options).init($(element))
			});
		}
	});
	
}(jQuery));
