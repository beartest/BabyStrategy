/// <reference path="common.js" />
var iLayer;
//设置分页变量

var classSys = {};
classSys.oPage = {
    pageIndex: 1,
    pageSize: 10,
    recordCount: 0,
    pageCount: 0
};
classSys.order='CreatedDate';
classSys.data;
classSys.channelid;
classSys.channelname;


//页面加载数据
$(function() {	
	classSys.channelid=request("channelid");
	classSys.channelname=request("channelname");
	$('#channelname').html(classSys.channelname);
	
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/GetList?&pageIndex=' + classSys.oPage.pageIndex + '&PageSize='+classSys.oPage.pageSize + '&ChannelId='+classSys.channelid + '&order='+classSys.order;
    GetDataFromJson(url, function (data) {
        classSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
	$('#classlist').empty();
	$(classSys.data.Data).each(function (index, item) {
      var html = "<li onclick='clickclass("+item.Id+")'>"
                     +"<img src='"+commonSys.ServerIp + item.Image + "' alt='课堂图片'/>"
                     +"<div><span>"+item.Title+"</span><p>"+item.Description+"</p></div></li>";
      $("#classlist").append(html);
    }); 
}

//点击查看课堂
function clickclass(id){
	location.href = "news.html?newsid="+id;
}


