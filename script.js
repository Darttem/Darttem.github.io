const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;
let speed = 100;
let snake;
let food;
let d;
let snakeColor = '#FF0000';
let gameInterval;

document.addEventListener("keydown", getDirection);

document.addEventListener("keydown", getDirection);

function getDirection(event) {
    if (event.key === 'a' && d != "RIGHT") d = "LEFT";
    if (event.key === 'w' && d != "DOWN") d = "UP";
    if (event.key === 'd' && d != "LEFT") d = "RIGHT";
    if (event.key === 's' && d != "UP") d = "DOWN";
}
function setDirection(direction) {
    if ((direction == "LEFT" && d != "RIGHT") || 
        (direction == "UP" && d != "DOWN") ||
        (direction == "RIGHT" && d != "LEFT") ||
        (direction == "DOWN" && d != "UP")) {
        d = direction;
    }
}



function createSnake() {
    snake = [];
    for (let i = 3; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize - 2) + 1),
        y: Math.floor(Math.random() * (canvas.height / boxSize - 2) + 1)
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Додаємо контури карти
    ctx.fillStyle = '#333'; // Колір стін
    ctx.fillRect(0, 0, canvas.width, boxSize);
    ctx.fillRect(0, canvas.height - boxSize, canvas.width, boxSize);
    ctx.fillRect(0, 0, boxSize, canvas.height);
    ctx.fillRect(canvas.width - boxSize, 0, boxSize, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX--;
    if (d == "UP") snakeY--;
    if (d == "RIGHT") snakeX++;
    if (d == "DOWN") snakeY++;

    if (snakeX < 0) snakeX = canvas.width / boxSize - 1;
    if (snakeX >= canvas.width / boxSize) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height / boxSize - 1;
    if (snakeY >= canvas.height / boxSize) snakeY = 0;

    if (snakeX == food.x && snakeY == food.y) {
        createFood();
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    if (collision(newHead, snake)) {
        restartGame();
    }

    snake.unshift(newHead);
}

function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(draw, speed);
}

function changeSpeed(newSpeed) {
    speed = 300 - newSpeed;
    startGame();
}

function changeColor(color) {
    snakeColor = color;
}

function restartGame() {
    snake = [];
    createSnake();
    createFood();
    d = undefined;
    speed = 100;
    document.getElementById('speedRange').value = 100;
    startGame();
}

createSnake();
createFood();
startGame();
