const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = canvas.width;
const boxesInRow = canvasSize / boxSize;

let snake = [];
snake[0] = { x: 10 * boxSize, y: 10 * boxSize };

let food = {
    x: Math.floor(Math.random() * boxesInRow) * boxSize,
    y: Math.floor(Math.random() * boxesInRow) * boxSize
};

let score = 0;

let d;
document.addEventListener("keydown", direction);

let snakeColor = 'green'; // За замовчуванням

function startGameWithSelection() {
    snakeColor = document.getElementById('snakeColorSelect').value;
    document.getElementById('snakeSelectionModal').style.display = 'none';
    restartGame();
}



// Змінюємо кольор змійки в функції draw
for (let i = 0; i < snake.length; i++) {
    context.fillStyle = (i == 0) ? snakeColor : 'white'; // Використовуємо вибраний колір для голови змійки
    context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    context.strokeStyle = 'black';
    context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
}

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    if (event.keyCode == 38 && d != "DOWN") d = "UP";
    if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    context.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

        context.strokeStyle = "black";
        context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= boxSize;
    if (d == "UP") snakeY -= boxSize;
    if (d == "RIGHT") snakeX += boxSize;
    if (d == "DOWN") snakeY += boxSize;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * boxesInRow) * boxSize,
            y: Math.floor(Math.random() * boxesInRow) * boxSize
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    function collision(newHead, array) {
        for (let i = 0; i < array.length; i++) {
            if (newHead.x == array[i].x && newHead.y == array[i].y) return true;
        }
        return false;
    }

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, boxSize, boxSize);
}




// Додаємо функцію для рестарту гри
function restartGame() {
    clearInterval(game);
    snake = [];
    snake[0] = { x: 10 * boxSize, y: 10 * boxSize };
    score = 0;
    d = undefined; // Обнулення напрямку
    game = setInterval(draw, document.getElementById('speedSelect').value);
}

// Змінюємо інтервал гри на основі вибраної швидкості
document.getElementById('speedSelect').addEventListener('change', function() {
    clearInterval(game);
    game = setInterval(draw, document.getElementById('speedSelect').value);
});

// Ініціалізація гри з вибраною швидкістю
let game = setInterval(draw, document.getElementById('speedSelect').value);
