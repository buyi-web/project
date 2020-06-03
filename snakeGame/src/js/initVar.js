//游戏场景的位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100

//每个方块单元的宽度
var SQUARE_WIDTH = 20;

//场景中行列  == 容纳的方块个数
var XLEN = 30;
var YLEN = 30;

//蛇移动时的时间间隔
var INTERVAL = 300;

//定义基类
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent  = dom || document.createElement('div');
}

// Square.prototype.touch = function(){

// }
//用于子类单例模式创建对象时数据的跟新
Square.prototype.update = function (x, y){
    this.x = x;
    this.y = y;
}

//定义子类  构造函数
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Food = tool.single(Square);
var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Ground = tool.single(Square);
//其他类
var Game = tool.single()
var Snake = tool.single();

//定义蛇头触碰的枚举
var TOUCHMENU = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die',
    ADD: 'add',
    SUB: 'sub',
}
