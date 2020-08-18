//import Cursor from '/src/cursor.js';

const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/users/`;
const SESSION = `${BASE_URL}/session`;
const LOGOUT = `${BASE_URL}/logout`;
const canvas = document.getElementById("mazeScreen");
const ctx = canvas.getContext("2d");

const main = document.querySelector("main");
let gameArray = [];
//document.addEventListener("DOMContentLoaded", () => loadMaze(4));
//document.addEventListener("DOMContentLoaded", () => draw());
//console.log(loggedIn());

document.getElementById("logInButton").addEventListener("click", (event) => {
  console.log("click");
  let username = document.getElementById("logInField").value;
  console.log(username);
  document.getElementById("userInfo").innerHTML = makeUser(username);
  //renderUser(userInfo);

});

document.getElementById("getUser").addEventListener("click", getUser);

function getUser() {
  fetch(PROFILE)
  .then((res) => res.json())
    .then((json) => {
      json.forEach((user) => console.log(user));
    })
}

const makeUser = (username) => {
  fetch(`${PROFILE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(res => {
    return res.json()
  })
  .then(data => console.log(data))
  .catch(error => console.log('ERROR'))
};

const loadMazes = () => {
  fetch(MAZES)
    .then((res) => res.json())
    .then((json) => {setMazeData(json)
    })
};

const renderUser = (userHash) => {
  console.log("we are here");
  let div = document.getElementById("userInfo");
  let p = document.createElement("p");

  div.setAttribute("class", "card");
  console.log(userHash)
  //p.innerHTML = `Welcome ${userHash.username}`;

  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(ul);
  
  document.getElementById("log_in_button").innerHTML = "Log out"
  setLogOut();
};

function loggedIn() {
  fetch(SESSION)
  .then((res) => res.json())
  .then((json) => {
    console.log(json)
  });
}

const setLogOut = () => {
  document.getElementById("scores").setAttribute("hidden", true);
  document.getElementById("log_in_button").addEventListener("click", (event) => {
    console.log("click");
    fetch(`${LOGOUT}`);
    document.getElementById("scores").setAttribute("hidden", true);
  });
}

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

let testPaths = "0 60 10 60 20 60 30 60 40 60 60 0 60 10 60 20 60 30 70 30 80 30 90 30 100 30 110 40 120 50" +
" 40 200 50 190 60 180 70 170"
let testCoins = "65 5"

loadMazes();

function setMazeData(json) {
  for (let i = 0; i < json.length; i ++) {
    var new_array = [parseInt(json[i].width * PATH_SIZE), parseInt(json[i].height * PATH_SIZE), 
    (CANVAS_WIDTH - json[i].width * PATH_SIZE) / 2, (CANVAS_HEIGHT - json[i].height * PATH_SIZE) / 2,
    testPaths, testCoins, COIN_RADIUS, 
    FINISH_AREA_SIZE, PATH_SIZE, parseInt(JSON.stringify(json[i].id)), STARTING_AREA_WIDTH, STARTING_AREA_HEIGHT, json.length, CURSOR_SPEED]
    gameArray.push(new_array);
  }
  console.log(gameArray);
  game = createGame(0);
  requestAnimationFrame(gameLoop);
}

function createGame(gameId) {
  console.log(gameArray)
  let new_game = new Game(gameArray[gameId][0], gameArray[gameId][1], gameArray[gameId][2], gameArray[gameId][3], 
    gameArray[gameId][4], gameArray[gameId][5], gameArray[gameId][6], gameArray[gameId][7], gameArray[gameId][8], 
    gameArray[gameId][9], gameArray[gameId][10], gameArray[gameId][11], gameArray[gameId][12], gameArray[gameId][13], gameArray)
  
    return new_game;
}

let lastTime = 0;

function gameLoop(timestamp) {

  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}