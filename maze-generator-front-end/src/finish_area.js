class Finish {

    constructor(game) {
        this.game = game;
        this.width = game.finishAreaSize;
        this.height = game.finishAreaSize;
    }

    draw(ctx) {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.game.xOffset + this.game.mazeWidth - this.game.finishAreaSize - 1, 
            this.game.yOffset + this.game.mazeHeight - this.game.finishAreaSize - 1, this.width, this.height);
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
        if (this.collision() && this.game.coins.length == 0) {

            //  Set game end settings

            this.game.time = document.getElementById('timer_text').innerHTML;
            this.game.quit();
            //this.game.makeScore(this.game.userId, this.game.gameId, this.game.time.toString());
            this.game.interval = null;
            this.game.time = 0;
            console.log("finish area");

            //  Load next
            this.game.loadNextLevel();
        }
    }
}