var game = new Game();

game.score = 0;
game.snakeSpeed = INTERVAL;
game.timer = null;
game.pause = false;
game.level = 1;

game.init = function () {
    ground.init();
    snake.init();
    game.start();
    this.createFood(ground)

    var control = tool.throttle(function (e) {
        //console.log(e)  e.witch(e.keyCode) 右上左下 37 38 39 40
        if (e.which == 37 && snake.direction != DIRECTIONMENU.right) {
            snake.direction = DIRECTIONMENU.left;
        } else if (e.which == 38 && snake.direction != DIRECTIONMENU.down) {
            snake.direction = DIRECTIONMENU.up;
        } else if (e.which == 39 && snake.direction != DIRECTIONMENU.left) {
            snake.direction = DIRECTIONMENU.right;
        } else if (e.which == 40 && snake.direction != DIRECTIONMENU.up) {
            snake.direction = DIRECTIONMENU.down;
        } else if (e.which == 13) {  //游戏暂停
            game.pause = !game.pause;
            if (game.pause) {
                clearInterval(game.timer)
            } else {
                game.start();
            }
        }
    }, 100)

    //绑定事件
    document.onkeydown = control;
}
game.start = function (speed) {
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        snake.move(ground);
    }, speed || this.snakeSpeed)
}
game.over = function () {
    clearInterval(this.timer);
    this.timer = null;
    alert('得分: ' + this.score);
}

game.changeSpeed = function (score) {
    var newLevel = parseInt(score / 3) + 1; //每吃3个加一级
    if(this.level != newLevel) {
        this.snakeSpeed = this.snakeSpeed / newLevel; //速度随等级变化  有待改善
        this.level = newLevel
        //重新开启定时器
        this.start(this.snakeSpeed)
        console.log(this.level, this.snakeSpeed);
    }
    
}


//生成食物 
game.createFood = function (ground) {
    var x, y;
    var flag = true;
    while (flag) {
        x = Math.floor(Math.random() * 28 + 1);
        y = Math.floor(Math.random() * 28 + 1);
        //判断食物的坐标是否在蛇身上
        //当蛇非常长的时候 判断可能会很久， 怎样优化
        var isCreate = true;
        for (var i = snake.head; i; i = i.next) {
            if (i.x == x && i.y == y) {
                isCreate = false;
                break;
            }
        }
        if (isCreate) {
            flag = false;
        }
    }
    var rand = Math.random();
    var food = null;
    if(rand > 0.7){
        food = factory.create('Food', x, y, 'red');
    } else {
        food = factory.create('LevelAdd', x, y, 'blue')
    }
  
    ground.removeSquare(x, y);
    ground.appendSquare(food);
}

game.init();