//引入工厂模式创建子类
function SquareFactory(){

}

SquareFactory.prototype.create = function(type, x, y, color){
    if(typeof SquareFactory.prototype[type] == undefined){
        throw 'no type'
    }
    //判断子类工厂的原型有没有继承父类工厂
    if(SquareFactory.prototype[type].prototype.__porto__ != SquareFactory.prototype){
        SquareFactory.prototype[type].prototype = SquareFactory.prototype;
    }
    var newSquare = new SquareFactory.prototype[type](x, y, color)
    return newSquare;
}

//子类实例对象的基本样式初始化设置
SquareFactory.prototype.init = function (square, color, strategyMsg) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * SQUARE_WIDTH + 'px';
    square.viewContent.style.top = square.y * SQUARE_WIDTH + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.background = color;
    square.act = strategyMsg;
}

//子类工厂
SquareFactory.prototype.Floor = function(x, y, color){
    var obj = new Floor(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(obj, color, TOUCHMENU.MOVE)
    return obj;
}
SquareFactory.prototype.Stone = function(x, y, color){
    var obj = new Stone(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(obj, color, TOUCHMENU.DIE)
    return obj;
}
SquareFactory.prototype.Food = function(x, y, color){
    var obj = new Food(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    obj.update(x, y)
    this.init(obj, color, TOUCHMENU.EAT)
    return obj;
}
SquareFactory.prototype.LevelAdd = function(x, y, color){
    var obj = new Food(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    obj.update(x, y)
    this.init(obj, color, TOUCHMENU.ADD)
    return obj;
}
SquareFactory.prototype.SnakeHead = function(x, y, color){
    var obj = new SnakeHead(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    obj.update(x, y)
    this.init(obj, color, TOUCHMENU.DIE)
    return obj;
}
SquareFactory.prototype.SnakeBody = function(x, y, color){
    var obj = new SnakeBody(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    this.init(obj, color, TOUCHMENU.DIE)
    return obj;
}

var factory = new SquareFactory()