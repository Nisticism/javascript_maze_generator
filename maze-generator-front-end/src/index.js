//import Cursor from '/src/cursor.js';

const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/users/`;
const FIND_OR_CREATE = `${BASE_URL}/find_or_create`;
const SCORES = `${BASE_URL}/scores`;
const canvas = document.getElementById("mazeScreen");
const ctx = canvas.getContext("2d");

const main = document.querySelector("main");

let username = null;
let userId = null;

let gameArray = [];
let loggedIn = false;

//document.addEventListener("DOMContentLoaded", () => setLogInButton());

const setLogInButton = () => {

  if (userId) {
    setListenerForLogout();
  }
  else {
    gameArray = [];
    document
      .getElementById("logInButton")
      .addEventListener("click", (event) => {
        console.log("@@clickedWhenLoggedOut");
        username = document.getElementById("logInField").value;
        makeOrGetUser(username);
      });
  }
  refreshUI();
};

function refreshUI() {
  console.log("@@refresh", userId)
  gameArray = [];
  if (userId) {
    setLoggedInUI();
  } else {
    setLoggedOutUI();
  }
}

function setListenerForLogout() {
  document
      .getElementById("logInButton")
      .addEventListener("click", (event) => {
        console.log("@@clickedWhenLoggedIn");
        userId = null;
      });
}

function setLoggedOutUI() {
  console.log("Log out UI set");
  document.getElementById("timer_text").style.display = "none";
  document.getElementById("logInButton").innerHTML = "Log in";
  document.getElementById("userInfo").innerHTML = "Please Log in to play";
  document.getElementById("logInField").style.display = "inline-block";
  document.getElementById("play").innerHTML = "Log in";
  document.getElementById("scores").style.display = "none";
  document.getElementById("usernameText").style.display = "inline";
}

function setLoggedInUI() {
  document.getElementById("timer_text").style.display = "block";
  document.getElementById("logInButton").innerHTML = "Log out";
  document.getElementById("userInfo").innerHTML = `Welcome ${username}!`;
  document.getElementById("logInField").value = "";
  document.getElementById("logInField").style.display = "none";
  document.getElementById("usernameText").style.display = "none";
  document.getElementById("play").innerHTML = "Play";
  document.getElementById("scores").style.display = "block";
}

function setListeners() {
  document.getElementById("scores").addEventListener("click", (event) => {
    event.preventDefault();
  });
  document.getElementById("play").addEventListener("click", (event) => {
    event.preventDefault();
  });
  document.getElementById("leaderboard").addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0,document.body.scrollHeight);
    loadScores();
  });
  document.getElementById("browseMazes").addEventListener("click", (event) => {
    event.preventDefault();
  });
}

setListeners();
setLogInButton();
refreshUI();

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

function setScoresData(json) {
  let scoresArray = [];
  for (let i = 0; i < json.length; i++) {
    var scores_array = [
      parseInt(json[i].maze_id),
      parseInt(json[i].user_id),
      json[i].time,
      json[i].created_at,
    ];
    scoresArray.push(scores_array);
  }
  console.log(scoresArray);
  renderScoresData(scoresArray);
}

function renderScoresData(scoresArray) {
  let ul = document.createElement("ul");
  let p = document.createElement("p");
  ul.innerHTML = "Leaderboard";
  let userSpace = document.getElementById("userSpace");
  userSpace.appendChild(ul);
  
}

const renderUser = (userHash) => {
  console.log("we are here");
  let div = document.getElementById("userInfo");
  let p = document.createElement("p");

  div.setAttribute("class", "card");
  console.log(userHash);

  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(ul);
};

let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 800;
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
  "80 40 50 70 60 80 0 60 10 60 20 60 30 60 40 60 60 0 60 10 60 20 60 30 70 30 80 30 90 30 100 30 110 40 120 50" +
  " 150 30 160 30 170 30 180 30 190 30 200 30 200 40 200 50 200 60 200 70 204 80 194 80 160 80" +
  " 150 80 140 80 150 80 150 70 150 60 150 50 150 40 250 0 250 10 250 20 250 30 250 40 250 50 250 60 250 70 250 80 250 90 250 100" +
  " 250 110 250 120 240 120 230 120 220 120 210 120 200 120 190 120 180 120 170 120 160 120 150 120 140 120" +
  " 100 90 100 100 100 110 100 120 100 130 100 140 100 150 100 160 100 170 100 180 100 190 100 200 100 210" +
  // mid vertical
  " 140 130 140 170 140 180 140 190 140 200 140 210 140 220 140 230 140 240 140 250 140 260" +
  " 100 220 90 220 80 220 70 220 60 220 50 220 40 220 30 220 30 230 30 240 30 250" +
  " 130 260 120 260 110 260 100 260 90 260 60 290 60 280 60 270" +
  " 140 170 150 170 160 170 170 170 180 160 180 160 190 160 200 160 210 160 220 160 230 160 240 160 250 160 260 160 270 160 280 160 290 160" +
  " 210 290 210 280 210 270 210 260 210 250 210 240 200 240 190 240 190 230 190 220 190 210" +
  " 230 180 230 190 230 200";
let testCoins = "65 5 165 45 265 5 215 25 15 85 165 265";

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
      testPaths,
      testCoins2,
      COIN_RADIUS,
      FINISH_AREA_SIZE,
      PATH_SIZE,
      parseInt(JSON.stringify(json[i].id)),
      STARTING_AREA_WIDTH,
      STARTING_AREA_HEIGHT,
      json.length,
      CURSOR_SPEED,
    ];
    gameArray.push(new_array);
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

let uiSwitch = false;

function gameLoop(timestamp) {
  console.log(`@@@${userId}`)
  //setLogInButton();
  if (userId) {
    console.log(`@@${uiSwitch}`);
    if (!uiSwitch) {
      console.log("uiSwitched");
      refreshUI();
      uiSwitch = true;
      setListenerForLogout();
    }
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
    console.log("looping");
    console.log(userId);
  } else {
    console.log("Quit");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.quit();
    console.log(`@@${uiSwitch} off`);
    if (uiSwitch) {
      refreshUI();
      uiSwitch = false;
    }
  }
}
