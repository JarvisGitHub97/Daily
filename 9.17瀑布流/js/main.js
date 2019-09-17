//jQuery
jQuery(function($) {
    let flowRender = (function() {
        let $flowList = $('.container>.item');
            page = 0;
            
       
        //获取数据模块
        let queryData = function() {

            if (page > 5) {
                alert('没有更多数据了');
                $(window).off('scroll', loadMore);
                return;
            }
            page++;

            $.ajax({
                url: 'json/data.json?page=' + page,
                method: 'get',
                dataType: 'json',
                cache: false,
                success: insertHTML
            });

        };
  
        
        //拼接单元模块
        let queryHTML = function({id, pic, link, title}= {}) {
            return `<a href="${link}" target="_blank">
                        <div><img src="${pic}" alt=""></div>
                            <span>${title}</span>
                    </a>`;
        };
        //排列长度模块
        let sortCol = function() {
            let flowListArr = [].slice.call($flowList);
            if ($flowList[0].offsetHeight === 0) {
                flowListArr = $flowList;
            }
            return flowListArr.sort(function(a, b) {
                    return a.offsetHeight - b.offsetHeight;
            }); 
        };
        //插入单元模块
        let insertHTML = function(result) {
            //=>result 从服务器获取的数据
            for (let i = 0; i < result.length; i += 3) {
                let item1 = result[i],
                    item2 = result[i + 1],
                    item3 = result[i + 2];
                let flowListArr = sortCol();
                item1 ? flowListArr[0].innerHTML += queryHTML(item1) : null;
                item2 ? flowListArr[1].innerHTML += queryHTML(item2) : null;
                item3 ? flowListArr[2].innerHTML += queryHTML(item3) : null;
            }
        };
        //加载更多模块
        let loadMore = function() {
            let winH = document.documentElement.clientHeight,
                pageH = document.documentElement.scrollHeight,
                scrollT = document.documentElement.scrollTop;
            if (scrollT >= pageH - winH -100) {
                queryData();
            }
        };



        //初始化
        return {
            init: function() {
                queryData();
                $(window).on('scroll', loadMore);
            },
        }
    })();
    flowRender.init();
}); 