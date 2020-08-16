class InputHandler {
  constructor(cursor) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          cursor.moveLeft();
          break;
        case 39:
          cursor.moveRight();
          break;
        case 38:
          cursor.moveUp();
          break;
        case 40:
          cursor.moveDown();
          break;
        case 32:
          cursor.stopMoving();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (cursor.xSpeed < 0) cursor.stopX();
          break;
        case 39:
          if (cursor.xSpeed > 0) cursor.stopX();
          break;
        case 38:
          if (cursor.ySpeed < 0) cursor.stopY();
          break;
        case 40:
          if (cursor.ySpeed > 0) cursor.stopY();
          break;
      }
    });
  }
}
