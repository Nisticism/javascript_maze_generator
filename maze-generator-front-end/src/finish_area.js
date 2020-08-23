class Finish {

    constructor(game) {
        this.game = game;
        this.width = game.finishAreaSize;
        this.height = game.finishAreaSize;
    }

    draw(ctx) {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.game.xOffset + this.game.mazeWidth - this.game.finishAreaSize, 
            this.game.yOffset + this.game.mazeHeight - this.game.finishAreaSize, this.width, this.height);
    }

    collision() {
        if (this.game.cursor.position.x + this.game.cursor.width >= (this.game.xOffset + this.game.mazeWidth - this.game.finishAreaSize - 1) 
        && this.game.cursor.position.y + this.game.cursor.height >= (this.game.yOffset + this.game.mazeHeight - this.game.finishAreaSize - 1)) {
            return true;
        }
    }

    update(deltaTime) {
        this.width = this.game.finishAreaSize;
        this.height = this.game.finishAreaSize;
    }
}