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
searchSys.data;
searchSys.searchtype;

//页面加载数据
$(function() {	
	searchSys.searchtype=request("searchtype");
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/SelectHotSearch?Type='+searchSys.searchtype;
    GetDataFromJson(url, function (data) {
        searchSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
	$('#searchwords').empty();
	$(searchSys.data).each(function (index, item) {
		var html ="<span onclick='selectword.call(this)' class='whitebgraduis'>"+item.Name+"</span>";
	    $("#searchwords").append(html);
    }); 
}

//点击热词
function selectword(){
	$("#searchtext").val($(this).html());
}
