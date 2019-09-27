let $container = $('.container'),
    $imgList = $('.container .imgBox>li'),
    $mark = null;

$imgList.on('mouseenter', function(event) {
    let srcStr = $(this).children('img').attr('src');
    srcStr.replace(/_(\d+)/g, '_$1_bigger');
    if(!$mark) {
        $mark = `<div class="big"><img src = ${srcStr}></div>`
        $container.append($mark);
    }
}).on('mouseleave', function(event) {
    if($mark){
        $mark.remove();
        $mark = null;
    }
}).on('mousemove', function(event) {
    let {left:curLeft, top:curTop} = $container.offset(),
        markLeft = event.pageX - curLeft + 20,
        markTop = event.pageY - curTop + 20;
    $mark.css({
        left:markLeft,
        top:markTop
    }); 
})