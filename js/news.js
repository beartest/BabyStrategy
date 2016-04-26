/// <reference path="common.js" />
var iLayer;
//设置分页变量

var newsSys = {};
newsSys.oPage = {
    pageIndex: 1,
    pageSize: 10,
    recordCount: 0,
    pageCount: 0
};
newsSys.data;
newsSys.newsid;

//页面加载数据
$(function() {	
	newsSys.newsid=request("newsid");
	
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/SelectNewsInfoByID/'+newsSys.newsid;
    GetDataFromJson(url, function (data) {
        newsSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
    $('#newstype').html(newsSys.data.Title)
	$('.main').empty();
    var html = "<h3 class='newstitle'>"+newsSys.data.Title+"</h3>"+newsSys.data.InfoContent;
    $(".main").append(html);
}


