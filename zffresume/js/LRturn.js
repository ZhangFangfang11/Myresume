

var loadingRender = (function () {
    var ary = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'circle.png', 'leftLine.png', 'line1.png', 'line2.png', 'myLogo.png', 'normalmusic.svg', 'phonefoot.svg', 'phonetop.svg', 'pink.png', 'rightLine.png', 'triangle.png', 'zf_concatPhone.png', 'zf_course.png', 'zf_course1.png', 'zf_course2.png', 'zf_course3.png', 'zf_course4.png', 'zf_course5.png', 'zf_course6.png', "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", 'zf_return.png'];
    var curNum = 0, total = ary.length;
    var $mainBox = $('#mainBox');
var $section=document.getElementsByTagName('section');
var Bell=document.getElementById('Bell');


    var startX, startY, endX, endY;
    var showID = 1;
    function startFn(e) {

        var touch = e.changedTouches[0];
        this.startY = touch.pageY;
        this.startX = touch.pageX;
        this.isMove=false;

    }

    function moveFn(e) {
        var touch = e.changedTouches[0];
        this.changeX=touch.pageX-this.startX;
        this.changeY=touch.pageX-this.startY;
        if(Math.abs(this.changeX) >10 || Math.abs(this.changeY)){
            this.isMove=true;
        }

        e.preventDefault();
    }

    function endFn(event) {
        if(!this.isMove){
            console.log('点击');
        }else{//滑动
            $("#page" + showID).hide();
            if (showID === $section.length) {
                /!*showID=1;*!/
                $("#page"+$section.length).show();

               cubeRender.init();

                $('.music').css('display','none');
                Bell.pause();
            } else {
                ++showID;
                $("#page" + showID).show();
                console.log("#page" + showID);
            }
            this.isMove=false;
        }

    }

    return {
        init: function () {
           $.each(ary, function (index, item) {
                var OImg = new Image;
                OImg.src = 'img/' + item;
                OImg.onload = function () {

                    var n = (++curNum) / total;
                    //->当所有的图片都加载完成后,我们让LOADING层消失(设置一个1S的延迟,防止网速过快,LOADING层看不见或者层闪烁问题)
                    if (curNum === total) {
                        Bell.play();
                        $('#mainBox section').on("touchstart", startFn)
                            .on("touchmove", moveFn)
                            .on("touchend", endFn);
                    }
                }
            })
        }
    }
})();
$(document).add($('img')).on('touchmove', function (e) {
   // e.preventDefault();
});
var   $cubeBox;
var cubeRender = (function () {
    var $cube = $('#page5');
    $cubeBox = $('#cubeBox');
  var  $cubeList = $cubeBox.find('li');
    function startFn(e) {
         var point = e.changedTouches[0];
        $(this).attr({
            strX: point.pageX,
            strY: point.pageY,
            changeX: 0,
            changeY: 0,
            isMove: false
        });

    }

    function moveFn(e) {
        var point = e.changedTouches[0];
        var changeX = point.pageX - parseFloat($(this).attr('strX')),
            changeY = point.pageY - parseFloat($(this).attr('strY'));
        $(this).attr({
            changeX: changeX,
            changeY: changeY,
            isMove: (Math.abs(changeX) > 10 || Math.abs(changeY) >10)
        });
    }

    function endFn(e) {

        var isMove = $(this).attr('isMove');
        if (isMove === 'false') return;
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('XX')),
            rotateY = parseFloat($(this).attr('YY'));
        rotateY = rotateY + changeX / 3;
        rotateX = rotateX - changeY / 3;
        $(this).css('transform','scale(0.6) rotateX(' + rotateX + 'deg)  rotateY(' + rotateY + 'deg)')
        $(this).attr({
            strX: null,
            strY: null,
            changeX:0,
            changeY:0,
            isMove:false,
            xx:rotateX,
            yy:rotateY
        });

    }

    return {
        init: function () {
            $cube.css('display', 'block');
            //->存储当前的旋转角度,下一次基于这个角度再次旋转

            $cubeBox.on('touchstart', startFn)
                .on('touchmove', moveFn)
                .on('touchend', endFn);

        }
    }
})();

$cubeBox.attr({
    XX: 35,
    YY: 45
});

loadingRender.init();
