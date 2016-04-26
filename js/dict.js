/// <reference path="common.js" />
var iLayer;
//设置分页变量

var dictSys = {};
dictSys.oPage = {
	pageIndex: 1,
	pageSize: 10,
	recordCount: 0,
	pageCount: 0
};
dictSys.data;
dictSys.list;
dictSys.dictid;

//页面加载数据
$(function() {
	dictSys.dictid = request("dictid");
	
	//加载数据
	GetData();
});

function GetData() {
//	var url = commonSys.ServerIp + 'api/P/GetBrandInfo?BrandId=' + brandSys.brandid;
//	GetDataFromJson(url, function(data) {
//		brandSys.data = data;
//		LoadingData();
//	});
	
	var url="api/P/GetGoodsByDict?PageIndex="+dictSys.oPage.pageIndex+"&PageSize="+dictSys.oPage.pageSize+"&DictId="+dictSys.dictid;
	GetDataFromJson(url, function(data) {
		dictSys.list = data;
		LoadingData1();
	});
}

function LoadingData() {
	//品牌介绍
	$("#dictimg").html(dictSys.data.Image);
	$("#dictname").html(dictSys.data.BrandName);
	$("#dictcontent").html(dictSys.data.Description);
}

function LoadingData1() {
	$('#goodslist').empty();
	$(dictSys.list.Data).each(function(index, item) {
		var html = "<li><img src='" + commonSys.ServerIp + item.Image1 + "'>" + "<div><span>" + item.GoodsName + "</span>" + "<strong>￥" + item.DiscountPrice.toFixed(2) + "</strong>";
		if (parseFloat(item.Price) != parseFloat(item.DiscountPrice)) {
			var per = parseFloat(item.DiscountPrice) / parseFloat(item.Price) * 10;
			html += "<s>￥" + item.Price + "</s><p>" + per.toFixed(1) + "折</p>";
		}
		html += "</div></li>";
		$("#goodslist").append(html);
	});
}
