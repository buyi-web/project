(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        progressClick: function (callBack) {
            var $this = this;
            //监听背景的点击
            this.$progressBar.click(function (event) {
                //获取背景距离窗口的默认位置
                var normalLeft = $(this).offset().left;
                //获取点击的位置距离窗口的位置
                var eventLeft = event.pageX;
                //设置前景的宽度和原点的位置
                $this.$progressLine.css("width", eventLeft - normalLeft);
                $this.$progressDot.css("left", eventLeft - normalLeft);
                //计算进度条的比例
                var ratio = (eventLeft - normalLeft) / $(this).width();
                callBack(ratio);
            });
        },
        progressMove: function (callBack) {
            var $this = this;
            //获取背景距离窗口的位置
            var normalLeft = this.$progressBar.offset().left;
            var barWidth = this.$progressBar.width();
            var eventLeft;
            var ratio;
            //1.监听鼠标在圆点的按下事件
            this.$progressBar.mousedown(function (event) {
                $this.isMove = true;
                //2. 监听鼠标的移动事件 
                $(document).mousemove(function (event) {
                    //获取点击的位置距离窗口的位置
                    eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
                    if (offset >= 0 && offset <= barWidth) {
                        $this.$progressLine.css("width", offset);
                        $this.$progressDot.css("left", offset);
                    }
                });
                //3. 监听鼠标的抬起事件
                $(document).mouseup(function () {
                    $(document).off("mousemove");
                    //计算进度条的比例
                    ratio = (eventLeft - normalLeft) / barWidth;  
                    callBack(ratio); 
                    $(document).off("mouseup"); 
                    $this.isMove = false;
                });
            });
        },
        setProgress: function (ratio) {
            if (this.isMove) return;
            if (ratio < 0 || ratio > 100) return;
            this.$progressLine.css({
                width: ratio + "%"
            });
            this.$progressDot.css({
                left: ratio + "%"
            });
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);