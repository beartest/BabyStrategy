/// <reference path="common.js" />
var iLayer;
//设置分页变量

var commentSys = {};
commentSys.oPage = {
	pageIndex: 1,
	pageSize: 10,
	recordCount: 0,
	pageCount: 0
};
commentSys.data;

//页面加载数据
$(function() {
	var chanelidarr = [12, 11, 13, 16, 14, 15, 17, 19, 20, 18, 21, 22, 23, 24, 25];
	$(".commenttable td a").click(function() {
		var channelid = chanelidarr[$(this).index("a")-2];
		var channelname = $(this).find("span").html();
		location.href = "comment_channel.html?channelid=" + escape(channelid) + "&channelname=" + escape(channelname);
	});

	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/GetTop10evaluationByCreatedDate?&pageIndex=' + commentSys.oPage.pageIndex + '&PageSize=' + commentSys.oPage.pageSize;
	GetDataFromJson(url, function(data) {
		commentSys.data = data;
		LoadingData();
	});
}

function LoadingData() {
	$("#commentlist").empty();
	$(commentSys.data.Data).each(function(index, item) {
		var html = "<li>" 
		    + "<span onclick='commentclick(" + item.Id + ")'>" + item.Title + "</span>"
		    + "<img onclick='commentclick(" + item.Id + ")' src='" + commonSys.ServerIp + item.Image + "' alt='推荐图片'/>"
		    + "<p onclick='commentclick(" + item.Id + ")'>" + item.Description + "</p></li>";
		$("#commentlist").append(html);
	});
}

//最新测评点击
function commentclick(id){
	location.href = "news.html?newsid="+id;
}