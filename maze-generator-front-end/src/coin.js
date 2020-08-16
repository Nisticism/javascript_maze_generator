class Coin {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 8;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#fae22a"
        ctx.fill();
    }
}