$(function () {
    var $audio = $("audio");
    var player = Player($audio);
    var progress;
    var voiceProgress;
    var lyric;

    //0.自定义滚动条
    $(".content_list").mCustomScrollbar();

    //1.加载歌曲列表
    getPlayerList();
    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json", //加载形式
            success: function (data) {  //加载成功后的回调函数
                player.musicList = data; //将加载成功的数据赋给player的musicList
                //3.1 遍历获取的数据，创建每一条音乐
                var $musiclist = $(".content_list ul");
                $.each(data, function (index, ele) {
                    var $item = cerateMusicItem(index, ele);
                    $musiclist.append($item);
                });
                initMusicInfor(data[0]);
                initMusicLyric(data[0]);
            },
            error: function (e) {  //加载失败后的回调函数
                console.log(e);   //打印加载失败的错误信息
            }
        })
    }

    //2.初始化歌曲信息
    function initMusicInfor(music) {
        //获取对应元素
        var $musicImage = $(".song_infor_pic img");
        var $musicName = $(".song_infor_name a");
        var $musicSinger = $(".song_infor_singer a");
        var $musicAlbum = $(".song_infor_album a");
        var $musicProgressName = $(".music_progress_name");
        var $musicProgressTime = $(".music_progress_time");
        var $musicBg = $(".mask_bg");

        //给获取的元素赋值
        $musicImage.attr("src", music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAlbum.text(music.album);
        $musicProgressName.text(music.name + "/" + music.singer);
        $musicProgressTime.text("00:00 / " + music.time);
        $musicBg.css("background", "url('" + music.cover + "')");
    }
    //3.初始化歌词信息
    function initMusicLyric(music){
        lyric = Lyric(music.link_lrc);
        var $lyricContainer = $(".song_lyric");
        // 清空上一次音乐的歌词
        $lyricContainer.html("");
        lyric.loadLyric(function(){
            //创建歌词列表
            $.each(lyric.arrLyric, function(index, ele){
                var $item = $("<li>"+ele+"</li>");
                $lyricContainer.append($item);
            });
        });
    }
    //4. 初始化进度条
    initProgress();
    function initProgress() {
        var $progressBar = $(".music_progress_bar");
        var $progressLine = $(".music_progress_line");
        var $progressDot = $(".music_progress_dot");
        progress = Progress($progressBar, $progressLine, $progressDot);
        progress.progressClick(function (ratio) {
            player.musicSeekTo(ratio);
        });
        progress.progressMove(function (ratio) {
            player.musicSeekTo(ratio);
        });

        var $voiceBar = $(".music_voice_bar");
        var $voiceLine = $(".music_voice_line");
        var $voiceDot = $(".music_voice_dot");
        voiceProgress = Progress($voiceBar, $voiceLine, $voiceDot);
        voiceProgress.progressClick(function (ratio) {
            player.musicVoiceSeekTo(ratio);
        });
        voiceProgress.progressMove(function (ratio) {
            player.musicVoiceSeekTo(ratio);
        });
    }
    //5. 初始化事件监听
    initEvents();
    function initEvents() {
        //1.监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function () {
            //显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            //隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        })

        $(".content_list").delegate(".list_music", "mouseleave", function () {
            //隐藏子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            //显示时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });

        //2.监听复选框的点击事件
        $(".content_list").delegate(".list_check", "click", function () {
            $(this).toggleClass("list_checked");//权重一样 写在下面覆盖上面
        });

        //3.添加子菜单的播放按钮的监听
        var $musicPlay = $(".music_pause");

        $(".content_list").delegate(".list_menu_play", "click", function () {
            var $item = $(this).parents(".list_music");
            //3.1 切换播放图标
            $(this).toggleClass("list_menu_play2");
            //3.2 复原其他音乐结点的播放图标
            $(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");
            //3.3 同步底部播放按钮
            if ($(this).hasClass("list_menu_play2")) {
                // 当前子菜单是播放状态 
                $musicPlay.addClass("music_play");
                //让文字高亮
                $item.find("div").css("color", "#fff");
                $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
            } else {
                //当前子菜单不是播放状态 
                $musicPlay.removeClass("music_play");
                //让文字不高亮
                $item.find("div").css("color", "rgba(255,255,255,0.5)");
            }
            //3.4 切换序号状态
            $item.find(".list_number").toggleClass("list_numberPic");
            $item.siblings().find(".list_number").removeClass("list_numberPic");

            //3.5 播放音乐
            player.playMusic($item.get(0).index, $item.get(0).music);

            //3.6 切换歌曲信息
            initMusicInfor($item.get(0).music);

            //3.7 切换歌词的信息
            initMusicLyric($item.get(0).music);
        });

        //4. 监听底部控制区域的播放按钮点击
        $musicPlay.click(function () {
            //判断有没有播放过音乐
            if (player.currentIndex == -1) {
                //没有播放过音乐   播放第一首
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            } else {
                //播放过音乐
                $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
            }
        })
        //5. 监听底部控制区域的上一首按钮点击
        $(".music_pre").click(function () {
            $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
        })
        //6. 监听底部控制区域的下一首按钮点击
        $(".music_next").click(function () {
            $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
        });

        //7. 监听删除按钮的点击
        $(".content_list").delegate(".list_menu_del", "click", function () {
            //找到被点击的音乐
            var $item = $(this).parents(".list_music");

            //判断当前要删除的音乐是否在播放
            if ($item.get(0).index == player.currentIndex) {
                $(".music_next").trigger("click");
            }
            $item.remove();
            player.changeMusic($item.get(0).index);

            //重新排序
            $(".list_music").each(function (index, ele) {
                ele.index = index;
                $(ele).find(".list_number").text(index + 1);
            });
        });
        // 8.监听播放进度
        player.musicTimeUpdate(function (currentTime, duration, timeStr) {
            //同步时间
            $(".music_progress_time").text(timeStr);
            //同步进度条
            //计算播放比例
            var ratio = currentTime / duration * 100;
            progress.setProgress(ratio);

            //歌词与时间的同步
            var index = lyric.currentIndex(currentTime);
            var $item = $(".song_lyric li").eq(index);
            $item.addClass("lyric_cur");
            $item.siblings().removeClass("lyric_cur");

            //歌词滚动
            if(index <= 2) return;
            $(".song_lyric").css({
                marginTop: (-index + 2) * 30 //30为每条歌词的行高
            });
        });
        //9.监听声音按钮的点击
        $(".music_voice_icon").click(function () {
            //切换图标
            $(this).toggleClass("music_voice_icon2");
            //声音切换
            if ($(this).hasClass("music_voice_icon2")) {
                //没有声音
                player.musicVoiceSeekTo(0);
            } else {
                //有声音
                player.musicVoiceSeekTo(1);
            }
        })

    }

    //定义创建一条音乐的方法
    function cerateMusicItem(index, music) {
        var $item = $("" +
            "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">" + (index + 1) + "</div>\n" +
            "<div class=\"list_name\">" + music.name + "\n" +
            "    <div class=\"list_menu\">\n" +
            "        <a href=\"javascript::\" title=\"播放\" class=\"list_menu_play\"></a>\n" +
            "        <a href=\"javascript::\" title=\"添加\"></a>\n" +
            "        <a href=\"javascript::\" title=\"下载\"></a>\n" +
            "        <a href=\"javascript::\" title=\"分享\"></a>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<div class=\"list_singer\">" + music.singer + "</div>\n" +
            "<div class=\"list_time\">\n" +
            "    <span>" + music.time + "</span>\n" +
            "    <a href=\"javascript::\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
            "</li>");
        //为dom对象添加index和音乐信息
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
});