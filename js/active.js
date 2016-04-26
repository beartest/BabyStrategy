/// <reference path="common.js" />
var iLayer;
//设置分页变量

var activeSys = {};
activeSys.oPage = {
    pageIndex: 1,
    pageSize: 10,
    recordCount: 0,
    pageCount: 0
};
activeSys.data;

//页面加载数据
$(function() {
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/GetActiveList?&pageIndex=' + activeSys.oPage.pageIndex + '&PageSize='+activeSys.oPage.pageSize;
    GetDataFromJson(url, function (data) {
        activeSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
	$("#activelist").empty();
    $(activeSys.data.Data).each(function (index, item) {
    	//Type:1商品  2新闻类 3妈妈推荐 4HTML
    	var html;
    	if(item.Type==1){
    		html = "<li><a onclick=showgoods("+item.ThingsId +")><img src='" +commonSys.ServerIp + item.Image + "' alt='活动图片'></a></li>";
        }
    	else if(item.Type==2){
    		html = "<li><a onclick=shownews("+item.ThingsId +")><img src='" +commonSys.ServerIp + item.Image + "' alt='活动图片'></a></li>";    		
    	}
    	else if(item.Type==3){
    		html = "<li><a onclick=showrecommend("+item.ThingsId +")><img src='" +commonSys.ServerIp + item.Image + "' alt='活动图片'></a></li>";    		
    	}
    	else if(item.Type==4){
    		html = "<li><a onclick=showhtml("+item.ThingsId +")><img src='" +commonSys.ServerIp + item.Image + "' alt='活动图片'></a></li>";    		
    	}
    	$("#activelist").append(html);
    });
}

//商品
function showgoods(id){
	location.href = "goods.html?goodsid="+id;
}
//新闻(测评、课堂)
function shownews(id){
	location.href = "news.html?newsid="+id;
}
//推荐
function showrecommend(id){
	location.href = "momrecommend.html?recommendid=" + id;
}
//HTML
function showhtml(id){
	alert("HTML_ID："+id);
}





