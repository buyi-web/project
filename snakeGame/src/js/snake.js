var snake = new Snake();
snake.head = null;
snake.tail = null;

//蛇的方向
var DIRECTIONMENU = {
    left: {
        x: -1,
        y: 0,
    },
    right: {
        x: 1,
        y: 0,
    },
    up: {
        x: 0,
        y: -1,
    },
    down: {
        x: 0,
        y: 1,
    }
}

snake.init = function () {
    var oSnakeHead = factory.create('SnakeHead', 3, 1, 'green');
    var oSnakeBody1 = factory.create('SnakeBody', 2, 1, 'lightgreen');
    var oSnakeBody2 = factory.create('SnakeBody', 1, 1, 'lightgreen');

    snake.head = oSnakeHead;
    snake.tail = oSnakeBody2;

    //链表链接蛇
    oSnakeHead.next = oSnakeBody1;
    oSnakeHead.last = null;

    oSnakeBody1.next = oSnakeBody2;
    oSnakeBody1.last = oSnakeHead;

    oSnakeBody2.next = null;
    oSnakeBody2.last = oSnakeBody1

    //显示蛇
    ground.removeSquare(oSnakeHead.x, oSnakeHead.y);
    ground.appendSquare(oSnakeHead);
    ground.removeSquare(oSnakeBody1.x, oSnakeBody1.y);
    ground.appendSquare(oSnakeBody1);
    ground.removeSquare(oSnakeBody2.x, oSnakeBody2.y);
    ground.appendSquare(oSnakeBody2);

    //规定蛇的初始移动方向
    this.direction = DIRECTIONMENU.right;
}

snake.strategies = {
    move: function (snake, square, ground, eat) {
        // console.log('move')
        var newBody = factory.create('SnakeBody', snake.head.x, snake.head.y, 'lightgreen');
        //去掉头部插入新的身体
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        ground.removeSquare(snake.head.x, snake.head.y);
        ground.appendSquare(newBody)

        //在下一个方向添加头部
        var newHead = factory.create('SnakeHead', square.x, square.y, 'green');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.removeSquare( square.x, square.y);
        ground.appendSquare(newHead);

        if(!eat){ //没有吃  去掉尾巴
            var newFloor = factory.create('Floor', snake.tail.x, snake.tail.y, 'orange')
            ground.removeSquare(snake.tail.x, snake.tail.y);
            ground.appendSquare(newFloor);
            //更新蛇尾
            snake.tail.last.next = null;
            snake.tail = snake.tail.last;
        }
      
        //更新蛇头
        snake.head = newHead;
       
        //每次移动后根据分数改变蛇的速度

    },
    eat: function (snake, square, ground) {
        game.score++;
        game.changeSpeed(game.score);
        this.move(snake, square, ground, true)
        game.createFood(ground)
    },
    die: function (snake, square, ground){
        console.log('die')
        game.over();
    },
    add: function(snake, square, ground) {
        game.score += 3;
        game.changeSpeed(game.score)
        this.move(snake, square, ground, true)
        game.createFood(ground)
    },
    sub: function(snake, square, ground){
        var mustAdd = false;
        game.score++;
        game.changeSpeed(game.score);
        
        if(snake.tail.last.last == snake.head){
            mustAdd = true;
        }
        this.move(snake, square, ground);
       
        var newFloor = factory.create('Floor', snake.tail.x, snake.tail.y, 'orange')
        ground.removeSquare(snake.tail.x, snake.tail.y);
        ground.appendSquare(newFloor);
        //更新蛇尾
        snake.tail.last.next = null;
        snake.tail = snake.tail.last;

        game.createFood(ground, mustAdd)
    }
}
//根据蛇的移动方向判断下一个方块发出消息
snake.move = function (ground) {
    //this.head.x + this.direction.x    this.head.y + this.direction.y
    var nextX = this.head.x + this.direction.x;
    var nextY = this.head.y + this.direction.y;
    var square = ground.squareTable[nextY][nextX];
    if(this.strategies[square.act]) {
        this.strategies[square.act](this, square, ground)
    }
}


