class Path {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
    }

    draw(ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
    }
}