//import Cursor from '/src/cursor.js';

const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/users/`;
const canvas = document.getElementById("mazeScreen");
const ctx = canvas.getContext("2d");

const main = document.querySelector("main");
//document.addEventListener("DOMContentLoaded", () => loadMaze(4));
//document.addEventListener("DOMContentLoaded", () => draw());

document.getElementById("log_in_button").addEventListener("click", (event) => {
  console.log("click");
  let username = document.getElementById("logInField").value;
  console.log(username);
  let userInfo = makeUser(username);
  console.log(userInfo);
  //renderUser(userInfo);
});

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
    .then((json) => {
      json.forEach((maze) => renderMaze(maze));
    });
};

const loadMaze = (id) => {
  fetch(MAZES)
    .then((res) => res.json())
    .then((json) => {
      renderMaze(json[id]);
    });
};

const renderUser = (userHash) => {
  console.log("we are here");
  let div = document.getElementById("userInfo");
  let p = document.createElement("p");

  div.setAttribute("class", "card");
  p.innerHTML = `Welcome ${userHash.username}`;

  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(ul);

  //userHash.scores.forEach((score) => renderScore(score));
};

// const renderScores = (scoreHash) => {

// }

const renderMazes = (mazesHash) => {};

function check_if_logged_in() {

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

let pathString = "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100";
let coinString = "200 200 220 220 230 230 300 300 400 400 500 500";

let game = new Game(MAZE_WIDTH, MAZE_HEIGHT, MAZE_X_CONSTANT, MAZE_Y_CONSTANT, pathString, coinString, 
  COIN_RADIUS, FINISH_AREA_SIZE, PATH_SIZE, 1);
game.start();
let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawMazeBorder(ctx);
  drawStartingArea(ctx);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function drawMazeBorder(ctx) {
  ctx.strokeStyle="white"
  ctx.lineWidth = 2;
  ctx.strokeRect(MAZE_X_CONSTANT - 2, MAZE_Y_CONSTANT - 2, MAZE_WIDTH + 2, MAZE_HEIGHT + 2);
}

function drawStartingArea(ctx) {
  ctx.fillStyle = "gray"
  ctx.fillRect(MAZE_X_CONSTANT, MAZE_Y_CONSTANT, STARTING_AREA_WIDTH, STARTING_AREA_HEIGHT);
}