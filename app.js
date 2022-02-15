const body = document.querySelector('body')

document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    
    let x = 30 // x起始
    let y = 30 // y起始
    let length = 3;
    let direction = null;


    let timer;


    if (canvas.getContext) {
        for(let i = 0; i < length; i++) {

            createSnake(ctx, x - 10 * i, y)
        }
        
    }

    createApple(ctx)
    
    


    document.addEventListener('keydown', decideDirection)

    function decideDirection(e) {
        const code = e.code
        clearInterval(timer)

        switch (code) {
            case "ArrowUp":
                console.log('up');

                direction = "ArrowUp"
                break;
            case "ArrowDown":
                console.log('down');
                direction = "ArrowDown"
                break;
            case "ArrowLeft":
                console.log('left');
                direction = "ArrowLeft"
                break;
            case "ArrowRight":
                console.log('right');
                direction = "ArrowRight"
                break;
        }

        timer = setInterval(()=> {
            move(direction)
        }, 150)
    }

    

    function move(direction) {
        let lastX = x;
        let lastY = y

        switch (direction) {
            case "ArrowUp":
                console.log('up');

                y -= 10
                ctx.clearRect(0,0,100,100);

                

                for(let i = 0; i < length; i++) {
                    createSnake(ctx, lastX, lastY)

                    lastY -= 10
                }
                
                createApple(ctx)
                break;
            case "ArrowDown":
                console.log('down');

                y += 10

                ctx.clearRect(0,0,100,100);
                

                for(let i = 0; i < length; i++) {
                    createSnake(ctx, lastX, lastY)

                    lastY -= 10

                }

                createApple(ctx)
                break;
            case "ArrowLeft":
                console.log('left');
                x -= 10
                ctx.clearRect(0,0,500,500);
                

                for(let i = 0; i < length; i++) {
                    createSnake(ctx, lastX, lastY)

                    lastX -= 10;

                }

                createApple(ctx)
                break;
            case "ArrowRight":
                console.log('right');

                x += 10

                ctx.clearRect(0,0,500,500);
                

                for(let i = 0; i < length; i++) {
                    createSnake(ctx, lastX, lastY)

                    lastX += 10;
                }
                
                createApple(ctx)

                break;
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


function createApple(ctx) {
    ctx.beginPath();
    ctx.moveTo(70,70);
    ctx.lineTo(80, 70);
    ctx.lineTo(80, 80);
    ctx.lineTo(70, 80);
    ctx.fillStyle = 'red'
    ctx.fill();
}





