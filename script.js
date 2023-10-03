const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;

let score = 0;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * canvasSize) * box,
  y: Math.floor(Math.random() * canvasSize) * box,
};

let d;
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.key === "ArrowLeft" && d !== "RIGHT") d = "LEFT";
  else if (event.key === "ArrowUp" && d !== "DOWN") d = "UP";
  else if (event.key === "ArrowRight" && d !== "LEFT") d = "RIGHT";
  else if (event.key === "ArrowDown" && d !== "UP") d = "DOWN";
  // for AWSD controls
  else if (event.key === "a" && d !== "RIGHT") d = "LEFT";
  else if (event.key === "w" && d !== "DOWN") d = "UP";
  else if (event.key === "d" && d !== "LEFT") d = "RIGHT";
  else if (event.key === "s" && d !== "UP") d = "DOWN";
}

document.getElementById("left").addEventListener("click", function () {
  if (d !== "RIGHT") d = "LEFT";
});
document.getElementById("up").addEventListener("click", function () {
  if (d !== "DOWN") d = "UP";
});
document.getElementById("right").addEventListener("click", function () {
  if (d !== "LEFT") d = "RIGHT";
});
document.getElementById("down").addEventListener("click", function () {
  if (d !== "UP") d = "DOWN";
});

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvasSize) * box,
      y: Math.floor(Math.random() * canvasSize) * box,
    };
  } else snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > canvas.width ||
    snakeY > canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
