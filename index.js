$(document).ready(function(){

    // 色帯の色のクリックイベント（１～４のすべての帯に対応）
    $(".colors").on("click", "div", function() {

        var resiColorTop = $(this).position().top;
        var selectorTop = $(this).parent().siblings(".selector").position().top;

        // 選択した色帯の色をセレクタ位置にスクロール
        $(this).parent().animate({
            top: selectorTop - resiColorTop
        }, "normal", "swing");


        // 色帯の値を表示
        var colorNo = $(this).data("color-no");
        $(this).closest(".js-color-group").find(".js-color-no").text((colorNo == undefined ? "" : colorNo));

        
        // 抵抗値を表示
        var colorNo_1 = $("#js-color-no-1").text(); // １帯目（１桁目の値）
        var colorNo_2 = $("#js-color-no-2").text(); // ２帯目（２桁目の値）
        var colorNo_3 = $("#js-color-no-3").text(); // ３帯目（乗数）
        var colorNo_4 = $("#js-color-no-4").text(); // ４帯目（誤差）
        var ohmStr = ohmString(convOhm(colorNo_1, colorNo_2, colorNo_3));
        var errStr = "±" + $(".colors:eq(3) > .color-" + colorNo_4).data("error-pct") + "%";

        $("#ohm").text(ohmStr + " Ω" + " " + errStr);
    });


    // 抵抗値の入力イベント（対応する色帯を表示する）
    $("#js-ohm-input, #js-unit-select, #js-error-select").on("change", function () {
        convert();
    });
    $("#convert").on("click", function () {
        convert();
    });


    // 抵抗の初期表示  330Ω±5%(橙橙茶金)
    $("#js-ohm-input").val("330");
    $("#js-unit-select").val("0");
    $("#js-error-select").val("G");
    convert();
});


// 入力値から色帯を表示
var convert = function () {

    var ohmInput = $("#js-ohm-input").val();
    var unitInput = $("#js-unit-select > option[value='" + $("#js-unit-select").val() + "'").text();
    var errorInput = $("#js-error-select").val();

    var colorNo_1 = convColorNo_1(ohmInput, unitInput);
    var colorNo_2 = convColorNo_2(ohmInput, unitInput);
    var colorNo_3 = convColorNo_3(ohmInput, unitInput, colorNo_1, colorNo_2);
    var colorNo_4 = errorInput;

    console.log(colorNo_1 + ":" + colorNo_2 + ":" + colorNo_3 + ":" + colorNo_4);

    // 抵抗の色帯を表示
    $(".colors:eq(0) > .color-" + colorNo_1).click();
    $(".colors:eq(1) > .color-" + colorNo_2).click();
    $(".colors:eq(2) > .color-" + colorNo_3).click();
    $(".colors:eq(3) > .color-" + colorNo_4).click();
};

// 抵抗値を算出
var convOhm = function (colorNo_1, colorNo_2, colorNo_3) {

    // ３帯目を乗数に変換
    var multiplier;
    switch (colorNo_3) {
        case "0":
          multiplier = 1;
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          multiplier = Math.pow(10, colorNo_3);
          break;
        case "G":
          multiplier = Math.pow(10, -1);
          break;
        case "S":
          multiplier = Math.pow(10, -2);
          break;
        default:
          multiplier = 0;
          break;
    }

    // 抵抗値(Ω) = (１帯目 2帯目) * ３帯目
    return Number(colorNo_1 + colorNo_2) * multiplier;
};


// 抵抗値を表示用単位に変換
var ohmString = function (ohm) {

    var ohmString = ohm;
    if (ohm >= 1000000) {
        ohmString = (ohm / 1000000) + "M";
    }　else if (ohm >= 1000) {
        ohmString = (ohm / 1000) + "K";
    }

    return String(ohmString);
};


var unitValue = function (unit) {

    var value;
    switch (unit.replace("Ω", "")) {
        case "K":
            value = 1000;
            break;
        case "M":
            value = 1000000;
            break;
        default:
            value = 1;
            break;
    }

    return value;
}

var convColorNo_1 = function (ohm, unit) {

    var ohmString = String(ohm + (ohm.indexOf(".") == -1 && (ohm * unitValue(unit)) >= 1000 ? ".0" : "")).replace(".", "");
    ohmString = (ohmString.length == 1 ? "0" : "") + ohmString;

    return ohmString.substr(0, 1);
}

var convColorNo_2 = function (ohm, unit) {

    var ohmString = String(ohm + (ohm.indexOf(".") == -1 && (ohm * unitValue(unit)) >= 1000 ? ".0" : "")).replace(".", "");
    ohmString = (ohmString.length == 1 ? "0" : "") + ohmString;

    return ohmString.substr(1, 1);
}

var convColorNo_3 = function (ohm, unit, color1, color2) {

    var ohmValue = ohm * unitValue(unit);

    var pow;
    for (var i = 9; i >= -2; i--) {
        var color3;
        switch (i) {
            case -1:
                color3 = "G";
                break;
            case -2:
                color3 = "S";
                break;
            default:
                color3 = String(i);
                break;
        }
        //console.log("convColorNo_3A:" + convOhm(color1, color2, color3));
        if (ohmValue == convOhm(color1, color2, color3)) {
            pow = color3;
            //console.log("convColorNo_3A:pow=" + pow);
            break;
        }
    }

    return pow;
}
