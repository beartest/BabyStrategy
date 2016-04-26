var commonSys = {};
commonSys.ServerIp = "http://localhost:9003/";

//jQuery中的Ajax方法
function GetDataFromJson(url, callbackFunction) {
	$.ajax({
		type:"GET",
		url:url,
		dataType:'json',
		success:callbackFunction,
	});
}

//获取URL参数
function request(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//搜索
function showsearchlist(){
	if($("#searchtext").val()==""){
		alert("搜索内容不能为空");
	}
	else{
		location.href = "search_resultlist.html?searchtext="+escape($("#searchtext").val());
	}
}
