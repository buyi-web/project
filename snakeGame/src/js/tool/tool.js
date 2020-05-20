var tool = {
    inhetit: function(target, origin){   //圣杯模式继承  只继承原型链上的属性
        var temp = function(){};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    extends: function(origin){     //私有属性的继承  返回一个新的子类
        var result = function(){
            origin.apply(this, arguments)
        }
        this.inhetit(result, origin);//继承原型上的属性

        return result;
    },
    single: function (origin){  //引入单例模式
        var self = this;
        var singleResult = (function(){
            var instance;
            return function(){
                if(typeof instance == 'object'){
                    return instance;
                }
                instance = this;//保证单例
                 //继承属性
                 origin && origin.apply(this, arguments);//私有继承
            }
        })()
        origin && this.inhetit(singleResult, origin)//原型继承
        return singleResult;
    },
    throttle: function (handle, wait) {  //节流
        var lasttime = 0;
        return function () {
            var nowtime = new Date().getTime();
            if(nowtime - lasttime > wait){
                handle.apply(this, arguments);
                lasttime = nowtime;
            }
        }
      
    }

}

