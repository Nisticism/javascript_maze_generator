//import Cursor from '/src/cursor.js';

const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/users/`;
const FIND_OR_CREATE = `${BASE_URL}/find_or_create`;
const SCORES = `${BASE_URL}/scores`;
const canvas = document.getElementById("mazeScreen");
const ctx = canvas.getContext("2d");

const main = document.querySelector("main");

let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 800;

let username = null;
let userId = null;

let gameArray = [];
let loggedIn = false;
let uiSwitch = false;
let userInfo = [];
let userSpaceDisplay = document.createElement("section");
let userSpace = document.getElementById("userSpace");

const setLogInButton = () => {
  if (userId) {
    console.log("booting up, logged in");
    setListenerForLogout();
  } else {
    console.log("booting up, not logged in");
    gameArray = [];
    setListenerForLogin();
  }
  refreshUI();
};

function refreshUI() {
  console.log("@@refresh", userId);
  if (userId) {
    setLoggedInUI();
  } else {
    setLoggedOutUI();
  }
}

function setListenerForLogin() {
  document.getElementById("logInButton").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("@@clickedWhenLoggedOut");
    username = document.getElementById("logInField").value;
    makeOrGetUser(username);
    refreshUI();
    var old_element = document.getElementById("logInButton");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    setListenerForLogout();
    console.log("listenerSet");
    refreshUI();
  });
}

function setListenerForLogout() {
  document.getElementById("logInButton").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("@@clickedWhenLoggedIn");
    gameArray = [];
    userId = null;
    refreshUI();
    var old_element = document.getElementById("logInButton");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    setListenerForLogin();
    console.log("listenerForLogOut set");
    refreshUI();
  });
}

function setLoggedOutUI() {
  while (userSpaceDisplay.hasChildNodes()) {
    userSpaceDisplay.removeChild(userSpaceDisplay.firstChild);
  }
  console.log("Log out UI set");
  document.getElementById("timer_text").style.display = "none";
  document.getElementById("logInButton").innerHTML = "Log in";
  document.getElementById("userInfo").style.display = "none";
  document.getElementById("logInField").style.display = "inline-block";
  document.getElementById("play").innerHTML = "Log in";
  document.getElementById("scores").style.display = "none";
  document.getElementById("usernameText").style.display = "inline";
  uiSwitch = false;
}

function setLoggedInUI() {
  while (userSpaceDisplay.hasChildNodes()) {
    userSpaceDisplay.removeChild(userSpaceDisplay.firstChild);
  }
  document.getElementById("userInfo").style.display = "block";
  document.getElementById("timer_text").style.display = "block";
  document.getElementById("logInButton").innerHTML = "Log out";
  document.getElementById("userSpace").style.display = "block";
  document.getElementById("userInfo").innerHTML = `Welcome ${username}!`;
  document.getElementById("logInField").value = "";
  document.getElementById("logInField").style.display = "none";
  document.getElementById("usernameText").style.display = "none";
  document.getElementById("play").innerHTML = "Play";
  document.getElementById("scores").style.display = "block";

  console.log("loggedin");
}

function setListeners() {
  document.getElementById("scores").addEventListener("click", (event) => {
    event.preventDefault();
    var scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    loadUserScores(userId);
  });
  document.getElementById("play").addEventListener("click", (event) => {
    event.preventDefault();
    if (!userId) {
      while (userSpaceDisplay.hasChildNodes()) {
        userSpaceDisplay.removeChild(userSpaceDisplay.firstChild);
      }
      let p = document.createElement("p");
      p.innerHTML = "Please log in to play";
      p.style.color = "white";
      p.style.textAlign = "center";
      userSpaceDisplay.appendChild(p);
      userSpace = document.getElementById("userSpace");
      userSpace.appendChild(userSpaceDisplay);
      console.log("clicked1");
    }
  });
  document.getElementById("leaderboard").addEventListener("click", (event) => {
    event.preventDefault();
    //  scroll down
    var scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    loadScores();
  });
  document.getElementById("browseMazes").addEventListener("click", (event) => {
    event.preventDefault();
  });
}

setListeners();
setLogInButton();

const makeOrGetUser = (username) => {
  fetch(`${FIND_OR_CREATE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => (userId = data.id))
    .then((userId) => console.log(userId))
    .then(loadMazes())
    .catch((error) => console.log(error));
};

const loadMazes = () => {
  fetch(MAZES)
    .then((res) => res.json())
    .then((json) => {
      setMazeData(json);
    });
};

const loadScores = () => {
  fetch(SCORES)
    .then((res) => res.json())
    .then((json) => {
      setScoresData(json);
    });
};

