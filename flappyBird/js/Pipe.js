
const pipeWidht = 52;
const pipeLeft = gameDom.offsetWidth; //从最右边出来
class Pipe extends Unit{
    constructor(pipeHeight, pipeTop, xSpeed, pipeDom){
        super(pipeWidht, pipeHeight, pipeLeft, pipeTop, xSpeed, 0, pipeDom)
    }

    onMove(){
        if(this.left < -this.width){
            this.dom.remove();
        }
    }
}

const getRandom = Symbol('获取一个随机数')
class PipePair{
    constructor(xSpeed){
        this.spaceHeight = 150;
        this.minHeight = 80; //管子最小高度
        this.maxHeight = gameHeight - landHeight - this.minHeight -this.spaceHeight;

        const upPipeHeight = this[getRandom](this.minHeight, this.maxHeight);
        //创建上水管
        const upPipeDom = document.createElement('div');
        upPipeDom.className = 'pipe up';
        this.upPipe = new Pipe(upPipeHeight, 0, xSpeed, upPipeDom);

        const downPipeHeight = gameHeight - upPipeHeight - this.spaceHeight - landHeight;
        const downPipeTop = upPipeHeight + this.spaceHeight;
        //创建下水管
        const downPipeDom = document.createElement('div');
        downPipeDom.className = 'pipe down';
        this.downPipe = new Pipe(downPipeHeight, downPipeTop, xSpeed, downPipeDom);

        gameDom.appendChild(upPipeDom);
        gameDom.appendChild(downPipeDom);
        
    }

    //管子对移出视野，返回true
    get nonuse(){
        return this.upPipe.left <= -this.upPipe.width; 
    }
    
     //内部函数，不暴露给外部使用,可用符合的特性
    [getRandom](min, max){
        return Math.floor(Math.random()*(max -min) + min);
    }

    //上下水管 同时同步移动
    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePairProducer{
    constructor(xSpeed){
        this.xSpeed = xSpeed;
        this.pairs = []; // 用于存放管子对
        this.timer = null;
        this.count = 0;//通过小鸟的管子对个数
    }
 
    startProduct(){
        if(this.timer){
            return ;
        }
        this.timer = setInterval(()=> {
            this.pairs.push(new PipePair(this.xSpeed));

            //清除pairs数组中已经移出视野的管子对
            for(let i = 0; i < this.pairs.length; i++){
                let pair = this.pairs[i];
                if(pair.upPipe.left < birdLeft){
                    this.count++;
                }
                if(pair.nonuse){
                    this.count++;
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, 1500)
    }
    stopProduct() {
        clearInterval(this.timer);
        this.timer = null;
    }
}




