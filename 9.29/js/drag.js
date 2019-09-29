(function() {
    class Drag extends Subscribe{
        constructor(ele) {
            super();
            //初始化参数, 放到但当前的实例上
            this.ele =  ele;
            ['strX', 'strY', 'strL', 'strT', 'curL', 'curT'].forEach(item => {
                this[item] = null;
            });

            this.subDown = new Subscribe;
            this.subMove = new Subscribe;

            this.DOWN = this.down.bind(this);
            this.ele.addEventListener('mousedown', this.DOWN);
        }
        down(event) {  
            let ele = this.ele;
            this.strX = event.clientX;
            this.strY = event.clientY;
            this.strL = ele.offsetLeft;
            this.strT = ele.offsetTop;

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);
            document.addEventListener('mousemove', this.MOVE);
            document.addEventListener('mouseup', this.UP);

            this.subDown.fire(ele, event);
        }

        move(event) {
            let ele = this.ele;
            this.curL = event.clientX - this.strX + this.strL;
            this.curT = event.clientY - this.strY + this.strT;
            ele.style.left = this.curL + 'px';
            ele.style.top = this.curT + 'px';

            this.subMove.fire(ele, event);
        }

        up(event) {
            document.removeEventListener('mousemove', this.MOVE);
            document.removeEventListener('mouseup', this.UP);
            this.fire(this.ele, event);
        }  
    }
})()