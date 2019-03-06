$(function(){
    var obj = location.search;
	var item = obj.slice(1);
	$.get("http://47.104.244.134:8080/goodsbyid.do", { "id": item },
		function (data) {
			var str = "";
            str = `<ul class="m-str">
                                <img src='${data.picurl}'/>
								<li>商品名：${data.name}</li>
								<li>商品价格：${data.price}</li>
								<li>保质期：${data.pubdate}</li>
								<input type='button' value='加入购物车' class="gocart" id="${data.id}"/>
							</ul>`
			$(".list").html(str);
			$(".gocart").on("click", function () {
				var Id = $(".gocart").attr("id")
				console.log(Id)
				$.get("http://47.104.244.134:8080/cartsave.do", { "gid": item, "token": $.cookie("token") },
					function (data) {
						if (data.code == 0) {
							alert("添加购物车成功");
						} else {
							alert("添加购物车失败");
						}
					}
				)
			});
		});
})
