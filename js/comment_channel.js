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
commentSys.order='CreatedDate';
commentSys.data;
commentSys.channelid;
commentSys.channelname;

//页面加载数据
$(function() {	
	commentSys.channelid=request("channelid");	
	commentSys.channelname=request("channelname");
	$('#channelname').html(commentSys.channelname);
	
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/GetevaluationList?&pageIndex=' + commentSys.oPage.pageIndex + '&PageSize='+commentSys.oPage.pageSize + '&ChannelId='+commentSys.channelid + '&order='+commentSys.order;
    GetDataFromJson(url, function (data) {
        commentSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
	$('#commentlist').empty();
	$(commentSys.data.Data).each(function (index, item) {
	var html = "<li onclick='showcomment("+item.Id+")'>"
                     +"<img src='"+commonSys.ServerIp + item.Image + "' alt='测评图片'/>"
                     +"<div><span>"+item.Title+"</span><p>"+item.Description+"</p></div></li>";
    $("#commentlist").append(html);
  }); 
}

//点击查看新闻
function showcomment(id){
	location.href = "news.html?newsid="+id;
}