const loadUserScores = (id) => {
  console.log("@@@@@ userscores")
  fetch(`${PROFILE}/${id}`)
    .then((res) => res.json())
    .then((json) => {
      setUserInfo(json);
    });
};

function setUserInfo(json) {
  console.log("@@@@@ settingUserInfo")
  userInfo[0] = json.id;
  userInfo[1] = json.username;
  userInfo[2] = json.mazes;
  userInfo[3] = json.scores;
  console.log("@@@@@" + userInfo);
  console.log("@@@@@ about to render the user...");
  renderUser();
}

function setScoresData(json) {
  let scoresArray = [];
  for (let i = 0; i < json.length; i++) {
    var scores_array = [
      parseInt(json[i].maze_id),
      json[i].username,
      json[i].time,
      parseInt(json[i].user_id),
      json[i].created_at,
    ];
    scoresArray.push(scores_array);
  }
  console.log(scoresArray);
  renderScoresData(scoresArray);
}

function sortFunction(a, b) {
  if (parseFloat(a[1]) === parseFloat(b[1])) {
    return 1;
  } else {
    return parseFloat(a[1]) < parseFloat(b[1]) ? -1 : 1;
  }
}

function nestedSort(nestedArray) {
  return nestedArray.sort(sortFunction);
}

function renderScoresData(scoresArray) {
  document.getElementById("userInfo").style.display = "none";
  //  Remove anything from the section
  while (userSpaceDisplay.hasChildNodes()) {
    userSpaceDisplay.removeChild(userSpaceDisplay.firstChild);
  }

  document.getElementById("userSpace").style.display = "block";
  let p = document.createElement("p");
  p.innerHTML = "Leaderboard";
  p.style.textAlign = "center";
  p.style.color = "white";
  userSpaceDisplay.appendChild(p);
  console.log(scoresArray[0][1]);
  let idMap = new Map();
  console.log(scoresArray);

  //  Make a map of the mazes

  for (let i = 0; i < scoresArray.length; i++) {
    let tempArray = scoresArray[i];
    let score = [tempArray[1], tempArray[2], tempArray[4]];
    if (!idMap.get(parseInt(tempArray))) {
      idMap.set(parseInt(tempArray[0]), []);
    }
    idMap.get(parseInt(tempArray)).push(score);
  }

  //  Iterate over each maze

  for (let i = 0; i < idMap.size; i++) {
    let ul = document.createElement("ul");
    ul.innerHTML = "Maze " + (i + 1);
    userSpaceDisplay.appendChild(ul);
    ul.setAttribute("id", "scores");
    console.log(idMap.get(i + 1)[1]);

    //  Sort the scores
    nestedSort(idMap.get(i + 1));

    //  Render the scores
    for (let scores = 0; scores < 5; scores++) {
      if (idMap.get(i + 1)[scores]) {
        let li = document.createElement("li");
        li.setAttribute("id", "score");
        li.style.color = "white";
        let liText = document.createTextNode(
          scores +
            1 +
            ".... " +
            idMap.get(i + 1)[scores][0] +
            ".... Time: " +
            idMap.get(i + 1)[scores][1] +
            ".... Date: " +
            idMap.get(i + 1)[scores][2].substring(0, 10)
        );
        li.appendChild(liText);
        ul.appendChild(li);
      }
    }
  }
  console.log("rendering scores");
  userSpace.appendChild(userSpaceDisplay);
}

const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

