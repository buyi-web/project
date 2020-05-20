
const skyDom = document.getElementsByClassName('sky')[0];
const skyWidth = skyDom.offsetWidth;
const skyHeight = skyDom.offsetHeight;

class Sky extends Unit{
    constructor(){
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom); 
    }
    onMove(){
        if(this.left <= -skyWidth/2){
            this.left = 0;
        }
    }
}

