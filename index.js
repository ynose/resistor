$(document).ready(function(){

    // 初期表示
    $('.colors').each(function(e) {
        // 色帯の値を表示
        showColorValue($(this).children(".color-5"));

        // 抵抗値を表示
        var value_1 = $("#color-value-1").text(); // １帯目（１桁目の値）
        var value_2 = $("#color-value-2").text(); // ２帯目（２桁目の値）
        var value_3 = $("#color-value-3").text(); // ３帯目（乗数）
        var value_4 = $("#color-value-4").text(); // ４帯目（誤差）
        $("#ohm").html(ohmString(ohm(value_1, value_2, value_3)) + " Ω" + "<br>" + 
                       ohmErrorString(ohmError(value_4)));
    });


    // 色帯の色のクリックイベント（１～４のすべての帯に対応）
    $(".colors").on("click", "div", function() {
        var resiColorTop = $(this).position().top;
        var selectorTop = $(this).parent().siblings(".selector").position().top;

        // 選択した色帯の色をセレクタ位置にスクロール
        $(this).parent().animate({
            top: selectorTop - resiColorTop
        }, "normal", "swing");


        // 色帯の値を表示
        showColorValue($(this));

        
        // 抵抗値を表示
        var value_1 = $("#color-value-1").text(); // １帯目（１桁目の値）
        var value_2 = $("#color-value-2").text(); // ２帯目（２桁目の値）
        var value_3 = $("#color-value-3").text(); // ３帯目（乗数）
        var value_4 = $("#color-value-4").text(); // ４帯目（誤差）
        $("#ohm").html(ohmString(ohm(value_1, value_2, value_3)) + " Ω" + "<br>" + 
                       ohmErrorString(ohmError(value_4)));
    });

});


// 色帯の値を表示
var showColorValue = function ($color) {
    var colorNo = $color.data("color-no");
    $color.closest(".js-color-group").find(".js-color-value").text((colorNo == undefined ? "" : colorNo));
};


// 抵抗値を算出
var ohm = function (value_1, value_2, value_3) {

    // ３帯目を乗数に変換
    var multiplier;
    switch (value_3) {
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
          multiplier = Math.pow(10, value_3);
          break;
        case "G":
          multiplier = Math.pow(10, -1);
          break;
        case "S":
          multiplier = Math.exp(10, -2);
          break;
        default:
          multiplier = 0;
          break;
    }

    // 抵抗値(Ω) = (１帯目 2帯目) * ３帯目
    return Number(value_1 + value_2) * multiplier;
};

// 抵抗値を表示用単位に変換
var ohmString = function (ohm) {

    var ohmString = ohm;
    if (ohm >= 1000000) {
        ohmString = (ohm / 1000000) + "M";
    }　else if (ohm >= 1000) {
        ohmString = (ohm / 1000) + "K";
    }

    return ohmString;
};


// 抵抗値誤差を算出
var ohmError = function (value_4) {
  var ohmError;

  switch (value_4) {
      case "1":
        ohmError = 1;
        break;
      case "2":
        ohmError = 2;
        break;
      case "3":
        ohmError = 0.05;
        break;
      case "5":
        ohmError = 0.5;
        break;
      case "6":
        ohmError = 0.25;
        break;
      case "7":
        ohmError = 0.1;
        break;
      case "G":
        ohmError = 5;
        break;
      case "S":
        ohmError = 10;
        break;
      case "N":
        ohmError = 20;
        break;
      default:
        ohmError = 0;
        break;
      }

    return ohmError / 100;
};

// 抵抗値誤差を表示用単位に変換
var ohmErrorString = function (ohmError) {

    var ohmErrorString = "±" + (ohmError * 100) + "%"

    return ohmErrorString;
};
