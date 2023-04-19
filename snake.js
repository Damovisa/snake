// Set up canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set up game variables
let snake = [{ x: canvasWidth / 2, y: canvasHeight / 2 }];
let food = { x: 0, y: 0 };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Get high score from local storage or set to 0
let direction = "right";
let gameRunning = false;

// Set up game loop
function gameLoop() {
    // Move snake
    let head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            head.y -= 10;
            break;
        case "down":
            head.y += 10;
            break;
        case "left":
            head.x -= 10;
            break;
        case "right":
            head.x += 10;
            break;
    }
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Save high score to local storage
        }
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        gameOver();
        return;
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);

    // Update score and high score
    document.getElementById("score").innerHTML = score;
    document.getElementById("highscore").innerHTML = highScore;

    // Call game loop again
    if (gameRunning) {
        setTimeout(gameLoop, 100);
    }
}

// Generate food at random location
function generateFood() {
    food.x = Math.floor(Math.random() * canvasWidth / 10) * 10;
    food.y = Math.floor(Math.random() * canvasHeight / 10) * 10;
}

// Game over
function gameOver() {
    alert("Game over!");
    gameRunning = false;
}

// Handle keyboard input
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (!gameRunning) {
            // Reset game variables
            snake = [{ x: canvasWidth / 2, y: canvasHeight / 2 }];
            food = { x: 0, y: 0 };
            score = 0;
            direction = "right";
            gameRunning = true;

            // Generate food and start game loop
            generateFood();
            gameLoop();
        }
    } else {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowRight":
                if (direction !== "left") {
                    direction = "right";
                }
                break;
        }
    }
});