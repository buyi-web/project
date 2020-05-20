
const landDom = document.getElementsByClassName('land')[0];
const landWidth = landDom.offsetWidth;
const landHeight = landDom.offsetHeight;
const landTop = landDom.offsetTop;


class Land extends Unit{
    constructor(xSpeed){
        super(landWidth, landHeight, 0, landTop, xSpeed, 0, landDom);
    }

    onMove(){
        if(this.left <= -landWidth/2){
            this.left = 0;
        }
    }
}

