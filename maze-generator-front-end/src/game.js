const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2, 
  GAMEOVER: 3
};

class Game {
    constructor(mazeWidth, mazeHeight, xOffset, yOffset, pathString, coinString, coinRadius, 
      finishAreaSize, pathSize, gameId, startAreaWidth, startAreaHeight, maxMazes, cursorSpeed, userId, gameArray) {
      this.mazeWidth = mazeWidth;
      this.mazeHeight = mazeHeight;
      this.pathString = pathString;
      this.coinString = coinString;
      this.xOffset = xOffset;
      this.yOffset = yOffset;
      this.time = 0;
      this.gameId = gameId;
      this.startAreaWidth = startAreaWidth;
      this.startAreaHeight = startAreaHeight;
      this.maxMazes = maxMazes;
      this.gameArray = gameArray;
      this.gameIndex = gameId - 1;
      this.cursorSpeed = cursorSpeed;
      this.userId = userId;

      this.pathSize = pathSize;
      this.coinRadius = coinRadius;
      this.finishAreaSize = finishAreaSize;

      this.paths = [];
      this.coins = [];

      this.gamestate = GAMESTATE.MENU;
      this.cursor = new Cursor(this);
      this.finish_area = new Finish(this);

      new InputHandler(this.cursor, this);

      this.gameObjects = [];
      this.scoresJson = [];
      let sec = this.time;
      let interval = null;
      
    }
  
    start() {
      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.RUNNING) return
      //  Start the timer
      var sec = 0;
      document.getElementById('timer_text').innerHTML = sec.toFixed(1);
      this.interval = setInterval(function() {document.getElementById('timer_text').innerHTML = '' + ((parseInt(sec))/10).toFixed(1); sec++}, 100);
      //  Always start in the middle of the start area
      this.cursor.position.x = this.xOffset + this.startAreaWidth/2 - this.cursor.width/2;
      this.cursor.position.y = this.yOffset + this.startAreaHeight/2 - this.cursor.height/2;

      this.addPaths(this.pathString);
      this.addCoins(this.coinString);
      this.gameObjects = []
      this.paths.forEach((path) => this.gameObjects.push(path));
      this.coins.forEach((coin) => this.gameObjects.push(coin));
      this.gameObjects.push(this.finish_area);
      this.gameObjects.push(this.cursor);

