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
        
        // 抵抗値を表示
        var value_1 = $("#ohm-value-1").text();
        var value_2 = $("#ohm-value-2").text();
        var value_3 = $("#ohm-value-3").text();
        var magnification;
        var ohm;
        switch (value_3) {
            case "0":
              magnification = 1;
              break;
            case "1":
              magnification = 10;
              break;
            case "2":
              magnification = 100;
              break;
            case "3":
              magnification = 1000;
              break;
            case "4":
              magnification = 10000;
              break;
            case "5":
              magnification = 100000;
              break;
            case "6":
              magnification = 1000000;
              break;
            case "G":
              magnification = 0.1;
              break;
            case "S":
              magnification = 0.01;
              break;
            default:
              magnification = 0;
              break;
        }
        ohm = Number(value_1 + value_2) * magnification;
        
        switch (magnification) {
            case 0.1:
            case 0.01:
                $(".caption").text(ohm + " Ω");
                break;
            case 100:
            case 1000:
            case 10000:
                $(".caption").text((ohm / 1000) + "K Ω");
                break;
            case 100000:
            case 1000000:
                $(".caption").text((ohm / 1000000) + "M Ω");
                break;
            default:
                $(".caption").text(ohm + " Ω");
                break;
        }
        
    });

});
