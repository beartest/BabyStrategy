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
searchSys.priceasce = true;
searchSys.condition;

//页面加载数据
$(function() {
	searchSys.condition = request("searchtext");
	$("#searchtext").val(searchSys.condition);
	
	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/SeniorAdmin/SelectGoodsByCondition?PageIndex='+searchSys.oPage.pageIndex+'&PageSize=' +searchSys.oPage.pageSize+'&Condition='+ searchSys.condition + '&Bit=' + searchSys.priceasce;
	GetDataFromJson(url, function(data) {
		searchSys.goodslist = data;
		LoadingData();
	});
}

function LoadingData() {
	//产品列表
	$('#goodslist').empty();
	$(searchSys.goodslist.Data).each(function(index, item) {
		var html = "<li onclick='goodsclick(" + item.Id + ")'><img src='" + commonSys.ServerIp + item.Image1 + "' alt='商品图片' /><div>" + "<span>" + item.GoodsName + "</span>" + "<p>" + item.Description + "</p>" + "<div><strong class='nomalprice'>￥" + item.Price + "</strong>" + "<s class='discountprice'>￥" + item.DiscountPrice + "</s>" + "<a class='showdetail'>...</a></div></div></li>";
		$("#goodslist").append(html);
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
	GetData();
	searchSys.priceasce=!searchSys.priceasce;
}

//产品点击
function goodsclick(id) {
	location.href = "goods.html?goodsid=" + id;
}