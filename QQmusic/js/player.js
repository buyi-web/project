(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],

        init: function ($audio) {  //初始化
            this.$audio = $audio; //jquery对象
            this.audio = $audio.get(0); //dom对象
        },
        currentIndex: -1,
        playMusic: function (index, music) {
            //判断是否是听一首音乐
            if (this.currentIndex == index) {
                //同一首音乐
                if (this.audio.paused) { //判断是否暂停
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                //不是同一首
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex: function () {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            return index;
        },
        changeMusic: function (index) {
            //删除对应的数据
            this.musicList.splice(index, 1);

            //判断当前删除的音乐是否是正在播放的音乐的前面的音乐
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        musicTimeUpdate: function (callBack) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration)
                callBack(currentTime,duration,timeStr);
            })
        },
        formatDate: function (currentTime, duration) {
            var endMin = parseInt(duration / 60);
            var endSec = parseInt(duration % 60);
            if (endMin < 10) {
                endMin = "0" + endMin;
            }
            if (endSec < 10) {
                endSec = "0" + endSec;
            }

            var curMin = parseInt(currentTime / 60);
            var curSec = parseInt(currentTime % 60);
            if (curMin < 10) {
                curMin = "0" + curMin;
            }
            if (curSec < 10) {
                curSec = "0" + curSec;
            }
            return curMin + ":" + curSec + " / " + endMin + ":" + endSec;
        },
        musicSeekTo: function(ratio){
            if(isNaN(ratio)) return ;
            this.audio.currentTime = this.audio.duration * ratio;
        },
        musicVoiceSeekTo: function(ratio){
            if(isNaN(ratio)) return;
            if(ratio < 0 || ratio > 1) return;
            //audio.volume : 0-1
            this.audio.volume = ratio;
        }

    }

    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
}(window))