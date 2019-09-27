(function() {
    class Banner  {
        constructor(options = {}) {
            let {
                ele,
                url,
                isAuto = true,
                isBtn = true,
                isFocus = true,
                defaultIndex = 0,
                interval = 3000,
                speed = 600
            } = options;

            ['ele', 'url', 'isAuto', 'isFocus', 'isBtn', 'defaultIndex', 'interval', 'speed'].forEach((item, index)=>{
                this[item] = eval(item);
            });

            this.container = document.querySelector(ele);
            let me = this.container;
                this.wrapper = me.querySelector('.wrapper'),
                this.focus = me.querySelector('.focus'),
                this.btn = me.querySelector('.btn'),
                this.btnLeft = me.querySelector('.btnLeft'),
                this.btnRight = me.querySelector('.btnRight');
                this.slideList = null,
                this.focusList = null;
                this.autoTimer = null;
                this.picIndex = defaultIndex;
            //开启
            this.init();
        }



        init() {
            let {isAuto, interval} = this;
            let promise = this.queryData();
            promise.then(this.bindData)
                    .then(()=>{
                        this.autoTimer = setInterval(this.autoMove, interval);
                    })
                    .then(()=>{
                        this.handleControl();
                        this.handleFocus();
                        this.clickBtn();
                    });
        }

        

        queryData() {
            let {url} = this;
            return new Promise((resolve, reject)=>{
                let xhr = new XMLHttpRequest;
                xhr.open('GET', url);
                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 4 && xhr.status ===200) {
                        this.data = JSON.parse(xhr.responseText);
                        resolve(); 
                    }
                };
                xhr.send(null); 
            });

        };

        bindHTML() {
               //绑定数据
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

            this.slideList = document.querySelectorAll('.pic');
            console.log(this.slideList);
            this.focusList = document.querySelectorAll('li');
            //复制第一元素
            wrapper.appendChild(this.slideList[0].cloneNode(true));
            this.slideList = document.querySelectorAll('.pic');
            utils.css(this.wrapper, 'width', this.slideList.length*800);
            }

              //自动轮播动画
        autoMove() {
            this.picIndex++;
            if(this.picIndex >= this.slideList.length) {
                console.log(this.slideList);
                utils.css(wrapper, 'left', 0);
                this.picIndex = 1;
            }
            animate(wrapper, {
                left:-this.picIndex*800
            }, 600);
            this.clickFocus();
        }

        //圆点自动切换
        clickFocus() {
            let tempIndex = this.picIndex;
            tempIndex === this.slideList.length - 1 ? tempIndex = 0 : null;
            [].forEach.call(this.focusList, (item, index)=>{
                item.className = index === tempIndex ? 'active'  : '';
            })
        }

    //轮播悬停显示
        handleControl() {
                this.container.onmouseenter = function() {
                    clearInterval(autoTimer);
                    btnLeft.style.display = btnRight.style.display = 'block';
                };
                this.container.onmouseleave = function() {
                    autoTimer = setInterval(autoMove, interval);
                    btnLeft.style.display = btnRight.style.display = 'none';
                };
        }

    //点击焦点切换
        handleFocus() {
        [].forEach.call(this.focusList, (item, index)=>{
            item.onclick = function() {
                this.picIndex = index;
                animate(wrapper, {
                    left:-this.picIndex*800
                }, 600);
                this.clickFocus();
            };
        });
    }

    //点击按钮切换
        clickBtn() {
        btnRight.onclick = autoMove;
        btnLeft.onclick = function() {
            this.picIndex--;
            if(this.picIndex < 0) {
                this.picIndex = this.slideList.length-1;
                utils.css(wrapper, 'left', -this.picIndex*800);
                this.picIndex--;
            }
            animate(wrapper, {
                left:-this.picIndex*800
            }, 600);
            clickFocus();
        };
    }

    }

    window.Banner = Banner;
})()