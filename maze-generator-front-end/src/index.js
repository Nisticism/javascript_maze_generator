const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;
const PROFILE = `${BASE_URL}/user`;

const main = document.querySelector("main");
document.addEventListener("DOMContentLoaded", () => loadMaze(4));
document.addEventListener("DOMContentLoaded", () => draw());

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

function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    var circle = new Path2D();
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.fill(circle);
  }
}

function check_if_logged_in() {}
