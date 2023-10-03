let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let tileSize = 20;
let tileCount = canvas.width / tileSize;
let headX = tileCount / 2;
let headY = tileCount / 2;
let xVelocity = 0;
let yVelocity = 0;
let trail = [];
let tailLength = 5;
let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);
let snakeColor = "green";
let score = 0;

document.addEventListener("keydown", function (event) {
    switch (event.key.toLowerCase()) {
        case "a":
            if (xVelocity == 0) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case "w":
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case "d":
            if (xVelocity == 0) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
        case "s":
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
    }
});




function gameLoop() {
    headX += xVelocity;
    headY += yVelocity;

    if (headX < 0) {
        headX = tileCount - 1;
    }
    if (headX > tileCount - 1) {
        headX = 0;
    }
    if (headY < 0) {
        headY = tileCount - 1;
    }
    if (headY > tileCount - 1) {
        headY = 0;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.fillStyle = snakeColor;
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * tileSize, trail[i].y * tileSize, tileSize, tileSize);
        ctx.strokeRect(trail[i].x * tileSize, trail[i].y * tileSize, tileSize, tileSize);

        if (trail[i].x === headX && trail[i].y === headY && tailLength > 5) {
            tailLength = 5;
            score = 0;
        }
    }

    trail.push({ x: headX, y: headY });

    while (trail.length > tailLength) {
        trail.shift();
    }

    if (appleX === headX && appleY === headY) {
        tailLength++;
        score++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
    ctx.strokeRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 10);

    setTimeout(gameLoop, 1000 / 10);
}

gameLoop();

function restart() {
    headX = tileCount / 2;
    headY = tileCount / 2;
    xVelocity = 0;
    yVelocity = 0;
    trail = [];
    tailLength = 5;
    score = 0;
}

function setDirection(direction) {
    switch (direction) {
        case "LEFT":
            if (xVelocity == 0) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case "UP":
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case "RIGHT":
            if (xVelocity == 0) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
        case "DOWN":
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
    }
}

function changeSnakeColor(color) {
    snakeColor = color;
}

document.getElementById("speedRange").onchange = function () {
    let speed = this.value;
    gameSpeed = 1000 / speed;
};
