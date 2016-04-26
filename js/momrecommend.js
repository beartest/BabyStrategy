/// <reference path="common.js" />
var iLayer;
//设置分页变量

var momrecSys = {};
momrecSys.oPage = {
	pageIndex: 1,
	pageSize: 10,
	recordCount: 0,
	pageCount: 0
};
momrecSys.data;
momrecSys.list;
momrecSys.recommendid;
$dragBln = false;


//页面加载数据
$(function() {
	momrecSys.recommendid = request("recommendid");

	//加载数据
	GetData();
});

function GetData() {
	var url = commonSys.ServerIp + 'api/User/GetMomRecommendById/' + momrecSys.recommendid;
	GetDataFromJson(url, function(data) {
		momrecSys.data = data;
		LoadingData();
	});

	url = commonSys.ServerIp + 'api/User/GetTop10CommentMomRecByMomRecId?MomRecId=' + momrecSys.recommendid;
	GetDataFromJson(url, function(data) {
		momrecSys.list = data;
		LoadingData1();
	});
}

function LoadingData() {
	//作者信息
	$("#authorimg").html(momrecSys.data.UserImage);
	$("#authorname").html(momrecSys.data.UserName);
	$("#authorlev").html(momrecSys.data.UserLevel);
	$("#momrectitle").html(momrecSys.data.Title);
	$("#momreccontent").html(momrecSys.data.Content);
	$("#momrecGoodsType2").html(momrecSys.data.GoodsType2);
	$("#momrecGoodsType4").html(momrecSys.data.GoodsType4);
	$("#momrecSuitForTime").html(momrecSys.data.SuitForTime);

	//图片连播
	$('#rollimg').empty();
	$('#rollbtn').empty();
	var html;
	var olhtml;
	var imgcount = 0;
	if (momrecSys.data.ImageSrc1 != "" && momrecSys.data.ImageSrc1 != null) {
		html = "<li><img src='" + commonSys.ServerIp + momrecSys.data.ImageSrc1 + "' alt='推荐图片'/></li>";
		olhtml = "<a href='#'></a>";
		imgcount++;
	}
	if (momrecSys.data.ImageSrc2 != "" && momrecSys.data.ImageSrc2 != null) {
		html += "<li><img src='" + commonSys.ServerIp + momrecSys.data.ImageSrc2 + "' alt='推荐图片'/></li>";
		olhtml += "<a href='#'></a>";
		imgcount++;
	}
	if (momrecSys.data.ImageSrc3 != "" && momrecSys.data.ImageSrc3 != null) {
		html += "<li><img src='" + commonSys.ServerIp + momrecSys.data.ImageSrc3 + "' alt='推荐图片'/></li>";
		olhtml += "<a href='#'></a>";
		imgcount++;
	}
	$('#rollimg').append(html);
	if (imgcount > 1) {
		$('#rollbtn').append(olhtml);
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
	}
}

function LoadingData1() {
	$('#discusslist').empty();
	$(momrecSys.list).each(function(index, item) {
		var html = "<li><img src='" + commonSys.ServerIp + item.UserImage + "'>" + "<div><span class='discussname'>" + item.UserNickName + "</span>" + "<strong>" + item.UserLevel + "</strong>" + "<p>" + item.ContentInfo + "</p>" + "<span class='discusstime'>" + item.CreatedDate + "</span></div></li>";
		$("#discusslist").append(html);
	});
}