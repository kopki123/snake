let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');

class Game {
    constructor(setup, canvas) {
        this.setup = setup
        this._setup = {...setup}
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        canvas.width = this.setup.mapWidth *  this.setup.unit
        canvas.height = this.setup.mapHeight *  this.setup.unit

        this.timer()
    }

    timer() {
        this.ctx.clearRect(0, 0, this.setup.mapWidth * this.setup.unit, this.setup.mapHeight * this.setup.unit)
        
        if(this.isSnakeEatApple()) {
            this.setup.snake.grow(this.setup.apple.x, this.setup.apple.y)
            this.generateNewApple()
        }
        this.setup.snake.move()
        this.checkGameOver()

        this.drawSnake()
        this.draw(this.setup.apple.x, this.setup.apple.y, 'red')

        setTimeout(() => {
            this.timer()
        }, this.setup.rate - this.setup.snake.body.length * 5)
    }

    checkGameOver() {
        const snakeHead = this.setup.snake.body[0]
        const repeatLocation = this.setup.snake.body.some((tile, index) => {
            if(index === 0) return false;
            return tile.x === snakeHead.x && tile.y === snakeHead.y;
        })

        if(snakeHead.x < 0 || snakeHead.x >= this.setup.mapWidth || snakeHead.y < 0 || snakeHead.y >= this.setup.mapHeight || repeatLocation) {    
            alert('Game Over 🐍');
            this.setup = {
                ...this._setup,
                snake: new Snake(1,1),
                apple: new Apple(3,3)
            }
        }
    }


    isSnakeEatApple() {
        if(this.setup.apple.x === this.setup.snake.body[0].x && this.setup.apple.y === this.setup.snake.body[0].y) {
            return true;
        }
        return false;
    }

    generateNewApple() {
        let newAppleX;
        let newAppleY;

        do {
            newAppleX = getRandomNumber(this.setup.mapWidth);
            newAppleY = getRandomNumber(this.setup.mapHeight);
        } while (this.checkRepeatLocation(newAppleX, newAppleY));
    
        this.setup.apple = new Apple(newAppleX, newAppleY)
    }

    checkRepeatLocation(newAppleX, newAppleY) {
        return this.setup.snake.body.some(tile => {
            return tile.x === newAppleX && tile.y === newAppleY;
        })
    }

    draw(xI, yI, color) {
        let x = xI * this.setup.unit
        let y = yI * this.setup.unit

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.setup.unit, y);
        this.ctx.lineTo(x + this.setup.unit, y + this.setup.unit);
        this.ctx.lineTo(x, y + this.setup.unit);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawSnake() {
        this.setup.snake.body.forEach(body => {
            this.draw(body.x, body.y, 'black')
        })
    }
    
}


class Snake {
    constructor(headX, headY) {
        this.body = [
            {
                x: headX,
                y: headY,
            }
        ]
        this.direction = '';
        this.decideDirection()
    }

    move() {
        if(!this.direction) return
        let headX = this.body[0].x
        let headY = this.body[0].y

        switch (this.direction) {
            case "ArrowUp":
                headY -= 1;
                break;
            case "ArrowDown":
                headY += 1;
                break;
            case "ArrowLeft":
                headX -= 1;
                break;
            case "ArrowRight":
                headX += 1;
                break;
        }
        
        
        this.body = [
            {
                x: headX,
                y: headY,
            },
            ...this.body
        ]

        this.body.pop()
        // console.log(this.body);
    }

    grow(x,y) {
        this.body.unshift({
            x: x,
            y: y 
        })
    }

    decideDirection() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if(this.direction === "ArrowDown" || this.direction === "ArrowUp") break;
                    this.direction = "ArrowUp";
                    break;
                case "ArrowDown":
                    if(this.direction === "ArrowUp" || this.direction === "ArrowDown") break;
                    this.direction = "ArrowDown";
                    break;
                case "ArrowLeft":
                    if(this.direction === "ArrowRight" || this.direction === "ArrowLeft") break;
                    this.direction = "ArrowLeft";
                    break;
                case "ArrowRight":
                    if(this.direction === "ArrowLeft" || this.direction === "ArrowRight") break;
                    this.direction = "ArrowRight";
                    break;
            }
        })
    }
}

class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let setup = {
    mapWidth: 15,
    mapHeight: 15,
    snake: new Snake(1,1),
    apple: new Apple(3,3),
    unit: 30,
    rate: 150
}

let game = new Game(setup, canvas)

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}