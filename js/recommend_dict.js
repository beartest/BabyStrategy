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
dictSys.dictid;


//页面加载数据
$(function() {
	dictSys.dictid = request("dictid");
	$(".selected").removeClass("selected");
	var index = parseInt(dictSys.dictid) + 1;
	$(".recommendheaderul a").eq(index).addClass("selected");

	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/FifteenKindMomRec?pageIndex=' + dictSys.oPage.pageIndex + '&pageSize=' + dictSys.oPage.pageSize + '&userid=-1&dictId=' + dictSys.dictid;
	GetDataFromJson(url, function(data) {
		dictSys.data = data;
		LoadingData();
	});
}

function LoadingData() {
	$('#recommendlist').empty();
	$(dictSys.data.Data).each(function(index, item) {
		var html = "<li onclick='showMomrecommend(" + item.Id + ")'>" 
		+ "<span>" + item.Title + "</span>" 
		+ "<img src='" + commonSys.ServerIp + item.ImageSrc1 + "' alt='推荐图片' />" 
		+ "<p>" + item.shortdescription + "</p></li>";
		$("#recommendlist").append(html);
	});
}

//点击妈妈推荐
function showMomrecommend(id) {
	location.href = "momrecommend.html?recommendid=" + id;
}