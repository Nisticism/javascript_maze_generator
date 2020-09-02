class Cursor {
  constructor(game) {
    this.game = game;
    this.mazeWidth = game.mazeWidth;
    this.mazeHeight = game.mazeHeight;
    this.xOffset = game.xOffset;
    this.yOffset = game.yOffset;
    this.width = 20;
    this.height = 20;
    this.maxSpeed = this.game.cursorSpeed;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.blocks = game.blocks;

    this.position = {
      x: this.xOffset + game.startAreaWidth/2 - this.width/2,
      y: this.yOffset + game.startAreaWidth/2 - this.height/2
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
    ctx.fillRect(this.position.x + 1, this.position.y + 1, this.width - 1, this.height - 1);
  }

  update(deltaTime) {
    this.xOffset = this.game.xOffset;
    this.yOffset = this.game.yOffset;
    this.mazeWidth = this.game.mazeWidth;
    this.mazeHeight = this.game.mazeHeight;
    this.position.x += this.xSpeed;
    this.position.y += this.ySpeed;
    this.maxSpeed = this.game.cursorSpeed;

    //  ----------  Collision  ----------
    //  Maze Walls 

    if (this.position.x < 0 + this.xOffset) this.position.x = this.xOffset;
    if (this.position.y < 0 + this.yOffset) this.position.y = this.yOffset;
    if (this.position.x > this.mazeWidth - this.width + this.xOffset)
      this.position.x = this.mazeWidth - this.width + this.xOffset;
    if (this.position.y > this.mazeHeight - this.height + this.yOffset)
      this.position.y = this.mazeHeight - this.height + this.yOffset;

    //  Path and Coins
    this.game.paths.forEach((path) => this.collidePath(path))
  }

  isAboveAndBordering(path) {
    //  The bottom of the cursor is greater than or equal to the path block top, and the top of the cursor is less than the block top
    if (this.position.y + this.height >= path.y + this.yOffset && this.position.y + this.height <= path.y + this.yOffset + this.ySpeed && this.position.y < path.y + this.yOffset && 
      //  The front of the cursor is less than or equal to the back of the path block, and the front of the cursor is greater than the front of the path block
      ((this.position.x < (path.x + path.width + this.xOffset) && this.position.x > path.x + this.xOffset) || 
      //  The back of the cursor is less than the back of the path block, and the back of the cursor is greater than the front of the path block
      (this.position.x + this.width < (path.x + path.width + this.xOffset) && this.position.x + this.width > path.x + this.xOffset) ||
      //  The front of the cursor is less than the front of the path block and the back of the cursor is greater than the back of the path block
      (this.position.x <= (path.x + this.xOffset) && this.position.x + this.width >= (path.x + path.width + this.xOffset))
      )
      ) {
        return true;
      }
  }

  isBelowAndBordering(path) {
    //  The top of the cursor is less than or equal to the bottom of the path block, and the bottom of the cursor is greater than the bottom of the path block
    if (this.position.y < path.y + this.yOffset + path.height && this.position.y > path.y + this.yOffset - this.ySpeed && this.position.y + this.height > path.y + path.height + this.yOffset && 
      ((this.position.x < (path.x + path.width + this.xOffset) && this.position.x > path.x + this.xOffset) || 
      (this.position.x + this.width < (path.x + path.width + this.xOffset) && this.position.x + this.width > path.x + this.xOffset) ||
      (this.position.x <= (path.x + this.xOffset) && this.position.x + this.width >= (path.x + path.width + this.xOffset))
      )
      ) {
        return true;
      }
  }

  isLeftAndBordering(path) {
    if (this.position.x + this.width >= path.x + this.xOffset && this.position.x + this.width <= path.x + this.xOffset + this.xSpeed && this.position.x < path.x + this.xOffset && 
      ((this.position.y < (path.y + path.height + this.yOffset) && this.position.y > path.y + this.yOffset) || 
      (this.position.y + this.height < (path.y + path.height + this.yOffset) && this.position.y + this.height > path.y + this.yOffset) ||
      (this.position.y <= (path.y + this.yOffset) && this.position.y + this.height >= (path.y + path.height + this.yOffset))
      )
      ) {
        return true;
      }
  }

  isRightAndBordering(path) {
    if (this.position.x <= path.x + path.width + this.xOffset && this.position.x >= path.x + this.xOffset - this.xSpeed  && this.position.x + this.width > path.x + path.width + this.xOffset && 
      ((this.position.y < (path.y + path.height + this.yOffset) && this.position.y > path.y + this.yOffset) || 
      (this.position.y + this.height < (path.y + path.height + this.yOffset) && this.position.y + this.height > path.y + this.yOffset) ||
      (this.position.y <= (path.y + this.yOffset) && this.position.y + this.height >= (path.y + path.height + this.yOffset))
      )
      ) {
        return true;
      }
  }



  collidePath(path) {
  
    //  Top sides of paths
    if (this.isAboveAndBordering(path) && this.ySpeed > 0) {
      this.position.y = path.y + this.yOffset - this.height;
    }
    //  Bottom sides of paths
    if (this.isBelowAndBordering(path) && this.ySpeed < 0) {
      this.position.y = path.y + this.yOffset + path.height;
    }

    //  Next to and moving right
    if (this.isLeftAndBordering(path) && this.xSpeed > 0) {
      this.position.x = path.x + this.xOffset - this.width;
    }
    //  Next to and moving left
    if (this.isRightAndBordering(path) && this.xSpeed < 0) {
      this.position.x = path.x + this.xOffset + path.width;
    }
    
  }

}
