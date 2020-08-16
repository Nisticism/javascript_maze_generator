class Coin {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.game = game;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#fae22a"
        ctx.fill();
    }
}