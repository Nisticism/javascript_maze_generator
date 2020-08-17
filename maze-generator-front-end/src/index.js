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