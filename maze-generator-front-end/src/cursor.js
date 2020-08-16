class Cursor {
  constructor(game) {
    this.mazeWidth = game.mazeWidth;
    this.mazeHeight = game.mazeHeight;
    this.xOffset = game.xOffset;
    this.yOffset = game.yOffset;
    this.width = 20;
    this.height = 20;
    this.maxSpeed = 4;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.blocks = game.blocks;

    this.position = {
      x: this.xOffset + 20,
      y: this.yOffset + 20,
    };
  }

  moveLeft() {
    this.xSpeed = -this.maxSpeed;
  }
  moveRight() {
    this.xSpeed = this.maxSpeed;
  }
  moveUp() {
    this.ySpeed = -this.maxSpeed;
  }
  moveDown() {
    this.ySpeed = this.maxSpeed;
  }
  stopX() {
    this.xSpeed = 0;
  }
  stopY() {
    this.ySpeed = 0;
  }
  stopMoving() {
    this.stopX();
    this.stopY();
  }

  draw(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.xSpeed;
    this.position.y += this.ySpeed;

    if (this.position.x < 0 + this.xOffset) this.position.x = 0 + this.xOffset;
    if (this.position.y < 0 + this.yOffset) this.position.y = 0 + this.yOffset;
    if (this.position.x > this.mazeWidth - this.width - this.xOffset)
      this.position.x = this.mazeWidth - this.width - this.xOffset;
    if (this.position.y > this.mazeHeight - this.height - this.yOffset)
      this.position.y = this.mazeHeight - this.height - this.yOffset;

    //  Collision

    let startX = this.position.x;
    let startY = this.position.y;
    let endX = this.position.x + this.width;
    let endY = this.position.y + this.height;

    // if x < start block and > end block, and y is < top block and > bot block
    // then stop moving in that direction
  }
}
