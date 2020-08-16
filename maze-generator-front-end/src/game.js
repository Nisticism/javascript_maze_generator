class Game {
    constructor(mazeWidth, mazeHeight, xOffset, yOffset, pathString, coinString, coinRadius, finishAreaSize, pathSize) {
      this.mazeWidth = mazeWidth;
      this.mazeHeight = mazeHeight;
      this.pathString = pathString;
      this.coinString = coinString;
      this.xOffset = xOffset;
      this.yOffset = yOffset;

      this.pathSize = pathSize;
      this.coinRadius = coinRadius;
      this.finishAreaSize = finishAreaSize;

      this.paths = [];
      this.coins = [];
    }
  
    start() {
      this.cursor = new Cursor(this);
      this.finish_area = new Finish(this);
      new InputHandler(this.cursor);
      this.addPaths(this.pathString);
      this.addCoins(this.coinString);
      this.gameObjects = []
      this.paths.forEach((path) => this.gameObjects.push(path));
      this.coins.forEach((coin) => this.gameObjects.push(coin));
      this.gameObjects.push(this.finish_area);
      this.gameObjects.push(this.cursor);

    }

    addPaths(pathString) {
      let paths = pathString.split(" ");
      
      var i;
      for (i = 0; i < paths.length; i ++) {
        this.paths.push(new Path(parseInt(paths[i]), (parseInt(paths[i + 1]) + 1), this))
        i += 1;
      }
    }

    addCoins(coinString) {
      let coins = coinString.split(" ");
      
      var i;
      for (i = 0; i < coins.length; i ++) {
        this.coins.push(new Coin((parseInt(coins[i]) + this.coinRadius), (parseInt(coins[i + 1]) + this.coinRadius), this))
        i += 1;
      }
    }
  
    update(deltaTime) {
      this.cursor.update(deltaTime);
    }
  
    draw(ctx) {
      this.gameObjects.forEach((object) => object.draw(ctx));
    }
  }
  