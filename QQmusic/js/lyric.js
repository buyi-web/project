(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        arrTime: [],
        arrLyric: [],
        index: -1,
        loadLyric: function(callBack){
            var $this = this;
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function(data){
                    // console.log(data);
                    $this.parseLyric(data);//歌词解析完毕
                    callBack();
                },
                error: function(e){
                    console.log(e);
                }
            })
        },
        parseLyric: function(data){
            var $this = this;
            //清空上一首歌曲的歌词和时间
            $this.arrTime = [];
            $this.arrLyric = [];
            
            var array = data.split("\n");
            // console.log(array);
            //遍历去除每一条歌词
            //[00:00.92]
            var timeReg = /\[(\d*:\d*\.\d*)\]/;
            $.each(array,function(index, ele){
                //处理歌词
                var lrc = ele.split("]")[1];//lrc 是数组
                if(lrc .length == 1) return;//排除空字符
                $this.arrLyric.push(lrc);

                //处理时间
                var res = timeReg.exec(ele);
                // console.log(res);
                if(res == null) return true;
                
                var timeStr = res[1]; //00:00.91 括号中的表达式
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(sec +min).toFixed(2));
                $this.arrTime.push(time);
            });
        },
        currentIndex: function(currentTime){
            // console.log(currentTime);
            if(currentTime >= this.arrTime[0]){
                this.index++;
                this.arrTime.shift();
            }
            return this.index;
        }

    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);