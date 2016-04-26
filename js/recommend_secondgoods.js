/// <reference path="common.js" />
var iLayer;
//设置分页变量

var goodsSys = {};
goodsSys.oPage = {
    pageIndex: 1,
    pageSize: 10,
    recordCount: 0,
    pageCount: 0
};
goodsSys.data;

//页面加载数据
$(function() {	
    //加载数据
    GetData();
});

function GetData() {
    var url = commonSys.ServerIp + 'api/P/SelectSecondGoods?PageIndex=' + goodsSys.oPage.pageIndex + '&pageSize='+goodsSys.oPage.pageSize ;
    GetDataFromJson(url, function (data) {
        goodsSys.data = data;
        LoadingData();
    });
}

function LoadingData() {
	$('#goodslist').empty();
	$(goodsSys.data.Data).each(function (index, item) {
    var html = "<li onclick='showgoods("+item.Id+")'><span>"+item.GoodsName+"</span><div>";
    if(item.Image1!=null){
    	html+="<img src='"+commonSys.ServerIp + item.Image1+"' alt='推荐图片' />";
    }
	if(item.Image2!=null){
		html+="<img src='"+commonSys.ServerIp + item.Image2+"' alt='推荐图片' />";
	}
	if(item.Image3!=null){
		html+="<img src='"+commonSys.ServerIp + item.Image3+"' alt='推荐图片' />";
	}
	html+="</div><strong class='darkfont'>二手价：</strong><strong class='pinkfont'>¥"+item.Price+"</strong>"
		    +"<p>"+item.Description+"</p></li>";
    $("#goodslist").append(html);
  }); 
}

//点击查看商品
function showgoods(id){
	location.href = "secondgoods.html?goodsid="+id;
}
