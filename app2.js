let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

class Snake {
    constructor(map, snake, apple, rate = 500, unit = 10) {
        this.map = map,
        this.snake = [snake],
        this.apple = apple
        this.rate = rate
        this.unit = unit
        this.direction = ''
        this.timer
        this._snake = [snake]
        this._apple = apple
        this._rate = rate
    }

    reset() {
        this.snake = [...this._snake]
        this.apple = this._apple
        this.rate = this._rate
        this.direction = ''
        ctx.clearRect(0, 0, this.map.width * this.unit, this.map.height * this.unit)
    }

    setup() {
        canvas.width = this.map.width * this.unit
        canvas.height = this.map.height * this.unit
    }

    draw(xI, yI, color) {
        let x = xI * this.unit
        let y = yI * this.unit

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.unit, y);
        ctx.lineTo(x + this.unit, y + this.unit);
        ctx.lineTo(x, y + this.unit);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawSnake() {
        this.snake.forEach(body => {
            this.draw(body.x, body.y, 'black')
        })
    }

    operate() {
        document.addEventListener('keydown', (e) => {
            this.direction = decideDirection(e, this.direction)
        })
    }

    move() {
        let x = this.snake[0].x;
        let y = this.snake[0].y;

        switch (this.direction) {
            case "ArrowUp":
                y -= 1
                break;
            case "ArrowDown":
                y += 1
                break;
            case "ArrowLeft":
                x -= 1
                break;
            case "ArrowRight":
                x += 1
                break;
        }

        this.snake.unshift({
            x,
            y
        });
        this.snake.pop();
    
        ctx.clearRect(0, 0, this.map.width * this.unit, this.map.height * this.unit);
    }

    isSnakeEatApple() {
        if(this.apple.x === this.snake[0].x && this.apple.y === this.snake[0].y) {
            return true;
        }
        return false;
    }

    generateNewApple() {
        let newAppleX = getRandomNumber(this.map.width);
        let newAppleY = getRandomNumber(this.map.height);
    
        while(this.checkRepeatLocation(newAppleX, newAppleY)) {
            newAppleX = getRandomNumber(this.map.width);
            newAppleY = getRandomNumber(this.map.height);
        }
    
        this.apple = {
            x: newAppleX,
            y: newAppleY
        }
    }

    checkRepeatLocation(newAppleX, newAppleY) {
        return this.snake.some(tile => {
            return tile.x === newAppleX && tile.y === newAppleY;
        })
    }

    checkGameOver() {
        const snakeHead = this.snake[0]
        const repeatLocation = this.snake.some((tile, index) => {
            if(index === 0) return false;
            return tile.x === snakeHead.x && tile.y === snakeHead.y;
        })

        if(snakeHead.x < 0 || snakeHead.x >= this.map.width || snakeHead.y < 0 || snakeHead.y >= this.map.height || repeatLocation) {    
            alert('Game Over 🐍');
            this.reset()
        }
    }

    start() {
        this.setup()
        this.drawSnake()
        this.draw(this.apple.x, this.apple.y, 'red')
        this.operate()
        
        this.timer = setInterval(() => {
            this.move()
            this.checkGameOver()
            if(this.isSnakeEatApple()) {
                this.snake.push({
                    x: this.snake[this.snake.length - 1].x - 1,
                    y: this.snake[this.snake.length - 1].y 
                })

                this.generateNewApple()
            }
            this.drawSnake()
            
            this.draw(this.apple.x, this.apple.y, 'red')
        }, this.rate)
    }
}

//

let map = {
    width: 15,
    height: 15
}

let snakeHead = {
    x: 2,
    y: 2,
}

let apple = {
    x: 9,
    y: 9,
}

const snake = new Snake(map, snakeHead, apple, 150, 30)

snake.start()

//

function decideDirection(e, direction) {
    switch (e.key) {
        case "ArrowUp":
            if(direction === "ArrowDown" || direction === "ArrowUp") break;
            direction = "ArrowUp";
            break;
        case "ArrowDown":
            if(direction === "ArrowUp" || direction === "ArrowDown") break;
            direction = "ArrowDown";
            break;
        case "ArrowLeft":
            if(direction === "ArrowRight" || direction === "ArrowLeft") break;
            direction = "ArrowLeft";
            break;
        case "ArrowRight":
            if(direction === "ArrowLeft" || direction === "ArrowRight") break;
            direction = "ArrowRight";
            break;
    }

    return direction
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}