const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2, 
  GAMEOVER: 3
};

class Game {
    constructor(mazeWidth, mazeHeight, xOffset, yOffset, pathString, coinString, coinRadius, finishAreaSize, pathSize, gameId) {
      this.mazeWidth = mazeWidth;
      this.mazeHeight = mazeHeight;
      this.pathString = pathString;
      this.coinString = coinString;
      this.xOffset = xOffset;
      this.yOffset = yOffset;
      this.time = 0;
      this.gameId = gameId;

      this.pathSize = pathSize;
      this.coinRadius = coinRadius;
      this.finishAreaSize = finishAreaSize;

      this.paths = [];
      this.coins = [];
    }

    gameTimer(code) {
      var sec = this.time;
      if (code == 1) {
        let timer = setInterval(function() {document.getElementById('timer').innerHTML='00:'+sec; sec++}, 1000);
      } else {
        return sec;
      }
    }
  
    start() {
      this.gameTimer(1);
      this.gamestate = GAMESTATE.RUNNING;
      this.cursor = new Cursor(this);
      this.finish_area = new Finish(this);
      new InputHandler(this.cursor, this);
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
      if (this.gamestate == GAMESTATE.PAUSED) {
        this.time = this.gameTimer(2)
        console.log(this.time);
        return;
      }
      this.cursor.update(deltaTime);
      if (this.coins.length > 0) {
        //console.log("updating", this.coins.length, this.coins[0].position.x, this.coins[0].position.y, this.cursor.position.x, this.cursor.position.y);
        this.coins.forEach((coin) => coin.update(deltaTime));
      }
      this.finish_area.update(deltaTime);
    }
  
    draw(ctx) {
      this.gameObjects.forEach((object) => object.draw(ctx));
      if (this.gamestate == GAMESTATE.PAUSED) {
        ctx.rect(0,0,this.mazeWidth + this.xOffset * 2, this.mazeHeight + this.yOffset * 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", (this.mazeWidth + this.xOffset * 2)/2, this.mazeHeight/2);
      }

    }

    endLevel() {
      this.loadNextLevel();
      //alert("Congratulations, you've won!");
    }

    pause() {
      if (this.gamestate == GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }

    loadNextLevel() {
      this.gameId += 1;
      console.log("here");
      console.log(this.gameId);
      document.getElementById('maze_text').innerHTML=`Maze ${this.gameId}`

    }
  }
  