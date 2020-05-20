/**
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
 * xSpeed：横向速度，单位（像素/秒），正数是向右，负数向左
 * ySpeed：纵向速度，单位（像素/秒），正数是向下，负数向上
 */
class Unit{
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;

        this.sizeRender();
        this.siteRender();
    }
    //大小渲染
    sizeRender(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
    }
    //位置渲染
    siteRender(){
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    move(duration){
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;
        this.left += xDis;
        this.top += yDis; 

        if(this.onMove){  //用于移动到临界点的判定
            this.onMove()
        }

        this.siteRender();//
    }
}