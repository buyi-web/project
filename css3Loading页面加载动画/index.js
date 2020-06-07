(function () {
    var loadBar = $('.bar');
    var timer, per = 0;
    timer = setInterval(function () {
        per += 1;
        loadBar.css({
            width: per + '%',
        })
        if (per == 100) {
            $('.loadingPage').addClass('complete').css({
                opacity: 0
            });
            clearInterval(timer);
            console.log('dend')
        }
    }, 30)
})()