class InputHandler {
  constructor(cursor, game) {
    document.addEventListener("keydown", (event) => {
      if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      }
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
          game.start();
          break;
        case 27:
          game.pause();
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
