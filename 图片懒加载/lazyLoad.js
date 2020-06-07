
//初始化页面上所有需要懒加载的图片
function initLazyImg() {
    
    //获取懒加载图片集合
    var imgs = document.querySelectorAll('[data-src]');
    imgs = Array.from(imgs)

    //设置默认图片
    function setDefaultImg() {
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            img.src = './lp/default.jpg'
        }
    }
    setDefaultImg();
    loadImgs()
    //加载视口中的图片
    function loadImgs() {
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            //已经懒加载的图片从数组中移除
            //当图片很多时，移除已加载的图片能提高循环效率
            if (loadImg(img)) {
                imgs.splice(i, 1);
                i--;
            }
        }
    }
    //图片是否加载
    function loadImg(img) {
        var imgInfo = img.getBoundingClientRect()
        //判断图片是否在视口范围内
        if (imgInfo.left > 0 && imgInfo.right < document.documentElement.clientWidth &&
            imgInfo.bottom > 0 && imgInfo.top < document.documentElement.clientHeight) {
            // img.src = img.getAttribute('data-src')
            //dataset获取dom上有'data-'属性的集合
            img.src = img.dataset.src
            return true;
        }
        return false;
    }

    //绑定滚动事件
    var timer = null;
    window.addEventListener('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(function(){
            loadImgs();
        },500)
    }, false)
}

