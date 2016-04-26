/// <reference path="common.js" />
var iLayer;
//设置分页变量
var recommendSys = {};
recommendSys.oPage = {
    pageIndex: 1,
    pageSize: 5,
    recordCount: 0,
    pageCount: 0
};
recommendSys.todaytop;
recommendSys.brands;
recommendSys.data;

//页面加载数据
$(function() {
    //加载数据
    GetData();
});

function GetData() {    
    //今日头条四图
    var url = commonSys.ServerIp + 'api/User/SelectTDTopNews?type=2';
    GetDataFromJson(url, function (data) {
        recommendSys.todaytop = data;  
        LoadingData();
    });
   
    //今日头条大图
    url = commonSys.ServerIp + 'api/User/SelectTDTopNews?type=1';
    GetDataFromJson(url, function (data) {
    	var item=data[0];
        $("#todaytopimg4").attr("src",commonSys.ServerIp+item.Image);
        $('#todaytop').attr("onclick","topnewsclick("+item.NewsId+")");
        $("#todaytoptitle").html(item.Title);
        $("#todaytopcontent").html(item.Description);
    });
    
    //热门品牌
    url = commonSys.ServerIp + 'api/P/GetMainPageHotBrand';
    GetDataFromJson(url, function (data) {
    	recommendSys.brands = data;  
        LoadingData1();
    });
    
    //妈妈推荐
    url = commonSys.ServerIp + 'api/User/SelectTopMomRecommend?pageIndex=' + recommendSys.oPage.pageIndex + '&pageSize='+recommendSys.oPage.pageSize;
    GetDataFromJson(url, function (data) {
    	recommendSys.data = data;  
        LoadingData2();
    });
}

function LoadingData() {
	//今日头条四图
	$(recommendSys.todaytop).each(function(index, item) {
		$('#todaytopimg'+index).attr("src",commonSys.ServerIp + item.Image);
		$('#todaytopimg'+index).attr("onclick","topnewsclick("+item.NewsId+")");
	});
}

function LoadingData1() {
	//热门品牌
	$(".brandlist").empty();
	$(recommendSys.brands).each(function (index, item) {
	 	var html = "<li><img onclick='hotbrandclick("+ item.ID +")' src='" +commonSys.ServerIp + item.Image + "' alt='品牌图片'/></li>";
        $(".brandlist").append(html);
    }); 
}

function LoadingData2() {
	//妈妈推荐
	$("#recommendlist").empty();
	$(recommendSys.data.Data).each(function (index, item) {
		var html ="<li>"
		            +"<span onclick='momrecommendclick("+item.Id+")'>"+item.Title+"</span>"
				    +"<img onclick='momrecommendclick("+item.Id+")' src='" +commonSys.ServerIp + item.ImageSrc1 + "' alt='推荐图片'/>"
				    +"<p onclick='momrecommendclick("+item.Id+")'>"+item.shortdescription+"</p></li>";
	    $("#recommendlist").append(html);
    }); 
}

//头条信息点击
function topnewsclick(newsid){
	location.href = "news.html?newsid="+newsid;
}

//热门品牌点击
function hotbrandclick(id){
	location.href = "brand.html?brandid="+id;
}

//妈妈推荐点击
function momrecommendclick(id){
	location.href = "momrecommend.html?recommendid=" + id;
}
