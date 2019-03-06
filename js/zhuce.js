$(function () {
    $(".type-right").click(function () {
        $(".h-right").css("display", "block");
        $(".h-left").css("display", "none");
    });
    $(".type-left").click(function () {
        $(".h-left").css("display", "block");
        $(".h-right").css("display", "none");
    });
    $("#h-btn").on("click", function () {
        var userreg = /^\w{3,20}$/;
        var user = $("#username").val();
        var emailreg = /^\w{3,20}$/;
        var email = $("#email").val();
        if (userreg.test(user) && emailreg.test(email)) {
            $(".btn-error").css("display", "none");
            $.post(
                "http://47.104.244.134:8080/usersave.do",
                {
                    "username": user,
                    "password": email,
                    "email": email,
                    "sex": "男"
                },
                function (data) {
                    console.log(data)
                    if (data.code == 0) {
                        alert("注册成功");
                        $(".h-right").css("display", "block");
                        $(".h-left").css("display", "none");
                        $("#userphone").val(user);
                        $("#putintor").val(email)
                    } else {
                        alert("注册失败")
                    }
                }
            )
        }});
    $("#p-btn").on("click", function () {
        var user = $("#userphone").val();
        var email = $("#putintor").val();
        $.post(
            "http://47.104.244.134:8080/userlogin.do",
            {
                "name": user,
                "password": email
            },
            function (data) {
                console.log(data.data.token)
                var tokon = data.data.token
                $.cookie("token", tokon)
                if (data.code == 0) {
                    location.href = "index.html"
                }
            }
        )
    });
})