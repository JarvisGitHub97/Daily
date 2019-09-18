~function() {
    //样式工具
    let utils = (function() {
        //获取样式
        let getCss = function(ele, attr) {
            let val = null,
                reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
            if('getComputedStyle' in window) {
                val = window.getComputedStyle(ele)[attr];
                if(reg.test(val)) {
                    val = parseFloat(val);
                }
            }
            return val;
        };
        //设置样式
        let setCss = (ele, attr, value) => {
            if (!isNaN(value)) {
                if (!/^(opacity|zIndex)$/.test(attr)) {
                    value += 'px';
                }
            }
            ele['style'][attr] = value;
        };
        
        //多个样式的设置
        let setGroup = function(ele, option) {
            for(let attr in option) {
                if(option.hasOwnProperty(attr)) {
                    setCss(ele, attr, option[attr]);
                }
            }
        };
        //合并
        let css = function(...arg) {
            let len = arg.length,
                fn = getCss;
            if(len >= 3) {
                fn = setCss;
            }
            if(len === 2 && typeof arg[1] === 'object') {
                fn = setGroup;
            }
            return fn(...arg);
        };
        return {css};
    })();
    //运动公式
    let effect = {
        linear: function(t, b, c, d) {return t/d*c+b},
    };

    window.animate = function(ele, target = {}, duration = 1000) {

        //计算定值
        let begin = {},
            change = {},
            time = 0;
        for(let attr in target) {
            if(target.hasOwnProperty(attr)) {
                begin[attr] = utils.css(ele, attr);
                change[attr] = target[attr] - begin[attr]; 
            }
        }
        
        //实现动画

        clearInterval(ele.animateTimer)
        ele.animateTimer = setInterval(function() {
            time += 17;
            //边界判断
            if(time >= duration) {
                utils.css(ele, target);
                clearInterval(ele.animateTimer);
                return;
            }
            //计算动态的位置
            let curL = {};
            for(let attr in target) {
                if(target.hasOwnProperty(attr)) {
                    curL[attr] = effect.linear(time, begin[attr], change[attr],duration );
                }
            }
            utils.css(ele, curL);
        }, 17)
    };
}();
