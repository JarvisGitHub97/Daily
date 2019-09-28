$(function() {
    let $container = $('.container'),
        $dragBox = $container.find('.dragBox'),
        $title = $dragBox.find('.title'),
        $btn = $title.find('span');
    //实现默认界面居中
    let winT = document.documentElement.clientHeight,
        winL = document.documentElement.clientWidth,
        boxT = $dragBox[0].offsetHeight,
        boxL = $dragBox[0].offsetWidth,
        left = (winL - boxL)/2,
        top = (winT - boxT)/2;
    $dragBox.css({
        left: left,
        top: top
    });

    //点击关闭
    $btn.on('click', function() {
        $dragBox.fadeOut(200, ()=>{
            $container.css('display', 'none');
        })
    });

    //拖动模块 
    let dragStart = function dragStart(event) {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startL = parseFloat($dragBox.css('left'));
        this.startT = parseFloat($dragBox.css('top'));


        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_END = dragEnd.bind(this);


        $(document).on('mousemove', this.DRAG_MOVE).on('mouseup', this.DRAG_END);
        
    };

    let dragMove = function(event) {
        let {startX, startY, startL, startT} = this,
            curL = event.clientX - startX + startL,
            curT = event.clientY - startY + startT,
            minL = 0,
            minT = 0,
            maxL = winL - boxL,
            maxT = winT - boxT;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $dragBox.css({
            left: curL,
            top: curT
        });
    };

    let dragEnd = function dragEnd() {
        $(document).off('mousemove', this.DRAG_MOVE).off('mouseup', this.DRAG_MOVE);
    };

    $title.on('mousedown', dragStart)
})