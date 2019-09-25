let bannerRender = (function() {
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        btn = container.querySelector('.btn'),
        btnLeft = container.querySelector('.btnLeft'),
        btnRight = container.querySelector('.btnRight');
        slideList = null,
        focusList = null;


    //获取数据
    let queryData = function() {
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'data.json');
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        });
    };
    //绑定数据
    let bindData = function bindData(data) {
        let strSlide = ``,
            strFocus = ``;
        data.forEach((item, index)=>{
            let {img, desc} = item;
            strSlide += `<div class="pic"><img src="${img}" alt="${desc}"></div>`;
            
            if(index == 0) {
                strFocus += `<li class="active"></li>`;
            }else{
                strFocus += `<li></li>`;
            }
        }); 
        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;  

        slideList = document.querySelectorAll('.pic');
        focusList = document.querySelectorAll('li');
        //复制第一元素
        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList = document.querySelectorAll('.pic');
        utils.css(wrapper, 'width', slideList.length*800);
    };

        //运动的相关的参数
        let autoTimer = null,
        interval = 3000,
        picIndex = 0;
    
    //自动轮播动画
    let autoMove = function autoMove() {
        picIndex++;
        if(picIndex >= slideList.length) {
            utils.css(wrapper, 'left', 0);
            picIndex = 1;
        }
        animate(wrapper, {
            left:-picIndex*800
        }, 600);
        clickFocus();
    };

    //圆点自动切换
    let clickFocus = function() {
        let tempIndex = picIndex;
        tempIndex === slideList.length - 1 ? tempIndex = 0 : null;
        [].forEach.call(focusList, (item, index)=>{
            item.className = index === tempIndex ? 'active'  : '';
        })
    };

     //基于事件委托实现事件反馈
     let controller = function() {
        //悬浮
        container.onmouseenter = function() {
            clearInterval(autoTimer);
            btnLeft.style.display = btnRight.style.display = 'block';
        };
        container.onmouseleave = function() {
            autoTimer = setInterval(autoMove, interval);
            btnLeft.style.display = btnRight.style.display = 'none';
        };

        //获取的点击元素的索引
        let queryIndex = function (ele) {
            let ary = [],
                bro = ele.previousElementSibling;
            while (bro) {
                ary.unshift(bro);
                bro = bro.previousElementSibling
            }
            return ary.length;
        };

        //事件委托点击反馈
        container.onclick = function(event) {
            let target = event.target,
                pare = target.parentNode,
                tag = target.tagName;

            //判断点击区域
            if(tag === 'LI' && pare.className.indexOf('focus') > -1) {
                picIndex = queryIndex(target);
                animate(wrapper, {
                    left: -picIndex*800
                }, 600);
                clickFocus();
                return;
            }
            if(tag === 'IMG' && pare.className.indexOf('btn') > -1) {
                if(pare.className.indexOf('btnLeft') > -1) {
                    picIndex--;
                    if(picIndex < 0) {
                        picIndex = slideList.length-1;
                        utils.css(wrapper, 'left', -picIndex*800);
                        picIndex--;
                    }
                    animate(wrapper, {
                        left:-picIndex*800
                    }, 600);
                    clickFocus();
                    return;
                }
                    autoMove();

            }
        };

    };
    return {
        init:function() {
            let promise = queryData();
            promise.then(bindData)
                    .then(()=>{
                        autoTimer = setInterval(autoMove, interval);
                    })
                    .then(()=>{
                        controller();
                    });
        }
    }
})();

bannerRender.init();
   
   
   
   
   
  