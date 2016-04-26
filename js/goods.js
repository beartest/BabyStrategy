/// <reference path="common.js" />
var iLayer;
//设置分页变量

var goodsSys = {};
goodsSys.oPage = {
	pageIndex: 1,
	pageSize: 3,
	recordCount: 0,
	pageCount: 0
};
goodsSys.data;
goodsSys.list;
goodsSys.goodsid;
$dragBln = false;


//页面加载数据
$(function() {
	goodsSys.goodsid = request("goodsid");

	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/GetGoodInfobyId?goodid=' + goodsSys.goodsid;
	GetDataFromJson(url, function(data) {
		goodsSys.data = data;
		LoadingData();
	});

	url = commonSys.ServerIp + 'api/P/GetGoodsCommentList?pageIndex='+goodsSys.oPage.pageIndex+'&pageSize=' +goodsSys.oPage.pageSize+'&goodsid='+ goodsSys.goodsid;
	GetDataFromJson(url, function(data) {
		goodsSys.list = data;
		LoadingData1();
	});
}

function LoadingData() {
	//图片连播
	$('#rollimg').empty();
	$('#rollbtn').empty();
	var html;
	var olhtml;
	var imgcount = 0;
	if (goodsSys.data.Image1 != "" && goodsSys.data.Image1 != null) {
		html = "<li><img src='" + commonSys.ServerIp + goodsSys.data.Image1 + "' alt='商品图片'/></li>";
		olhtml = "<a href='#'></a>";
		imgcount++;
	}
	if (goodsSys.data.Image2 != "" && goodsSys.data.Image2 != null) {
		html += "<li><img src='" + commonSys.ServerIp + goodsSys.data.Image2 + "' alt='商品图片'/></li>";
		olhtml += "<a href='#'></a>";
		imgcount++;
	}
	if (goodsSys.data.Image3 != "" && goodsSys.data.Image3 != null) {
		html += "<li><img src='" + commonSys.ServerIp + goodsSys.data.Image3 + "' alt='商品图片'/></li>";
		olhtml += "<a href='#'></a>";
		imgcount++;
	}
	$('#rollimg').append(html);
	if (imgcount > 1) {
		$('#rollbtn').append(olhtml);
		$(".main_image").touchSlider({
			flexible: true,
			speed: 200,
			btn_prev: $("#btn_prev"),
			btn_next: $("#btn_next"),
			paging: $(".flicking_con a"),
			counter: function(e) {
				$(".flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
			}
		});

		$(".main_image").bind("mousedown", function() {
			$dragBln = false;
		});

		$(".main_image").bind("dragstart", function() {
			$dragBln = true;
		});

		$(".main_image a").click(function() {
			if ($dragBln) {
				return false;
			}
		});

		timer = setInterval(function() {
			$("#btn_next").click();
		}, 5000);

		$(".main_visual").hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				$("#btn_next").click();
			}, 5000);
		});

		$(".main_image").bind("touchstart", function() {
			clearInterval(timer);
		}).bind("touchend", function() {
			timer = setInterval(function() {
				$("#btn_next").click();
			}, 5000);
		});
	}

    //商品价格及简介
	$("#g_price").html('￥'+goodsSys.data.Price);
	$("#g_discountprice").html('￥'+ goodsSys.data.DiscountPrice);
	if(parseFloat(goodsSys.data.Price)==parseFloat(goodsSys.data.DiscountPrice)){
		$("#g_discountper").css("display","none");
	}
	else{
		var per=parseFloat(goodsSys.data.DiscountPrice)/parseFloat(goodsSys.data.Price)*10;
		$("#g_discountper").html(per.toFixed(1)+'折');
	}
	$("#g_name").html(goodsSys.data.GoodsName);
	$("#g_describe").html(goodsSys.data.Description);
	
	//品牌介绍
	$("#g_BrandIdImage").html(goodsSys.data.BrandIdImage);
	$("#g_BrandIdName").html(goodsSys.data.BrandIdName);
	$("#g_BrandIdDescription").html(goodsSys.data.BrandIdDescription);
}

function LoadingData1() {
	$('#discusslist').empty();
	$(goodsSys.list.Data).each(function(index, item) {
		var html = "<li><img src='" + commonSys.ServerIp + item.Image + "'>" + "<div><span class='discussname'>" + item.UserIdName + "</span>" + "<strong>" + item.UserLevel + "</strong>" + "<p>" + item.Contents + "</p>" + "<span class='discusstime'>" + item.CreatedDate + "</span></div></li>";
		$("#discusslist").append(html);
	});
}