      this.gamestate = GAMESTATE.RUNNING;

    }

    addPaths(pathString) {
      let paths = pathString.split(" ");
      
      var i;
      if (pathString != "") {
        for (i = 0; i < paths.length; i ++) {
          this.paths.push(new Path(parseInt(paths[i]), (parseInt(paths[i + 1]) + 1), this))
          i += 1;
        }
      }
    }

    addCoins(coinString) {
      let coins = coinString.split(" ");
      
      var i;
      if (coinString != "") {
        for (i = 0; i < coins.length; i ++) {
          this.coins.push(new Coin((parseInt(coins[i]) + this.coinRadius), (parseInt(coins[i + 1]) + this.coinRadius), this))
          i += 1;
        }
      }
    }
  
    update(deltaTime) {
      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU) {
        this.time = parseInt(document.getElementById('timer_text').innerHTML)
        if (this.gamestate === GAMESTATE.MENU) {
          document.getElementById('timer_text').innerHTML = "Time"
        }
        return;
      }
      this.cursor.update(deltaTime);

      //  Check if all the coins are gone
      if (this.coins.length > 0) {
        this.coins.forEach((coin) => coin.update(deltaTime));
      } else
      if (this.coins.length <= 0 && this.finish_area.collision()) {
        //  Load next
        this.loadNextLevel();
        this.finish_area.update(deltaTime);
      }

    }
  
    draw(ctx) {
      document.getElementById('maze_text').innerHTML=`Maze ${this.gameId}`
      this.drawMazeBorder(ctx);
      this.drawStartingArea(ctx);
      this.gameObjects.forEach((object) => object.draw(ctx));

      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.rect(0,0,this.mazeWidth + this.xOffset * 2, this.mazeHeight + this.yOffset * 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", (this.mazeWidth + this.xOffset * 2)/2, this.mazeHeight/2);
      }

      if (this.gamestate === GAMESTATE.MENU) {
        ctx.rect(0,0,this.mazeWidth + this.xOffset * 2, this.mazeHeight + this.yOffset * 2);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`LEVEL ${this.gameId }`, (this.mazeWidth + this.xOffset * 2)/2, this.mazeHeight/2);
        ctx.fillText("Press SPACEBAR to Start", (this.mazeWidth + this.xOffset * 2)/2, (this.mazeHeight + this.yOffset * 2)/2);
        document.getElementById("timer_text").innerHTML =  "Time"
      }

      if (this.gamestate === GAMESTATE.GAMEOVER) {
        ctx.rect(0,0,this.mazeWidth + this.xOffset * 2, this.mazeHeight + this.yOffset * 2);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        document.getElementById('maze_text').innerHTML=`The End`
        ctx.fillText("Congrats, you beat the game!", (this.mazeWidth + this.xOffset * 2)/2, this.mazeHeight/2);
        ctx.fillText("Press SPACEBAR to Play Again", (this.mazeWidth + this.xOffset * 2)/2, (this.mazeHeight + this.yOffset * 2)/2);
      }
    }

    drawMazeBorder(ctx) {
      ctx.strokeStyle="white"
      ctx.lineWidth = 2;
      ctx.strokeRect(this.xOffset - 1, this.yOffset - 1, this.mazeWidth + 3, this.mazeHeight + 3);
    }
    
    drawStartingArea(ctx) {
      ctx.fillStyle = "gray"
      ctx.fillRect(this.xOffset, this.yOffset, this.startAreaWidth, this.startAreaHeight);
    }


    pause() {
      if (this.gamestate == GAMESTATE.MENU) return;
      if (this.gamestate == GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
        var text = document.getElementById('timer_text').innerHTML
        if (text == "Text") {
          var sec = 0;
        } 
        
        else {
          var sec = parseFloat(document.getElementById('timer_text').innerHTML) + 0.1;
        }
        this.interval = setInterval(function() {document.getElementById('timer_text').innerHTML = '' + (sec).toFixed(1); sec += 0.1}, 100);

      } else {
        this.gamestate = GAMESTATE.PAUSED;
        clearInterval(this.interval);
      }
    }

    makeScore (userId, gameId, time) {
      fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          time: time,
          user_id: userId,
          maze_id: gameId
        })
      }).then((res) => res.json())
      .catch(error => console.log('ERROR'))
    };

    loadScores = () => {
      fetch('http://localhost:3000/scores')
        .then((res) => res.json())
        .then((json) => {
          console.log(JSON.stringify(json));
        });
    };

    loadNextLevel(option) {

      if (this.gamestate == GAMESTATE.GAMEOVER) return;
        //  Making a score
        clearInterval(this.interval);
        this.time = document.getElementById('timer_text').innerHTML;
        this.makeScore(this.userId, this.gameId, this.time);
        if (this.GAMESTATE != GAMESTATE.GAMEOVER) {

        document.getElementById('timer_text').innerHTML = "Time"
        this.gameObjects = []
        this.gameIndex += 1;
        this.paths = [];
        this.coins = [];

      }

      if (this.gameIndex >= this.maxMazes) {
        this.gamestate = GAMESTATE.GAMEOVER;
        this.gameIndex = 0;
      }
      let gameArray = this.gameArray;

      //  Set all the new properties
      this.mazeWidth = gameArray[this.gameIndex][0];
      this.mazeHeight = gameArray[this.gameIndex][1];
      this.xOffset = gameArray[this.gameIndex][2];
      this.yOffset = gameArray[this.gameIndex][3];
      this.pathString = gameArray[this.gameIndex][4];
      this.coinString = gameArray[this.gameIndex][5];
      this.coinRadius = gameArray[this.gameIndex][6];
      this.finishAreaSize = gameArray[this.gameIndex][7];
      this.pathSize = gameArray[this.gameIndex][8];
      this.gameId = gameArray[this.gameIndex][9];
      this.startAreaWidth = gameArray[this.gameIndex][10];
      this.startAreaHeight = gameArray[this.gameIndex][11];
      this.maxMazes = gameArray[this.gameIndex][12];
      this.interval = null;
      this.time = 0;

        if (this.gamestate != GAMESTATE.GAMEOVER) {
          this.gamestate = GAMESTATE.MENU;
        }


    }

    quit() {
      clearInterval(this.interval);
      this.time = 0;
      this.interval = null;

    }
  }
  