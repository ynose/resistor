$(document).ready(function(){

    // 帯の色を選択
    $(".ohn-nums").on("click", "div", function() {
        var ohmTop = $(this).position().top;
        var selectorTop = $(this).parent().siblings(".selector").position().top;

        // 帯をスクロール
        $(this).parent().animate({
            top: selectorTop - ohmTop
        }, "normal", "swing");

        // 帯の値を表示
        var ohmNo = $(this).data("ohm-no");
        $(this).closest(".js-ohm-group").find(".js-ohm-value").text((ohmNo == undefined ? "" : ohmNo));
    });

});
