class Finish {

    constructor(game) {
        this.game = game;
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

    collision() {
        if (this.game.cursor.position.x + this.game.cursor.width >= this.x && this.game.cursor.position.y + this.game.cursor.height >= this.y) {
            return true;
        }
    }

    update(deltaTime) {
        if (this.collision() && this.game.coins.length == 0) {
            this.game.endLevel();
        }
    }
}