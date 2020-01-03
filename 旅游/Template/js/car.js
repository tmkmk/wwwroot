
	// 人数点一加一
let oadd=document.getElementById("right_4add");
	let oacc=document.getElementById("right_4acc");
	let otext=document.getElementById("goods-num");
	
	oadd.onclick=function(){
		otext.value++;
	}
	oacc.onclick=function(){
		otext.value--;
		if(otext.value<1){
			otext.value=1;
		}
	}
	
	
    $(".car").eq(0).mouseover(function(){
    	$(".show").eq(0).css({display:"block"});
    	$(".show").not($(".show").eq(0)).css({display:"none"});
    });
	$(".car").eq(1).mouseover(function(){
		$(".show").eq(1).css({display:"block"});
		$(".show").not($(".show").eq(1)).css({display:"none"});
	});
	$(".car").eq(2).mouseover(function(){
		$(".show").eq(2).css({display:"block"});
		$(".show").not($(".show").eq(2)).css({display:"none"});
	});
	$(".car").eq(3).mouseover(function(){
		$(".show").eq(3).css({display:"block"});
		$(".show").not($(".show").eq(3)).css({display:"none"});
	});
	$(".car").eq(4).mouseover(function(){
		$(".show").eq(4).css({display:"block"});
		$(".show").not($(".show").eq(4)).css({display:"none"});
	});
	$(".car").eq(5).mouseover(function(){
		$(".show").eq(5).css({display:"block"});
		$(".show").not($(".show").eq(5)).css({display:"none"});
	});
	$(".car").eq(6).mouseover(function(){
		$(".show").eq(6).css({display:"block"});
		$(".show").not($(".show").eq(6)).css({display:"none"});
	});
	
	$(".car").eq(7).mouseover(function(){
		$(".show").eq(7).css({display:"block"});
		$(".show").not($(".show").eq(7)).css({display:"none"});
	});
	$(".car").eq(8).mouseover(function(){
		$(".show").eq(8).css({display:"block"});
		$(".show").not($(".show").eq(8)).css({display:"none"});
	});
	$(".car").eq(9).mouseover(function(){
		$(".show").eq(9).css({display:"block"});
		$(".show").not($(".show").eq(9)).css({display:"none"});
	});
	
	$(".car").eq(10).mouseover(function(){
		$(".show").eq(10).css({display:"block"});
		$(".show").not($(".show").eq(10)).css({display:"none"});
	});
	$(".car").eq(10).mouseover(function(){
		$(".show").eq(10).css({display:"block"});
		$(".show").not($(".show").eq(10)).css({display:"none"});
	});
	// $(function ()
	// {
	// 　　$(".car").click(function ()
	// 　　{
	// 　　　　//获取点击的元素给其添加样式，讲其兄弟元素的样式移除
	// 　　　　$(this).addClass("active").siblings().removeClass("active");
	// 　　　　//获取选中元素的下标
	// 　　　　var index = $(this).index();
	// 　　　　$(this).parent().siblings().children().eq(index).addClass("active")
	// 　　　　.siblings().removeClass("active");
	// 　　});
	// });
	