document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    
    let x = 10 // x起始
    let y = 40 // y起始
    let snake = [
        {
            x: 10,
            y: 40
        }
    ]

    let appleDirection = {
        x: 70,
        y: 40
    } 

    let timeSpace = 150
    let direction = null;
    let timer;

    if (canvas.getContext) {
        for (let i = 0; i < snake.length; i++) {
            createSnake(ctx, snake[i].x,  snake[i].y)
        }
    }

    createApple(ctx, appleDirection.x, appleDirection.y)

    document.addEventListener('keydown', decideDirection)

    function decideDirection(e) {
        const code = e.code
        clearInterval(timer)

        switch (code) {
            case "ArrowUp":
                if(direction === "ArrowDown") break;
                direction = "ArrowUp"
                break;
            case "ArrowDown":
                if(direction === "ArrowUp") break;
                direction = "ArrowDown"
                break;
            case "ArrowLeft":
                if(direction === "ArrowRight") break;
                direction = "ArrowLeft"
                break;
            case "ArrowRight":
                if(direction === "ArrowLeft") break;
                direction = "ArrowRight"
                break;
        }

        timer = setInterval(()=> {
            move(direction)
            createApple(ctx, appleDirection.x, appleDirection.y)
            checkGameOver()
            
            eatApple(direction)
            
        }, timeSpace)
    }

    function move(direction) {
        

        switch (direction) {
            case "ArrowUp":
                
                y -= 10
                snake.unshift({x: x, y: y})
                snake.pop()

                ctx.clearRect(0, 0, 100, 100)
                for (let i = 0; i < snake.length; i++) {
                    createSnake(ctx, snake[i].x,  snake[i].y)
                }
                
                break;
            case "ArrowDown":
                

                y += 10

                snake.unshift({x: x, y: y})
                snake.pop()

                ctx.clearRect(0, 0, 100, 100)
                for (let i = 0; i < snake.length; i++) {
                    createSnake(ctx, snake[i].x,  snake[i].y)
                }
                
                break;
            case "ArrowLeft":
                x -= 10

                snake.unshift({x: x, y: y})
                snake.pop()

                ctx.clearRect(0, 0, 100, 100)
                for (let i = 0; i < snake.length; i++) {
                    createSnake(ctx, snake[i].x,  snake[i].y)
                }
                
                break;
            case "ArrowRight":
               

                x += 10

                snake.unshift({x: x, y: y})
                snake.pop()

                ctx.clearRect(0, 0, 100, 100)
                for (let i = 0; i < snake.length; i++) {
                    createSnake(ctx, snake[i].x,  snake[i].y)
                }
                
                
                break;
        }
    }

    function eatApple(direction) {
        if(x !== appleDirection.x || y !== appleDirection.y) return;
    
        // switch (direction) {
        //     case "ArrowUp":
        //         y -= 10
        //         snake.unshift({x: x, y: y})
        //         break;
        //     case "ArrowDown":
        //         y += 10
        //         snake.unshift({x: x, y: y})
        //         break;
        //     case "ArrowLeft":
        //         x -= 10
        //         snake.unshift({x: x, y: y})
        //         break;
        //     case "ArrowRight":
        //         x += 10
        //         snake.unshift({x: x, y: y})
        //         break;
        // }

        snake.push({x: snake[snake.length - 1].x - 10, y: snake[snake.length - 1].y})
        let newAppleX = getRandomNumber(10) * 10
        let newAppleY = getRandomNumber(10) * 10

        let repeatLocation = snake.some(tile => {
            return tile.x === newAppleX && tile.y === newAppleY
        })

        while(repeatLocation) {
            newAppleX = getRandomNumber(10) * 10
            newAppleY = getRandomNumber(10) * 10

            repeatLocation = snake.some(tile => {
                return tile.x === newAppleX && tile.y === newAppleY
            })
        }

        appleDirection = {
            x: newAppleX,
            y: newAppleY
        }
        
    }
    

    function checkGameOver() {
        let repeatLocation = snake.some((tile, index) => {
            if(index === 0) return false
            return tile.x === x && tile.y === y
        })


        if(x < 0 || x >= 100 || y < 0 || y >= 100 || repeatLocation ) {
            alert('Game Over 🐍')
            clearInterval(timer)
            direction = null
            x = 10;
            y = 40;
            snake = [
                {
                    x: 10,
                    y: 40
                }
            ]

            appleDirection = {
                x: 70,
                y: 40
            }
            ctx.clearRect(0, 0, 100, 100)

            if (canvas.getContext) {
                for (let i = 0; i < snake.length; i++) {
                    createSnake(ctx, snake[i].x,  snake[i].y)
                }
            }
        
            createApple(ctx, appleDirection.x, appleDirection.y)
        }
    }
})

function createSnake(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 10, y + 10);
    ctx.lineTo(x, y + 10);
    ctx.fillStyle = 'black'
    ctx.fill();
}

function createApple(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 10, y + 10);
    ctx.lineTo(x, y + 10);
    ctx.fillStyle = 'red'
    ctx.fill();
}


function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}


