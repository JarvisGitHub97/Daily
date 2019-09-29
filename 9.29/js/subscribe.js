(function() {
    class Subscribe {
        constructor() {
            this.pond = [];
        }
        //添加计划，注意要判断是否存在该计划
        add(fn) {
            let pond = this.pond;
            pond.forEach((item, index)=>{
                item === fn ? null : pond.push(fn);
            });
        }
        //移除该计划，但赋值为null，真正移除是在fire阶段
        remove(fn) {
            let pond = this.pond;
            pond.forEach((item, index)=>{
                if(item === fn) {
                    pond[index] = null; 
                }
            });
        }
        //先判断否为null，不是则传参并执行方法
        fire(...arg) {
            let pond = this.pond;
            for(let i = 0; i < pond.length; i++) {
                let item = pond[i];
                if(item === null) {
                    pond.splice(i, 1);
                    i--
                    continue;
                }
                item(...arg);
            }
        }
    }
    window.Subscribe = Subscribe;
})(window)