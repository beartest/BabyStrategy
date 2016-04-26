/// <reference path="common.js" />
var iLayer;
//设置分页变量

var searchSys = {};
searchSys.oPage = {
	pageIndex: 1,
	pageSize: 10,
	recordCount: 0,
	pageCount: 0
};
searchSys.goodslist;
searchSys.newslist;
searchSys.condition;

//页面加载数据
$(function() {
	searchSys.condition = request("searchtext");
	$("#searchtext").val(searchSys.condition);
	
	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/SelectNewsByCondition?Condition=' + searchSys.condition+'&PageIndex='+searchSys.oPage.pageIndex+'&PageSize='+searchSys.oPage.pageSize;
	GetDataFromJson(url, function(data) {
		searchSys.newslist = data;
		LoadingData();
	});
}

function LoadingData() {
	//文章列表
	$('#newslist').empty();
	$(searchSys.newslist.Data).each(function(index, item) {
		var html = "<li onclick='newsclick(" + item.Id + ")'>" + "<img src='" + commonSys.ServerIp + item.Image + "' alt='文章图片'/>" + "<div><span>" + item.Title + "</span><p>" + item.Description + "</p></div></li>";
		$("#newslist").append(html);
	});
}

//文章点击
function newsclick(id) {
	location.href = "news.html?newsid=" + id;
}