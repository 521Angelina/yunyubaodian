var homesro=new IScroll("#home");
var datalistsro=new IScroll("#list");
var datesro=new IScroll("#date");
var favsro=new IScroll("#fav");
var tersro=new IScroll("#term");
$(function(){
	//声明全局变量用来存储数据
	var data;//全局变量
	var hh;//头部标题
	//底部动画
	$("#footernav").on("click","a",function(e){
		e.preventDefault();
		var boxid=$(this).attr("href");
		$(boxid).css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		//滑块
		var index=$(this).parent().index();
		var num=index*25+"%";
		$("#mark").css({"left":num,"-webkit-transition":"-webkit-transform 1s"})
		//头部的标题
		var tex=$(this).attr("title");
		$("#lable").html(tex);
		$("#sear").css("display","none");
		$("#header").css("display","block");
		$("#return").css("display","none");
		//收藏
		if(boxid=="#fav"){
			var str="";
			for(var i=0;i<localStorage.length;i++){
				str+="<p><a href='#date' title='"+localStorage.key(i)+"'>"+localStorage.key(i)+"</a></p>"
			}
			$("#return").attr("title","list-2");
			$("#favlist").html(str);
			$("#return").css("display","block");
			$("#collect").css("display","none");
			$("#search").css("display","block");
			favsro.refresh(); 
		}
		//历史记录
		if(boxid=="#history"){
			var str="";
			for(var i=0;i<localStorage.length;i++){
				str+="<p><a href='#date' title='"+localStorage.key(i)+"'>"+localStorage.key(i)+"</a></p>"
			}
			$("#return").attr("title","list-2");
			$("#favlist").html(str);
			$("#return").css("display","block");
			$("#collect").css("display","none");
			$("#search").css("display","block");
			favsro.refresh();
		}
	})
	//home中点击图片转换到二级菜单
	$("#home_ul li>a").on("click",function(e){
		//阻止默认行为
		e.preventDefault();
		$("#list").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		$("#return").css("display","block").attr("title","home-1");
		//获取当前请求的点击的id属性和title属性
		var key=$(this).attr("id");
		var title=$(this).attr("title");
		//标题
		$("#lable").html(title);
		hh=title;
		//请求数据
		$.ajax({
			url:"data.json",
			success:function(e){
				data=e;
				//处理数据
				var datalist=e[key].fenlei;
				var str="";
				for(var i in datalist){
					var atitle=key+"-"+i;
					str+="<a href='#date' title="+atitle+" ><dl><dt><img src='img/tu/"+datalist[i].img+"'></dt><dd>"+datalist[i].title+"</dd></dl></a>"
				}
				$("#datalist").html(str);
				//刷新dom页面
				datalistsro.refresh();
			}
		})
	})
	//进入到详细页面
	$("#list").on("click","a",function(e){
		//阻止默认行为
		e.preventDefault();
		$("#date").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		//返回设置按钮的的设置标题
		$("#return").attr("title","list-2");
		//获取到点击的title
		var arr=$(this).attr("title").split("-");
		//隐藏搜索
		$("#search").css("display","none");
		$("#collect").css("display","block");
		//设置标题
		$("#lable").html(data[arr[0]].fenlei[arr[1]].title)
		//设置文章内容
		var str="<p id='pcon'>"+data[arr[0]].fenlei[arr[1]].content+"</p>";
		$("#datalis").html(str);
		datesro.refresh();
	})
	//返回
	$("#return").on("click",function(e){
		e.preventDefault();
		var arr=$(this).attr("title").split("-");
		$("#"+arr[0]).css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		if(arr[1]==1){
			$("#return").css("display","none");
			$("#lable").html("孕育宝典");
		}else if(arr[1]==2){
			//当有三级页面时进入到二级页面，设置return的title的一级
			//按返回按钮返回到前一个页面
			$("#return").attr("title","home-1");
			$("#collect").css("display","none");
			$("#search").css("display","block");
			$("#lable").html(hh);
		}
	})
	//点击收藏按钮
	$("#collect").on("click",function(e){
		e.preventDefault();
		var title=$("#lable").html();
		var con=$("#pcon").html();
		var res=title+con;
		for(var i=0;i<localStorage.length;i++){
			if(localStorage.key(i)==title){
				alert("收藏成功");
				return false;
			}
		}
		localStorage.setItem(title,con);
		alert("已经收藏过啦，不能够重复收藏");
	})
	//在收藏页面进入到详细页面
	$("#fav").on("click","a",function(e){
		e.preventDefault();
		$("#date").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		var title=$(this).attr("title")
		//根据title 查询内容
		var con=localStorage.getItem(title)
		//隐藏搜索
		$("#search").css("display","block");
		$("#collect").css("display","none");
		//设置文章内容
		var str="<p id='pcon'>"+con+"</p>";
		$("#datalis").html(str);
		datesro.refresh();
	})
	//历史记录
	$("#history").on("click","a",function(e){
		e.preventDefault();
		$("#date").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
		var title=$(this).attr("title")
		//根据title 查询内容
		var con=localStorage.getItem(title)
		//隐藏搜索
		$("#search").css("display","block");
		$("#collect").css("display","none");
		//设置文章内容
		var str="<p id='pcon'>"+con+"</p>";
		$("#datalis").html(str);
		datesro.refresh();
	})
	/*点击搜索按钮*/
	$("#search").on("click",function(e){
		e.preventDefault();
		$("#header").css("display","none");
		$("#sear").css("display","block");
		$("#term").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 2s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 2s"});
	})
	//点击搜索按钮
	$("#btn1").on("click",function(){
		var inputVal=$("#txt").val();
		$.ajax({
			url:"data.json",
			success:function(e){
				data=e;
				var str="";
				for(var i in data){
					var text=data[i].fenlei;
					for(var k in text){
						var title=text[k].title;
						var cont=data[i].fenlei[k].content;
						if(title.indexOf(inputVal)!=-1){
							str+="<p class='bot' title='"+cont+"'>"+title+"</p>";
						}
					}
				}
				if(title.indexOf(inputVal)==-1){
					//alert("内容不存在");
				}
				$("#termp").html(str);
				tersro.refresh();
			}
		})
		//转到详细的页面三级页面
		$("#termp").on("click","p",function(){
			$("#termsea").css({"-webkit-transform":"translateX(0)","-webkit-transition":"-webkit-transform 1s"}).siblings().css({"-webkit-transform":"translateX(100%)","-webkit-transition":"-webkit-transform 1s"})
			$("#header").css("display","block");
			$("#sear").css("display","none");
			$("#collect").css("display","none")
			$("#label").html($(this).text());
			$("#seachbox2").html($(this).attr("title"));
		})
	})
})