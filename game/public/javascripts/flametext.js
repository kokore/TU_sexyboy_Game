var isInstructed = false;
var iTim = setTimeout(function() {
    $("#instructions").fadeIn(3000);
}, 5000);

setTimeout(function() {
    $('.flame').fadeTo(2000, 0.1, function() {
        swapFlames(['H', 'E', 'R', 'B', 'E', 'R', 'T']);
        $('.flame').fadeTo(2000, 0.9);
    });
}, 3000);

$(document).ready(function() {
    $("#instructions").hide();
    $("#cool").hide();

    wrapCharacters($('.fire-text'));

    setInterval(flicker, 80);

    $("#fire_msg").blur(function() {
        wrapCharacters($(this));
        if (!isInstructed) {
            clearTimeout(iTim);
            $("#instructions").hide();
            $("#cool").fadeIn(1200);
            setTimeout(function() {
                $("#cool").fadeOut(800);
            }, 3000);
            isInstructed = true;
        }
    });

    $('.flame').keyup(function(e) {
        check_charcount(e, $(this));
    });
    $('.flame').keydown(function(e) {
        check_charcount(e, $(this));
    });

    $('.flame').click(function() {
        document.execCommand('selectAll', false, null);
    });
});

function check_charcount(e, can) {
    checkHex();

    if (!isInstructed) {
        clearTimeout(iTim);
        $("#instructions").fadeOut(1200);
        isInstructed = true;
    }

    if (e.which != 8 && can.text().length > 1) {
        can.text(can.text().substring(0, 1));
        wrapCharacters(can);
        e.preventDefault();
    }

    if (e.which == 8 || e.which == 46) {
        var allOut = true;
        $(".flame").each(function() {
            if ($(this).text() !== "") {
                allOut = false;
            }
        });

        if (allOut) {
            swapFlames(['&#9830;', '&#9830;', '&#9830;', '&#9830;', '&#9830;', '&#9830;', '&#9830;']);
        }
    }
}


function checkHex() {
    if ($('#c0').text() == "#") {
        var cc =
            $('#c0').text() +
            $('#c1').text() +
            $('#c2').text() +
            $('#c3').text() +
            $('#c4').text() +
            $('#c5').text() +
            $('#c6').text();
        $(".candle-body").css("background", cc);
    } else {
        var ca = ['#CE1836', '#F85931', '#EDB92E', '#A3A948', '#009989', '#492D61', '#EE9BA9'];
        $(".candle-body").each(function(i) {
            $(this).css("background", ca[i]);
        });
    }
}

function wrapCharacters(element) {
    $(element).contents().each(function() {
        if (this.nodeType === 1) {
            wrapCharacters(this);
        } else if (this.nodeType === 3) {
            $(this).replaceWith($.map(this.nodeValue.split(''), function(c) {
                return '<div>' + c + '</div>';
            }).join(''));
        }
        $('.fire-text div').each(function() {
            $(this).attr("y_pos", "0");
        });
    });
}

function swapFlames(ln) {
    for (var i = 0; i < ln.length; i++) {
        $('#c' + i).html(ln[i]);
    }
    wrapCharacters($('.flame'));
}

function flicker() {
    $('.fire-text div').each(function() {
        var x = parseFloat($(this).attr("x_pos"));
        var y = parseFloat($(this).attr("y_pos"));

        if ($(this).attr("data-up") == "1") {
            y += getVariance(1, 2);
            if (y > 10) {
                $(this).attr("data-up", "0");
            }
        } else {
            y -= getVariance(3, 5);
            if (y < 2) {
                $(this).attr("data-up", "1");
            }
        }

        $(this).attr("y_pos", y);

        var yO = 1 / (10 / (y + 1));
        var yB = yO * (yO * getVariance(10, 20));

        var ts = "0px 0px " + Math.floor(getVariance(30, 50)) + "px #fff, " +
            getShake() + "1px -" + (Math.floor(getVariance(1, y)) + 30) + "px " + getVariance(40, 90) + "px rgba(200,200,200," + yO + "), " +
            getShake() + Math.floor(y / 5) + "px -" + y + "px " + yB + "px rgba(255,200,60," + yO + "), " +
            getShake() + Math.floor(y / 7) + "px -" + y + "px " + yB + "px rgba(210,180,20," + yO + ")";
        $(this).css("-webkit-text-shadow", ts);
        $(this).css("-moz-text-shadow", ts);
        $(this).css("-ms-text-shadow", ts);
        $(this).css("-text-shadow", ts);
        $(this).css("text-shadow", ts);

        var cl = 'rgba(' + Math.floor(getVariance(240, 250)) + ',' + Math.floor(getVariance(160, 180)) + ',0,' + getVariance(0.5, 0.9) + ')';
        $(this).css('color', cl);

        var mx = 'matrix(' + getVariance(0.98, 1.02) +
            ', ' + getVariance(-0.02, 0.02) +
            ', ' + getVariance(-0.02, 0.02) +
            ', ' + getVariance(0.98, 1.02) +
            ', ' + Math.floor(getVariance(-1, 1)) +
            ', ' + Math.floor(getVariance(-1, 1)) +
            ')';
        $(this).css('-webkit-transform', mx);
        $(this).css('-moz-transform', mx);
        $(this).css('-ms-transform', mx);
        $(this).css('-transform', mx);
        $(this).css('transform', mx);
    });
}

function getVariance(min, max) {
    return Math.random() * (max - min) + min;
}

function getShake() {
    return (Math.random() > 0.5) ? "-" : "";
}
