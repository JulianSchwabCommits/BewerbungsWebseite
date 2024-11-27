const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');
const gameOverDisplay = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let apple = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let direction;
let score = 0;
let highscore = 0;

document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restartGame);

function changeDirection(event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if ((event.keyCode == 38 || event.keyCode == 87) && direction != 'DOWN') {
        direction = 'UP';
    } else if ((event.keyCode == 39 || event.keyCode == 68) && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if ((event.keyCode == 40 || event.keyCode == 83) && direction != 'UP') {
        direction = 'DOWN';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#388E3C' : '#66BB6A';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = '#004d40';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#FF5252';
    ctx.fillRect(apple.x, apple.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == apple.x && snakeY == apple.y) {
        score++;
        scoreDisplay.innerHTML = 'Score: ' + score;
        apple = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        if (score > highscore) {
            highscore = score;
            highscoreDisplay.innerHTML = 'Highscore: ' + highscore;
        }
        gameOverDisplay.style.display = 'block';
        restartButton.style.display = 'block';
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    score = 0;
    scoreDisplay.innerHTML = 'Score: ' + score;
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = null;
    gameOverDisplay.style.display = 'none';
    restartButton.style.display = 'none';
    game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);