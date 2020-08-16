class Path {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.xOffset = game.xOffset;
        this.yOffset = game.yOffset;
        this.width = game.pathSize;
        this.height = game.pathSize;
    }

    draw(ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.x + this.xOffset, this.y + this.yOffset, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 1 + this.xOffset, this.y + 1 + this.yOffset, this.width - 1, this.height - 1);
    }
}