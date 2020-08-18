class Coin {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.radius = 7;
        this.game = game;
        this.position = {
            x: this.game.xOffset + this.radius + this.x,
            y: this.game.yOffset + this.radius + this.y
        };
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#fae22a"
        ctx.fill();
    }

    collision() {
        //  If the distance between the center of the cursor and the center of the circle becomes less than
        //  the radius of the circle plus half the size of the cursor, collect the coin
        //  a^2 + b^2 = c^2.  a = cursorX - coinX.  b = cursorY - coinY

        let a_distance = (this.game.cursor.position.x + this.game.cursor.width/2) - (this.position.x)
        let b_distance = (this.game.cursor.position.y + this.game.cursor.height/2) - (this.position.y)
        let c_distance = Math.sqrt(Math.pow(a_distance, 2) + Math.pow(b_distance, 2))

        let objects_distance = this.radius + this.game.cursor.width/2

        if (c_distance <= objects_distance) {
            return true;
        }
    }

    update(deltaTime) {
        if (this.collision()) {
            var index = this.game.coins.indexOf(this);
            this.game.coins.splice(index, 1);
            var index = this.game.gameObjects.indexOf(this);
            this.game.gameObjects.splice(index, 1);
        }
    }


}