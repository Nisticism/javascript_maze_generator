class Path {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = game.pathSize;
        this.height = game.pathSize;
    }

    draw(ctx) {
        ctx.fillStyle = '#733700'
        ctx.fillRect(this.x + this.game.xOffset, this.y + this.game.yOffset, this.game.pathSize, this.game.pathSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + this.game.xOffset + 1, this.y + this.game.yOffset + 1, this.game.pathSize - 1, this.game.pathSize - 1);
    }
}