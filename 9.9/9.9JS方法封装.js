(function(global){

    const events = [];
    
    //基本骨架 
    function jQuery(selector){
        return new jQuery.fn.init(selector);
    }

    jQuery.fn = jQuery.prototype = {
        constructor:jQuery,

        init:function(selector){
            if(jQuery.type(selector)==="string"){   //选择器
            
                const elements = document.querySelectorAll(selector)
                
                for(let i = 0;i<elements.length;i++){
                    this[i] = elements[i];
                }
                this.length=elements.length;
                
            }else if( selector.nodeType ){  //DOM元素
                    
                this[0] = selector;
                this.length = 1;
                
            }
            
        }
    }

    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.fn.extend=jQuery.extend=function(...args){
        //接收数据的对象
        let target;
        let sources=[];

        //参数个数为1：
        if(args.length===1){
            target=this;
            sources.push(args[0]);
        }else{
            //参数个数>1：
            target=args[0];

            sources.push(...args);
            sources.splice(0,1);
        }

        //完成拷贝的逻辑
        sources.forEach(function(source){
            //获取对象中的每一个属性：
            Object.keys(source).forEach(function(key){
                target[key] = source[key];
            })
        });

        //告知用户拷贝的结果
        return target;

    }


    jQuery.extend({
        //each方法
        each(obj, callback){
             //两种情况：数组（伪数组），对象
            if(length in obj && obj.length>=0 ) {
                for(let i = 0; i < obj.length; i++) {
                    callback.call(obj[i], i, obj[i]);
                }
            }else {
                for(let i in obj) {
                    callback.call(obj[i], i, obj[i]);
                }
            } 
        },

        //type方法判断类型
        type(data) {
            var type =  Object.prototype.toString.call(data);
            return type.replace("[object ", "").replace("]", "").toLowerCase();
        }
    });
   
        //


    jQuery.fn.extend({
        each(callback) {
            jQuery.each(this, callback);
        },

        //css方法
        css(...arg) {
            //参数个数，参数类型
            var arg1 = arg[0];
            var arg2 = arg[1];
            if (arg.length === 1 ) {
                if(jQuery.type(arg1) === "string") {
                    //获取指定对应的值
                    //此处只能获取符合选择器的第一个元素节点
                    let firstDom = this[0];
                    let domStyleObj = window.getComputedStyle(firstDom, null);
                    return domStyleObj[arg1];
                }else {
                    //设置多个属性样式
                    this.each(function () {
                        jQuery.each(arg1,(key, value)=>{
                            this.style[key] = value; 
                        });
                    });
                }
            }else {
                this.each(function(index, dom) {
                    this.style[arg1] = arg2;
                });
            } 
        },

        //show方法
        show(){
            this.css("display", "block");
            return this;
        },

        //hide
        hide(){
            this.css("display", "none");
            return this;
        },

        //toggle
        toggle(){
            this.each(function(){
                jQuery(this).css("display") === "none"?
                    jQuery(this).show():jQuery(this).hide(); 
            });
        },

        //事件绑定
        on(type, callback) {
            this.each(function(index, element){
                element.addEventListener(type, callback);
                events.push({ele:element, type, callback});
            });

            //实现链式编程
            return this;
        },

        //事件解绑
        off(type) {
            this.each(function(index, element){
                //找到一个元素曾经绑定过type类型的事件，结果是数组
                var evts = events.filter(function(evtObj){
                    var isCurrent = evtObj.ele ===element && evtObj.type === type;
                    return isCurrent;
                });
                evts.forEach(function(evt){
                    var {callback} = evt;
                    element.removeEventListener(type, callback); 
                })
            });
        },
    })

    global.$ = global.jQuery = jQuery;
})(window)

