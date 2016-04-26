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
goodsSys.goodsid;
$dragBln = false;


//页面加载数据
$(function() {
	goodsSys.goodsid = request("goodsid");

	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/P/SelectGoodInfoByID/' + goodsSys.goodsid;
	GetDataFromJson(url, function(data) {
		goodsSys.data = data;
		LoadingData();
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

	$("#goodsname").html(goodsSys.data.GoodsName);
	$("#goodsprice").html('¥' + goodsSys.data.Price);
	$("#goodsdescribe").html(goodsSys.data.Description);
}