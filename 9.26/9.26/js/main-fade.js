$(function() {
    let banner = (function() {
        let $container = $('.container'),
            $wrapper = $container.children('.wrapper'),
            $focus = $container.children('.focus'),
            $btn =$container.children('.btn'),
            $btnLeft = $container.children('.btnLeft'),
            $btnRight = $container.children('.btnRight'),
            $slideList = null,
            $focusList = null;
        let queryData = function() {
            return new Promise((resolve, reject)=>{
                $.ajax({
                    url:'data.json',
                    method:'get',
                    dataType:'json',
                    async:true,
                    success:resolve,
                    error:reject
                });
            });
        } 
        let bindHTML = function(data) {
            let strSlide = ``,
                strFocus = ``;
            $.each(data, (index, item)=>{
                let {img, desc} = item;
                strSlide += `<div class="pic"><img src="${img}" alt="${desc}"></div>`;
                strFocus += ` <li class="${index === 0 ? 'active' : ''}"></li>`;

                $wrapper.html(strSlide);
                $focus.html(strFocus);

                $slideList = $wrapper.find('.pic');
                $focusList = $focus.find('li');
            });
        }; 


        let curIndex = 0,
            lastIndex = 0,
            timer = null,
            speed = 600,
            interval = 3000;
        
        let fadeShow = function fadeShow() {
            let $cur = $slideList.eq(curIndex),
                $last = $slideList.eq(lastIndex);
            $cur.css('zIndex', 1);
            $last.css('zIndex', 0);
            $cur.stop().animate({
                opacity: 1
            }, speed, ()=>{
                $last.css({opacity:0});
                lastIndex = curIndex;
            });
            autoFocus();
        };
        
        let autoMove = function() {
            curIndex++;
            if(curIndex >= $slideList.length) {
                curIndex = 0;
            }
            fadeShow();
        };

        let autoFocus = function() {
            $focusList.eq(curIndex).addClass('active');
            $focusList.eq(lastIndex).removeClass('active');
        };

        let handleControl = function() {
            $container.on('mouseenter', ()=>{
                clearInterval(timer);
                $btnLeft.add($btnRight).css('display', 'block')
            }).on('mouseleave', ()=>{
                timer = setInterval(autoMove, interval);
                $btnLeft.add($btnRight).css('display', 'none')
            });
        };

        let clickBtn = function() {
            $btnRight.on('click', autoMove);
            $btnLeft.on('click', ()=>{
                curIndex--;
                if(curIndex < 0) {
                    curIndex= $slideList.length-1;
                };
                fadeShow();
            })
        };

        let clickFocus = function() {
            $focusList.on('click', function anonymous() {
                let target = $(this).index();
                if(target === curIndex) {
                    return;
                }
                curIndex = target;
                fadeShow();
            })
        };
        
        return {
            init:function() {
                let promise = queryData();
                promise.then((data)=>{
                    bindHTML(data);
                    timer = setInterval(autoMove, interval);
                    handleControl();
                    clickBtn();
                    clickFocus();
                })
            }
        }
    })();
    banner.init();
});
