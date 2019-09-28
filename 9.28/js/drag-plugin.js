(function($) {
    if(typeof $ === 'undefined') {
        throw new ReferenceError('must rely on  jQuery')
    }
    class Drag {
        //options为选配参数，ele受影响的对象。selector产生影响的对象
        constructor(ele, options = {}) {
            if(typeof ele === 'undefined' || ele.nodeType !== 1) {
                throw new ReferenceError('the ele must be a element object and isn\'t null')
            }

            let $btn = $('.container .dragBox .title span');

            let {selector = ele } = options;
                //绑定到实例上的对象类别固定，原生就原生，jq就jq
                this.ele = ele,
                this.dragTarget = selector;
            if(typeof selector === 'string') {
                //ele必须是包含selector
                this.dragTarget = $(ele).find('selector')[0];
            }

            let winL = document.documentElement.clientWidth,
                winT = document.documentElement.clientHeight,
                boxL = this.ele.offsetWidth,
                boxT = this.ele.offsetHeight,
                left = (winL - boxL)/2,
                top = (winT - boxT)/2;
            $(this.ele).css({
                left: left,
                top: top
            });

            this.dragTarget.addEventListener('mousedown', this.down.bind(this));
            $btn[0].addEventListener('click',this.close.bind(this));
        }
        
        down(event) {
            this.startX = event.clientX;
            this.startY = event.clientY;

            let $ele = $(this.ele);
            this.startL = parseFloat($ele.css('left'));
            this.startT = parseFloat($ele.css('top'));

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);

            document.addEventListener('mousemove', this.MOVE);
            document.addEventListener('mouseup', this.UP)
        }

        move(event) {
            let {startX, startY, startL, startT} = this,
                curL = event.clientX - startX + startL,
                curT = event.clientY - startY + startT,
                winL = document.documentElement.clientWidth,
                winT = document.documentElement.clientHeight,
                boxL = this.ele.offsetWidth,
                boxT = this.ele.offsetHeight,
                minL = 0,
                minT = 0,
                maxL = winL - boxL,
                maxT = winT - boxT;

            curL = curL > maxL ? maxL : (curL < minL ? minL : curL);
            curT = curT > maxT ? maxT : (curT < minT ? minT : curT);
                

            $(this.ele).css({
                left: curL,
                top: curT
            })
        }
        
        up() {

            document.removeEventListener('mousemove', this.MOVE);
            document.removeEventListener('mouseup', this.UP)
        }

        close() {
            $(this.ele).fadeOut(200);
        }
    }
    window.Drag = Drag;
})(jQuery)