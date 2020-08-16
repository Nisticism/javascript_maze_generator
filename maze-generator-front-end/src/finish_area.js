class Finish {

    constructor(game) {
        this.x = game.xOffset + game.mazeWidth - game.finishAreaSize-1;
        this.y = game.yOffset + game.mazeHeight - game.finishAreaSize-1;
        this.xOffset = game.xOffset;
        this.yOffset = game.yOffset;
        this.width = game.finishAreaSize;
        this.height = game.finishAreaSize;
    }

    draw(ctx) {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}