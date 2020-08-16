//import Cursor from '/src/cursor.js';

const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/user`;
const canvas = document.getElementById("mazeScreen");
const ctx = canvas.getContext("2d");

const main = document.querySelector("main");
//document.addEventListener("DOMContentLoaded", () => loadMaze(4));
//document.addEventListener("DOMContentLoaded", () => draw());

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

const loadUser = (id) => {
  fetch(PROFILE)
    .then((res) => res.json())
    .then((json) => {
      renderUser(json[id]);
    });
};

const renderProfile = (userHash) => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const ul = document.createElement("ul");

  div.setAttribute("class", "card");
  div.setAttribute("data-id", userHash.id);
  p.innerHTML = userHash.name;

  button.setAttribute("data-trainer-id", trainerHash.id);
  button.innerHTML = "Play Game";
  button.addEventListener("click", createPokemon);

  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(ul);

  main.appendChild(div);
  trainerHash.pokemons.forEach((pokemon) => renderPokemon(pokemon));
};

const renderMazes = (mazesHash) => {};

const renderMaze = (mazeHash) => {
  const canvas_div = document.createElement("div");
  const generate_div = document.createElement("div");
  const log_in_div = document.createElement("div");

  const canvas = document.createElement("canvas");
  const ruler = document.createElement("img");

  const generate_maze_button = document.createElement("button");
  const generate_maze_width_field = document.createElement("input");
  const generate_maze_height_field = document.createElement("input");
  const play_button = document.createElement("button");

  const log_in_button = document.createElement("button");
  const username_field = document.createElement("input");

  canvas_div.setAttribute("id", "canvas_div");
  generate_div.setAttribute("id", "generate_div");
  log_in_div.setAttribute("id", "log_in_div");

  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("class", "canvas");
  canvas.setAttribute("width", mazeHash.width * 10);
  canvas.setAttribute("height", mazeHash.height * 10);
  ruler.setAttribute("id", "ruler");
  ruler.setAttribute("src", "src/400px_ruler.png");
  ruler.setAttribute("alt", "ruler");
  ruler.setAttribute("width", "411");
  ruler.setAttribute("height", "30");

  generate_maze_button.setAttribute("id", "generate");
  generate_maze_button.innerHTML = "Generate maze";
  generate_maze_width_field.setAttribute("id", "maze_width_field");
  generate_maze_height_field.setAttribute("id", "maze_height_field");
  play_button.setAttribute("id", "play_button");

  log_in_button.setAttribute("id", "log_in");
  log_in_button.innerHTML = "Log In";
  username_field.setAttribute("id", "log_in_field");

  canvas_div.appendChild(canvas);
  canvas_div.appendChild(ruler);

  generate_div.appendChild(generate_maze_button);
  generate_div.appendChild(generate_maze_width_field);
  generate_div.appendChild(generate_maze_height_field);
  generate_div.appendChild(play_button);

  log_in_div.appendChild(log_in_button);
  log_in_div.appendChild(username_field);

  main.appendChild(canvas_div);
  main.appendChild(generate_div);
  main.appendChild(log_in_div);
};

// function draw() {
//   var canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     var ctx = canvas.getContext("2d");

//     var circle = new Path2D();
//     circle.arc(100, 35, 25, 0, 2 * Math.PI);

//     ctx.fill(circle);
//   }
// }

function check_if_logged_in() {}

let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 800;

let MAZE_WIDTH = 800;
let MAZE_HEIGHT = 600;

let COIN_RADIUS = 8;

let MAZE_X_CONSTANT = (CANVAS_WIDTH - MAZE_WIDTH) / 2;
let MAZE_Y_CONSTANT = (CANVAS_HEIGHT - MAZE_HEIGHT) / 2;

let paths = [];
let coins = [];

let game = new Game(MAZE_WIDTH, MAZE_HEIGHT, MAZE_X_CONSTANT, MAZE_Y_CONSTANT);
game.start();
let lastTime = 0;

addPaths(MAZE_X_CONSTANT, MAZE_Y_CONSTANT);
addCoins(MAZE_X_CONSTANT, MAZE_Y_CONSTANT);

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawMazeBorder(ctx);
  game.update(deltaTime);
  game.draw(ctx);
  drawPaths(paths);
  drawCoins(coins);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function addCoins(x, y) {
  let coin1 = new Coin(100 + x + COIN_RADIUS, 50 + y + COIN_RADIUS);
  let coin2 = new Coin(50 + x + COIN_RADIUS, 40 + y + COIN_RADIUS);
  let coin3 = new Coin(20 + x + COIN_RADIUS, 40 + y + COIN_RADIUS);
  let coin4 = new Coin(x + COIN_RADIUS, 400 + y + COIN_RADIUS);

  coins.push(coin1);
  coins.push(coin2);
  coins.push(coin3);
  coins.push(coin4);
}

function addPaths(x, y) {
  let path1 = new Path(0 + x, 0 + y);
  let path2 = new Path(0 + x, 10 + y);
  let path3 = new Path(0 + x, 20 + y);
  let path4 = new Path(0 + x, 30 + y);
  let path5 = new Path(0 + x, 40 + y);

  paths.push(path1);
  paths.push(path2);
  paths.push(path3);
  paths.push(path4);
  paths.push(path5);
}

function drawPaths(paths) {
  paths.forEach((path) => path.draw(ctx));
}

function drawCoins(coins) {
  coins.forEach((coin) => coin.draw(ctx));
}

function drawMazeBorder(ctx) {
  ctx.strokeStyle="white"
  ctx.lineWidth = 2;
  ctx.strokeRect(MAZE_X_CONSTANT - 1, MAZE_Y_CONSTANT - 1, MAZE_WIDTH + 1, MAZE_HEIGHT + 1);
}