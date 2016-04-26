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
searchSys.priceasce = true;
searchSys.condition;

//页面加载数据
$(function() {
	searchSys.condition = request("searchtext");
	$("#searchtext").val(searchSys.condition);
	//加载数据
	GetDataGoods();
	GetDataNews();
});

function GetDataGoods() {
	var url = commonSys.ServerIp + 'api/P/SelectTop3GoodsByCondition?Condition=' + searchSys.condition + '&Price=' + searchSys.priceasce;
	GetDataFromJson(url, function(data) {
		searchSys.goodslist = data;
		LoadingData();
	});
}

function GetDataNews() {
	var url = commonSys.ServerIp + 'api/P/SelectTop3NewsByCondition?Condition=' + searchSys.condition;
	GetDataFromJson(url, function(data) {
		searchSys.newslist = data;
		LoadingData1();
	});
}

function LoadingData() {
	//产品列表
	$('#goodslist').empty();
	$(searchSys.goodslist).each(function(index, item) {
		var html = "<li onclick='goodsclick(" + item.Id + ")'><img src='" + commonSys.ServerIp + item.Image1 + "' alt='商品图片' /><div>" + "<span>" + item.GoodsName + "</span>" + "<p>" + item.Description + "</p>" + "<div><strong class='nomalprice'>￥" + item.Price + "</strong>" + "<s class='discountprice'>￥" + item.DiscountPrice + "</s>" + "<a class='showdetail'>...</a></div></div></li>";
		$("#goodslist").append(html);
	});
}

function LoadingData1() {
	//文章列表
	$('#newslist').empty();
	$(searchSys.newslist).each(function(index, item) {
		var html = "<li onclick='newsclick(" + item.Id + ")'>" + "<img src='" + commonSys.ServerIp + item.Image + "' alt='文章图片'/>" + "<div><span>" + item.Title + "</span><p>" + item.Description + "</p></div></li>";
		$("#newslist").append(html);
	});
}

//价格升降序切换
function switchsort() {
	if(searchSys.priceasce){
		$("#sortimg").attr("src","img/search/price1.png");
	}
	else{
		$("#sortimg").attr("src","img/search/price2.png");
	}
	GetDataGoods();
	searchSys.priceasce=!searchSys.priceasce;
}

//更多产品
function moregoods() {
	location.href = "search_goodslist.html?searchtext=" + searchSys.condition;
}

//更多文章
function morenews() {
	location.href = "search_newslist.html?searchtext=" + searchSys.condition;
}

//产品点击
function goodsclick(id) {
	location.href = "goods.html?goodsid=" + id;
}

//文章点击
function newsclick(id) {
	location.href = "news.html?newsid=" + id;
}