function renderUser() {
  //  Remove anything from the section
  document.getElementById("userInfo").style.display = "none";
  while (userSpaceDisplay.hasChildNodes()) {
    userSpaceDisplay.removeChild(userSpaceDisplay.firstChild);
  }

  document.getElementById("userSpace").style.display = "block";
  let p = document.createElement("p");
  p.innerHTML = "Your scores";
  p.style.textAlign = "center";
  p.style.color = "white";
  userSpaceDisplay.appendChild(p);
  console.log("@@@@@" + userInfo[2]);

  // userInfo[2] = mazes, 3 = scores
  console.log("@@@@@" + " maze arrays" + userInfo[2][0].id)
  console.log("@@@@@" + " maze arrays" + userInfo[2][1].id)
  console.log("@@@@@" + " maze arrays" + userInfo[2][2].id)
  let maze_ids = []
  for (let i = 0; i < userInfo[2].length; i ++) {
    maze_ids.push(userInfo[2][i].id)
  }
  maze_ids = maze_ids.filter(distinct)
  for (let i = 0; i < maze_ids.length; i++) {
    let ul = document.createElement("ul");
    let score_subtitle = "Maze " + userInfo[2][i].id
    ul.innerHTML = score_subtitle
    ul.setAttribute("id", "scores")
    userSpaceDisplay.appendChild(ul)
    console.log("@@@@@" + userInfo[3].length);
    let tempArray = []
    for (let j = 0; j < userInfo[3].length; j++) {
      console.log("@@@@@ temparray" + tempArray)
      console.log("@@@@@ each score" + userInfo[3][j].time + " " + userInfo[3][j].created_at);
      if (userInfo[3][j].maze_id == userInfo[2][i].id) {
        let score = []
        score.push(userInfo[3][j].created_at)
        score.push(parseFloat(userInfo[3][j].time))
        console.log("@@@@@" + userInfo[3][j].time);
        console.log("@@@@@" + userInfo[3][j].created_at);
        tempArray.push(score)
      }
    }
    
    nestedSort(tempArray);
    console.log("@@@@@" + tempArray);
    for (let j = 0; j < tempArray.length; j ++) {
      let li = document.createElement("li")
      li.setAttribute("id", "score")
      li.innerHTML = (j + 1) + "....  " + tempArray[j][1] + " seconds......Date: " + tempArray[j][0].substring(0, 10)
      ul.appendChild(li) 
    }
    
  }

  console.log("@@@@@ rendering user scores");
  userSpaceDisplay.style.display = "block"
  userSpace.appendChild(userSpaceDisplay);
}

let MAZE_WIDTH = 800;
let MAZE_HEIGHT = 600;
let PATH_SIZE = 10;
let COIN_RADIUS = 8;
let STARTING_AREA_WIDTH = 50;
let STARTING_AREA_HEIGHT = 50;
let FINISH_AREA_SIZE = 50;
let MAZE_X_CONSTANT = (CANVAS_WIDTH - MAZE_WIDTH) / 2;
let MAZE_Y_CONSTANT = (CANVAS_HEIGHT - MAZE_HEIGHT) / 2;
let CURSOR_SPEED = 4;
let games = [];
let game = null;

let testPaths =
  "0 60 10 60 20 60 30 60 40 60 60 0 60 10 60 20 60 30 70 30 80 30 80 40 80 50 80 60 80 70 80 110 80 120 80 130 80 140 80 150 70 130 90 110 100 110 110 110 120 110 " +
  "40 70 40 80 40 90 40 100 30 100 30 110 30 120 30 130 30 140 30 150 30 160 " +
  "120 100 120 90 120 80 120 70 120 60 120 50 120 40 120 30 120 20 120 10 120 0";
let testCoins = "65 5 165 45 265 5 215 25 15 85 185 270";

let testPaths2 = "";
let testCoins2 = "50 50";

function setMazeData(json) {
  games = [];
  for (let i = 0; i < json.length; i++) {
    var new_array = [
      parseInt(json[i].width * PATH_SIZE),
      parseInt(json[i].height * PATH_SIZE),
      (CANVAS_WIDTH - json[i].width * PATH_SIZE) / 2,
      (CANVAS_HEIGHT - json[i].height * PATH_SIZE) / 2,
      json[i].paths,
      testCoins,
      COIN_RADIUS,
      FINISH_AREA_SIZE,
      PATH_SIZE,
      parseInt(JSON.stringify(json[i].id)),
      STARTING_AREA_WIDTH,
      STARTING_AREA_HEIGHT,
      json.length,
      CURSOR_SPEED,
    ];
    if (userId) {
      gameArray.push(new_array);
    }
  }
  console.log(gameArray);
  game = createGame(0);
  requestAnimationFrame(gameLoop);
}

function createGame(gameId) {
  console.log(gameArray);
  let new_game = new Game(
    gameArray[gameId][0],
    gameArray[gameId][1],
    gameArray[gameId][2],
    gameArray[gameId][3],
    gameArray[gameId][4],
    gameArray[gameId][5],
    gameArray[gameId][6],
    gameArray[gameId][7],
    gameArray[gameId][8],
    gameArray[gameId][9],
    gameArray[gameId][10],
    gameArray[gameId][11],
    gameArray[gameId][12],
    gameArray[gameId][13],
    userId,
    gameArray
  );
  return new_game;
}

let lastTime = 0;

function gameLoop(timestamp) {
  console.log(`@@@${userId}`);
  //setLogInButton();
  if (userId) {
    console.log(`@@${uiSwitch}`);
    if (!uiSwitch) {
      console.log("uiSwitched");
      uiSwitch = true;
      refreshUI();
    }
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
    console.log(userId);
  } else {
    console.log("Quit");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.quit();
    gameArray = [];
    console.log(`@@${uiSwitch} off`);
    if (uiSwitch) {
      uiSwitch = false;
    }
  }
}
