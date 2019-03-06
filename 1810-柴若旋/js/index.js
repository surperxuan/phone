$(function () {
    $.get("http://47.104.244.134:8080/goodsbytid.do",
        {
            "tid": "13",
            "page": "9",
            "limit": "15"
        },
        function (data) {
            var data = data.data;
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += `<ul class="m-str col-xs-6" id="${data[i].id}">
                    <a href="inline.html?${data[i].id}">
                    <img src='${data[i].picurl}'/>
                    <li>商品名：${data[i].name}</li>
                    <li>商品价格：${data[i].price}</li>
                    <li>保质期：${data[i].pubdate}</li>
					<input type='button' value='查看详情' class="mi-dis" id="${data[i].id}"/></a>
                  </ul>`;
                $(".list").html(str);
            };
        });
    var i = 0;
    var timer = setInterval(function () {
        ++i
        var oLeft = i * 380
        if (i >= 3) {
            i = -1;
        }
        $(".banner").animate({ left: -oLeft + 'px' }, 'slow');
    }, 2000)
    $(".clear").click(function(){
        $("aside").fadeToggle("slow","linear");
    })
});

