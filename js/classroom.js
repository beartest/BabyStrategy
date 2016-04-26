/// <reference path="common.js" />
var classSys = {};
classSys.oPage = {
    pageIndex: 1,
    pageSize: 10,
    recordCount: 0,
    pageCount: 0
};
classSys.list;
classSys.data;
$dragBln = false;

//页面加载数据
$(function() {
	$(".classroomtable td a").click(function(){
		var channelid = $(this).index("a")-1;
		var channelname=$(this).find("span").html();
		location.href = "classroom_channel.html?channelid="+escape(channelid)+"&channelname="+escape(channelname);
	});
	
	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/GetModelImageNewsByType?type=0';
	GetDataFromJson(url, function(data) {
		classSys.list = data;
		LoadingData1();
	});
	url=commonSys.ServerIp+'api/P/GetTop10NewsByCreatedDate?PageIndex=' + classSys.oPage.pageIndex + '&PageSize='+classSys.oPage.pageSize;
	GetDataFromJson(url, function (data) {
        classSys.data = data;
        LoadingData2();
    });
}

function LoadingData1() {
	//图片连播
	$('#rollimg').empty();
	$.each(classSys.list, function(index, item) {
		var html = "<li><img onclick='clickclass("+item.NewId+")' src='" + commonSys.ServerIp + item.Image + "' alt='课堂图片'/></li>";
		$('#rollimg').append(html);
	});
	
	$(".main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flicking_con a"),
		counter : function (e){
			$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 5000);
	
	$(".main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},5000);
	});
	
	$(".main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 5000);
	});
}

function LoadingData2() {
	//最新课堂
	$('#classlist').empty();
	$(classSys.data.Data).each(function (index, item) {
      var html = "<li onclick='clickclass("+item.Id+")'>"
                     +"<img src='"+commonSys.ServerIp + item.Image + "' alt='课堂图片'/>"
                     +"<div><span>"+item.Title+"</span><p>"+item.Description+"</p></div></li>";
      $("#classlist").append(html);
    }); 
}

//最新课堂点击
function clickclass(id){
	location.href = "news.html?newsid="+id;
}
