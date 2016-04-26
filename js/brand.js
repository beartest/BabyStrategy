/// <reference path="common.js" />
var iLayer;
//设置分页变量

var brandSys = {};
brandSys.oPage = {
	pageIndex: 1,
	pageSize: 10,
	recordCount: 0,
	pageCount: 0
};
brandSys.data;
brandSys.list;
brandSys.brandid;

//页面加载数据
$(function() {
	brandSys.brandid = request("brandid");
	
	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/GetBrandInfo?BrandId=' + brandSys.brandid;
	GetDataFromJson(url, function(data) {
		brandSys.data = data;
		LoadingData();
	});
	
	url = commonSys.ServerIp + 'api/P/GetGoodsByBrand?BrandId=' + brandSys.brandid + '&PageIndex=' + brandSys.oPage.pageIndex + '&PageSize=' + brandSys.oPage.pageSize;
	GetDataFromJson(url, function(data) {
		brandSys.list = data;
		LoadingData1();
	});
}

function LoadingData() {
	//品牌介绍
	$("#brandimg").html(brandSys.data.Image);
	$("#brandname").html(brandSys.data.BrandName);
	$("#brandcontent").html(brandSys.data.Description);
}

function LoadingData1() {
	$('#goodslist').empty();
	$(brandSys.list.Data).each(function(index, item) {
		var html = "<li><img src='" + commonSys.ServerIp + item.Image1 + "'>" + "<div><span>" + item.GoodsName + "</span>" + "<strong>￥" + item.DiscountPrice.toFixed(2) + "</strong>";
		if (parseFloat(item.Price) != parseFloat(item.DiscountPrice)) {
			var per = parseFloat(item.DiscountPrice) / parseFloat(item.Price) * 10;
			html += "<s>￥" + item.Price + "</s><p>" + per.toFixed(1) + "折</p>";
		}
		html += "</div></li>";
		$("#goodslist").append(html);
	});
}
