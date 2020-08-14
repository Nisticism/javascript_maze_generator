const BASE_URL = "http://localhost:3000";
const MAZES = `${BASE_URL}/mazes`;

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

const renderMaze = (mazeHash) => {
  const canvas = document.createElement("canvas");

  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("class", "canvas");
  canvas.setAttribute("width", mazeHash.width * 10);
  canvas.setAttribute("height", mazeHash.height * 10);

  main.appendChild(canvas);
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
