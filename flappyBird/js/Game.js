
const Game = (() => {
    const isCrash = Symbol('碰撞检测');
    const keyEvent = Symbol('键盘事件');
    const isGameOver = Symbol();
    return class Game {
        constructor() {
            this.sky = new Sky();
            this.land = new Land(-100);
            this.bird = new Bird();
            this.pipeProducer = new PipePairProducer(-100);

            this.tick = 16; //移动时间间隔，毫秒
            this.timer = null;
        }


        init() {
            this[keyEvent]();
            this.startGame();
        }
        
        startGame() {
            this.bird.startSwing();
            this.pipeProducer.startProduct();
            const duration = this.tick / 1000;

            this.timer = setInterval(() => {
                this.sky.move(duration);
                this.land.move(duration);
                this.bird.move(duration);
                this.pipeProducer.pairs.forEach((pair) => {
                    pair.move(duration);
                })
                
                //判断游戏是否结束
                if (this[isGameOver]()) {
                    this.pauseGame();
                    console.log(this.pipeProducer.count)
                }
            }, this.tick)
        }
        pauseGame() {
            clearInterval(this.timer);
            this.timer = null;

            this.bird.stopSwing();
            this.pipeProducer.stopProduct();
        }
        //判断两个矩形是否碰撞
        [isCrash](rec1, rec2) {
            //两个矩形的中心点距离（横向或纵向）都 小于等于宽(高)度之和的一半
            let centerX1 = rec1.left + rec1.width / 2;
            let centerX2 = rec2.left + rec2.width / 2;
            let centerY1 = rec1.top + rec1.height / 2;
            let centerY2 = rec2.top + rec2.height / 2;
            let disX = Math.abs(centerX2 - centerX1); //中心点横向距离
            let disY = Math.abs(centerY2 - centerY1);
            if (disX <= (rec1.width + rec2.width) / 2 && disY <= (rec1.height + rec2.height) / 2) {
                return true;
            }
            return false;
        }
        //游戏是否结束
        [isGameOver]() {
            if (this.bird.top === this.bird.lowest) { //鸟碰到了大地
                return true;
            }
            for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
                const pair = this.pipeProducer.pairs[i];
                //鸟与水管发生碰撞
                if (this[isCrash](this.bird, pair.upPipe) || this[isCrash](this.bird, pair.downPipe)) {
                    return true;
                }
            }
            return false;
        }
        //绑定键盘事件
        [keyEvent]() {
            document.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    if (this.timer) {
                        this.pauseGame();
                    } else {
                        this.startGame()
                    }
                } else if (e.key === ' ') {
                    this.bird.jump()
                }
            }
        }
    }

})()

const game = new Game();
game.init();
