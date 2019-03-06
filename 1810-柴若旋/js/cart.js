$(function(){
    $.get("http://47.104.244.134:8080/cartlist.do", { "token": $.cookie("token") },
		function (data) {
			console.log(data)
			var str = "";
			var add = 0;
			for (var i = 0; i < data.length; i++) {
				var olprice = data[i].count * data[i].goods.price;
				add += olprice;
				str += `<ul>
				<img src='${data[i].goods.picurl}'/>
				<li class='gid' id='${data[i].gid}'>商品编号：<span class="strid">${data[i].id}</span></li>
				<li>商品名：${data[i].goods.name}</li>
				<li>单价： <span class='onprice'>${data[i].goods.price}</span></li>
				<li>数量：<input type="button" value="-" class="min"/>
				<span class="num">${data[i].count}</span>
				<input type="button" value="+" class="add"/>
				<input type="button" value="删除该商品" class="clert"/>
				</li>
				<li>总价：<span class="addprice">${olprice}</span></li>
				</ul>`
			}
			$(".Main").html(str);
			$(".totolprice").html(add)
			$(".clert").click(function () {
				var gid = $(this).parent().parent().find(".strid").html()
				var ID = $(this).parent().parent().find(".gid").attr("id")
				var tolprice = $(".totolprice").html();
				var onrprice = $(this).parent().parent().find(".addprice").html();
				tolprice = tolprice - onrprice;
				$(".totolprice").html(tolprice);
				$(this).parent().parent().remove();
				$.get("http://47.104.244.134:8080/cartupdate.do",
					{
						"id": gid,
						"gid": ID,
						"num": 0,
						"token": $.cookie("token")
					},
					function (data) {
					});
			});
			$(".min").click(function () {
				var odd = $(this).parent().find(".num").html()
				odd--
				var gid = $(this).parent().parent().find(".strid").html()
				var ID = $(this).parent().parent().find(".gid").attr("id")
				if (odd < 1) {
					$(this).parent().parent().remove();
					var tolprice = $(".totolprice").html();
					var onrprice = $(this).parent().parent().find(".addprice").html();
					tolprice = tolprice - onrprice;
					$(".totolprice").html(tolprice);
					$.get("http://47.104.244.134:8080/cartupdate.do",
						{
							"id": gid,
							"gid": ID,
							"num": 0,
							"token": $.cookie("token")
						},
						function (data) {
							if (data.code == 0) {
							} else {
								alert("抱歉，无法删除该商品")
							}
						});
				} else {
					$(this).parent().find(".num").html(odd);
					var tolprice = $(".totolprice").html();
					var onrprice = $(this).parent().parent().find(".onprice").html();
					tolprice = tolprice - onrprice;
					var alprice = $(this).parent().parent().find(".addprice").html();
					alprice = alprice - onrprice;
					$(".totolprice").html(tolprice);
					$(this).parent().parent().find(".addprice").html(alprice)
					$.get("http://47.104.244.134:8080/cartupdate.do",
						{
							"id": gid,
							"gid": ID,
							"num": -1,
							"token": $.cookie("token")
						}, function (data) {

						}
					);
				}
			});
			$(".add").click(function () {
				var odd = $(this).parent().find(".num").html()
				odd++
				$(this).parent().find(".num").html(odd)
				var gid = $(this).parent().parent().find(".strid").html()
				var ID = $(this).parent().parent().find(".gid").attr("id")
				var tolprice = Number($(".totolprice").html());
				var onrprice = Number($(this).parent().parent().find(".onprice").html());
				tolprice = tolprice + onrprice;
				var alprice = Number($(this).parent().parent().find(".addprice").html());
				alprice = alprice + onrprice;
				$(".totolprice").html(tolprice);
				$(this).parent().parent().find(".addprice").html(alprice)
				$.get("http://47.104.244.134:8080/cartupdate.do",
					{
						"id": gid,
						"gid": ID,
						"num": 1,
						"token": $.cookie("token")
					},
					function (data) {
					});
			});
		});
	window.onload = function () {
		var token = $.cookie("token");
		if (token == null) {
			alert("抱歉，请先登录！");
			location.href = "zhuce.html";
		}
	};
});