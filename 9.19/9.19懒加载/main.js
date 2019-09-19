var container = document.getElementById('container'),
    pageImg = container.getElementsByTagName('img')[0];

setInterval(function() {
    var trueImg = pageImg.getAttribute('data-src'),
        tempImg = document.createElement('img');
        tempImg.onload = function() {   //加载是否成功处理(IE)
            pageImg.src = trueImg;
            pageImg['style']['display'] = 'block';
            tempImg = null;
        };
        tempImg.src = trueImg;
}, 1000)


 