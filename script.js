const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;

let changeLock = false;

let x;
let d;


let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("record").innerText = highScore;


let score = 0;
let speed = 100; // default speed
let color = 'red'; // default color
let record = 0;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * canvasSize) * box,
  y: Math.floor(Math.random() * canvasSize) * box,
};


let bodyTexture = new Image();
bodyTexture.src = "images/body.jpg";

let headTexture = new Image();
headTexture.src = "images/head.jpg";

let tailTexture = new Image();
tailTexture.src = "images/tail.jpg";





function restartGame() {
    snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };
    
    score = 0; 
    food = {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box,
    };
    
    
}



document.addEventListener("keydown", direction);



function changeDirection(newDirection) {
    if (newDirection === 'UP' && d !== 'DOWN') d = 'UP';
    if (newDirection === 'DOWN' && d !== 'UP') d = 'DOWN';
    if (newDirection === 'LEFT' && d !== 'RIGHT') d = 'LEFT';
    if (newDirection === 'RIGHT' && d !== 'LEFT') d = 'RIGHT';
  }

  


function direction(event) {
    if (changeLock) return;
    changeLock = true;

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

document.getElementsByName("speed").forEach(radio => {
    radio.addEventListener("change", function() {
        switch (this.value) {
            case "slow":
                speed = 150;
                break;
            case "medium":
                speed = 100;
                break;
            case "fast":
                speed = 50;
                break;
        }
        clearInterval(game);
        game = setInterval(draw, speed);
    });
});

document.getElementsByName("color").forEach(radio => {
    radio.addEventListener("change", function() {
        color = this.value;
    });
});

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function updateScore() {
    document.getElementById("score").innerText = score;
    if (score > record) {
        record = score;
        document.getElementById("record").innerText = record;
    }
}

bodyTexture.onload = function() {
    // Якщо потрібно, виконайте який-небудь код тут
};

headTexture.onload = function() {
    // Якщо потрібно, виконайте який-небудь код тут
};

tailTexture.onload = function() {
    // Якщо потрібно, виконайте який-небудь код тут
};


function draw() {

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.drawImage(headTexture, snake[i].x, snake[i].y, box, box);
        } else if (i == snake.length - 1) {
            ctx.drawImage(tailTexture, snake[i].x, snake[i].y, box, box);
        } else {
            ctx.drawImage(bodyTexture, snake[i].x, snake[i].y, box, box);
        }
    }
    
    
    highScore = record;
    localStorage.setItem("highScore", highScore);
    document.getElementById("record").innerText = highScore;

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? color : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;


    


    // Телепортація
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY >= canvas.height) snakeY = 0;

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
        restartGame();
    }


    
    

    snake.unshift(newHead);

    

    updateScore();
    changeLock = false;

    

}

let game = setInterval(draw, speed);
