let snake = [
    {
        x: 10,
        y: 30
    }
];

let snakeHeadX = snake[0].x
let snakeHeadY = snake[0].y

let applePosition = {
    x: 70,
    y: 30
}

let direction = null;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if(canvas.getContext) {
        drawRect(ctx, snake[0].x,  snake[0].y, 'black');
        drawRect(ctx, applePosition.x,  applePosition.y, 'red');
    }

    document.addEventListener('keypress', decideDirection) 
})



function decideDirection(e) {
    clearInterval(timer);

    switch (e.code) {
        case "ArrowUp":
            if(direction === "ArrowDown") break;
            direction = "ArrowUp";
            break;
        case "ArrowDown":
            if(direction === "ArrowUp") break;
            direction = "ArrowDown";
            break;
        case "ArrowLeft":
            if(direction === "ArrowRight") break;
            direction = "ArrowLeft";
            break;
        case "ArrowRight":
            if(direction === "ArrowLeft") break;
            direction = "ArrowRight";
            break;
    }

    timer = setInterval(()=> {
        move(direction)
        createApple(ctx, appleDirection.x, appleDirection.y)
        checkGameOver()
        eatApple(direction)
    }, 150)   
}

function createSnake() {
    snake.unshift({
        x,
        y
    });
    snake.pop();

    ctx.clearRect(0, 0, 100, 100);
    for (let i = 0; i < snake.length; i++) {
        createSnake(ctx, snake[i].x,  snake[i].y)
    }       
}


function move() {
    switch (direction) {
        case "ArrowUp":
            
            snakeHeadY -= 10;
            snake.unshift({x: x, y: y})
            snake.pop()

            ctx.clearRect(0, 0, 100, 100)
            for (let i = 0; i < snake.length; i++) {
                createSnake(ctx, snake[i].x,  snake[i].y)
            }
            
            break;
        case "ArrowDown":
            

            snakeHeadY += 10

            snake.unshift({x: x, y: y})
            snake.pop()

            ctx.clearRect(0, 0, 100, 100)
            for (let i = 0; i < snake.length; i++) {
                createSnake(ctx, snake[i].x,  snake[i].y)
            }
            
            break;
        case "ArrowLeft":
            snakeHeadX -= 10

            snake.unshift({x: x, y: y})
            snake.pop()

            ctx.clearRect(0, 0, 100, 100)
            for (let i = 0; i < snake.length; i++) {
                createSnake(ctx, snake[i].x,  snake[i].y)
            }
            
            break;
        case "ArrowRight":
           

            snakeHeadX += 10

            snake.unshift({x: x, y: y})
            snake.pop()

            ctx.clearRect(0, 0, 100, 100)
            for (let i = 0; i < snake.length; i++) {
                createSnake(ctx, snake[i].x,  snake[i].y)
            }
            
            
            break;
    }
}






function drawRect(ctx, x, y, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 10, y + 10);
    ctx.lineTo(x, y + 10);
    ctx.fillStyle = color
    ctx.fill();
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
