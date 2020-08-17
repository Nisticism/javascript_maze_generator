class Path {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = game.pathSize;
        this.height = game.pathSize;
        this.position = {
            x: this.game.xOffset + this.x,
            y: this.game.yOffset + this.y
        };
    }

    draw(ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.position.x + 1, this.position.y + 1, this.width - 1, this.height - 1);
    }
}