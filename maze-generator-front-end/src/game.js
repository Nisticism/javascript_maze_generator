class Game {
    constructor(mazeWidth, mazeHeight, xOffset, yOffset) {
      this.mazeWidth = mazeWidth;
      this.mazeHeight = mazeHeight;
      this.xOffset = xOffset;
      this.yOffset = yOffset;
    }
  
    start() {
  
      this.cursor = new Cursor(this);
      new InputHandler(this.cursor);
    }
  
    update(deltaTime) {
      this.cursor.update(deltaTime);
    }
  
    draw(ctx) {
      this.cursor.draw(ctx);
    }
  }
  