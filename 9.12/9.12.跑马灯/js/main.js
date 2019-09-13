let wrapper = document.querySelector('.wrapper');

//深拷贝
// let wrapperList = document.querySelectorAll('li'),
//     frg = document.createDocumentFragment();
//     [].forEach.call(wrapperList, item => {
//         frg.appendChild(item.cloneNode(true));
//     });
//     wrapper.appendChild(frg);
//     frg = null;

wrapper.innerHTML += wrapper.innerHTML;
utils.css(wrapper, 'width', utils.css(wrapper, 'width')*2);
    setInterval(()=>{

    let curL = utils.css(wrapper, "left");
    utils.css(wrapper, {
        left:--curL,
    });
    if(Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width')/2) {
        utils.css(wrapper, 'left', 0);
    }   
},17);