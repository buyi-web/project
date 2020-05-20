var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUARE_WIDTH, YLEN * SQUARE_WIDTH);

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.background = '#0ff';

    this.squareTable = [];
    //创建地板 和 墙  i==y行  j==x列
    for (var i = 0; i < YLEN; i++) {
        this.squareTable[i] = new Array(XLEN);
        for (var j = 0; j < XLEN; j++) {
            var newSquare = null;
            if (j == 0 || j == XLEN - 1 || i == 0 || i == YLEN - 1) {
                //创建墙
                newSquare = factory.create('Stone', j, i, 'black');
            } else {
                //创建地板
                newSquare = factory.create('Floor', j, i, 'orange')
            }
            // console.log(newSquare)
            this.squareTable[i][j] = newSquare;//数据上存储
            this.viewContent.appendChild(newSquare.viewContent);//视图上显示
        }

    }
    document.body.appendChild(this.viewContent);
}
//拆方块
ground.removeSquare = function (x, y){ 
    //视图和数据上都要处理
    this.viewContent.removeChild(this.squareTable[y][x].viewContent)
    this.squareTable[y][x] = null;
}
//按方块
ground.appendSquare = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.squareTable[square.y][square.x] = square;
}



