
const birdDom = document.getElementsByClassName('bird')[0];
const birdWidth = birdDom.offsetWidth;
const birdHeight = birdDom.offsetHeight;
const birdLeft = birdDom.offsetLeft;
const birdTop = birdDom.offsetTop;

const gameDom = document.getElementsByClassName('game')[0];
const gameHeight = gameDom.offsetHeight;


class Bird extends Unit{
    constructor(){
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //向下的加速度  单位：像素/秒²
        this.lowest = gameHeight - landHeight - birdHeight;//小鸟的最低位置
        this.timer = null; //小鸟翅膀变化的定时器
        this.swingStatus = 1;
    }

    startSwing(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(()=>{
            this.swingStatus++;
            if(this.swingStatus === 4){
                this.swingStatus = 1
            }
            this.dom.className = `bird swing${this.swingStatus}`;
        },200)
    }
    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }
    jump(){
        this.ySpeed = -450; 
    }
    move(duration){  //重写move
        this.ySpeed += this.g * duration;
        super.move(duration);
    }
    onMove(){
        if(this.top <= 0){
            this.top = 0
        }else if(this.top >= this.lowest){
            this.top = this.lowest;
        }
    }
}


