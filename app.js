let snake = [
    {
        x: 10,
        y: 40
    }
];

let x = snake[0].x
let y = snake[0].y

let applePosition = {
    x: 70,
    y: 40
};

let direction = null;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    if(canvas.getContext) {
        drawRect(ctx, snake[0].x,  snake[0].y, 'black');
        drawRect(ctx, applePosition.x,  applePosition.y, 'red');
    }

    document.addEventListener('keydown', decideDirection);

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
            move()
            drawRect(ctx, applePosition.x, applePosition.y, 'red')
            checkGameOver()
            eatApple()
        }, 150)   
    }
    
    function move() {
        switch (direction) {
            case "ArrowUp":
                y -= 10;
                createSnake()
                break;
            case "ArrowDown":
                y += 10
                createSnake()
                break;
            case "ArrowLeft":
                x -= 10
                createSnake()
                break;
            case "ArrowRight":
                x += 10
                createSnake()
                break;
        }
    }
    
    function createSnake() {
        snake.unshift({
            x,
            y
        });
        snake.pop();
    
        ctx.clearRect(0, 0, 100, 100);
        for (let i = 0; i < snake.length; i++) {
            drawRect(ctx, snake[i].x,  snake[i].y, 'black')
        }       
    }
    
    function eatApple() {
        if(x !== applePosition.x || y !== applePosition.y) return;
    
        snake.push({x: snake[snake.length - 1].x - 10, y: snake[snake.length - 1].y})
    
        let newAppleX = getRandomNumber(10) * 10;
        let newAppleY = getRandomNumber(10) * 10;
    
        while(checkRepeatLocation()) {
            newAppleX = getRandomNumber(10) * 10;
            newAppleY = getRandomNumber(10) * 10;
        }
    
        applePosition = {
            x: newAppleX,
            y: newAppleY
        }
        
        function checkRepeatLocation() {
            return snake.some(tile => {
                return tile.x === newAppleX && tile.y === newAppleY;
            })
        }
    }
    
    function checkGameOver() {
        let repeatLocation = snake.some((tile, index) => {
            if(index === 0) return false;
            return tile.x === x && tile.y === y;
        })
    
        if(x < 0 || x >= 100 || y < 0 || y >= 100 || repeatLocation ) {
            alert('Game Over 🐍');
            clearInterval(timer);
            
            snake = [
                {
                    x: 10,
                    y: 40
                }
            ];
    
            x = snake[0].x;
            y = snake[0].y;
    
            applePosition = {
                x: 70,
                y: 40
            };
            direction = null;
            ctx.clearRect(0, 0, 100, 100);
    
            if(canvas.getContext) {
                drawRect(ctx, snake[0].x,  snake[0].y, 'black');
                drawRect(ctx, applePosition.x,  applePosition.y, 'red');
            }
        }
    }
})

function drawRect(ctx, x, y, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 10, y + 10);
    ctx.lineTo(x, y + 10);
    ctx.fillStyle = color;
    ctx.fill();
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
