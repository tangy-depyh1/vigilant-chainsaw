const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const fon = new Image();
fon.src = "../img/game/fon.png";

const foodImg = new Image();
foodImg.src = "../img/game/mouse.png";


let snakeHead = new Image();
snakeHead.src = "../img/game/head_right.png";

let snakeEndGorizontalLeft = new Image();
snakeEndGorizontalLeft.src = "../img/game/Body_end_gorizontal_left.png";

let snakeEndGorizontalRight = new Image();
snakeEndGorizontalRight.src = "../img/game/Body_end_gorizontal_right.png";

let BodyEndVerticB = new Image();
BodyEndVerticB.src = "../img/game/Body_end_vertic_B.png";

let BodyEndVerticT = new Image();
BodyEndVerticT.src = "../img/game/Body_end_vertic_T.png";

let BodyVertic = new Image();
BodyVertic.src = "../img/game/Body_vertic.png";

let BodyGorizontal = new Image();
BodyGorizontal.src = "../img/game/Body_gorizontal.png";

let BodyLB = new Image();
BodyLB.src = "../img/game/Body_L_B.png";

let BodyLT = new Image();
BodyLT.src = "../img/game/Body_L_T.png";

let BodyRB = new Image();
BodyRB.src = "../img/game/Body_R_B.png";

let BodyRT = new Image();
BodyRT.src = "../img/game/Body_R_T.png";

let Stone = new Image();
Stone.src = "../img/game/stone.png";

let fonLose = new Image();
fonLose.src = "../img/game/fonLose.png";
let fonWin = new Image();
fonWin.src = "../img/game/fonWin.png";



let respawnFood = () => {
    food = {
        x: Math.floor((Math.random() * 12)) * box,
        y: Math.floor((Math.random() * 12 + 1)) * box
    }
}
let params = 0
const box = 72;
let score = 0;
let food = {

    x: Math.floor((Math.random() * 12)) * box,
    y: Math.floor((Math.random() * 12 + 1)) * box,

}

let snake = [];
snake[0] = {
    x: 6 * box,
    y: 7 * box,
}
snake[1] = {
    x: 5 * box,
    y: 7 * box,
}
let AreSpawnStone = false;

document.addEventListener('keydown', direction);

let dir = "space";
function direction(event) {
    if ((event.keyCode == 65 || event.keyCode == 37) && dir != "right") {
        dir = "left";

    }
    else if ((event.keyCode === 87 || event.keyCode == 38) && dir != "down") {
        dir = "up";
    }
    else if ((event.keyCode == 68 || event.keyCode == 39) && dir != "left") {
        dir = "right";
    }
    else if ((event.keyCode === 83 || event.keyCode == 40) && dir != "up") {
        dir = "down";
    }
    else if (event.keyCode === 32) {
        dir = "space";
    }


}
const areSnakeTurn = () => {
    if (dir === "left")
        snakeHead.src = "../img/game/head_left.png";
    else if (dir === "right")
        snakeHead.src = "../img/game/head_right.png";
    else if (dir === "up")
        snakeHead.src = "../img/game/head_top.png";
    else if (dir === "down")
        snakeHead.src = "../img/game/head_bottom.png";
}
let stone = [
    {
        x: 3 * box,
        y: 5 * box,
    },
    {
        x: 4 * box,
        y: 5 * box,
    },
    {
        x: 5 * box,
        y: 5 * box,
    },
    {
        x: 6 * box,
        y: 5 * box,
    },
    {
        x: 7 * box,
        y: 5 * box,
    },
    {
        x: 8 * box,
        y: 5 * box,
    },
    {
        x: 9 * box,
        y: 5 * box,
    },
    {
        x: 10 * box,
        y: 5 * box,
    },
    {
        x: 11 * box,
        y: 5 * box,
    },
];

const spawnStoneInMap = () => {
    stone.forEach((element, index) => {
            stone[index].x = Math.floor((Math.random() * 12)) * box,
            stone[index].y = Math.floor((Math.random() * 12 + 1)) * box
        if (stone[index].x >= 4 * box && stone[index].x <= 7 * box && stone[index].y <= 8 * box && stone[index].y >= 6 * box) {
                stone[index].x = Math.floor((Math.random() * 12)) * box,
                stone[index].y = Math.floor((Math.random() * 12 + 1)) * box
            spawnStoneInMap();
            console.debug(`index :${index}, x:${stone[index].x}, y:${stone[index].y}`);
        }

    })
}
const resetSnake = () => {
    snake = [];
    snake[0] = {
        x: 6 * box,
        y: 7 * box,
    }
    snake[1] = {
        x: 5 * box,
        y: 7 * box,
    }
    snakeHead.src = "../img/game/head_right.png";
}
let movies = (i) => {

    if (snake[i].x === snake[i - 1].x && snake.indexOf(snake[i + 1]) !== -1 && snake[i + 1].y !== snake[i].y && i !== snake.length)
        ctx.drawImage(BodyVertic, snake[i].x, snake[i].y);

    if (snake[i].y === snake[i - 1].y && snake.indexOf(snake[i + 1]) !== -1 && snake[i + 1].x !== snake[i].x && i !== snake.length)
        ctx.drawImage(BodyGorizontal, snake[i].x, snake[i].y);


    //////////////////////////////// LEFT TO TOP //////////////////////////////////
    if (snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x === snake[i - 1].x
            && snake[i].y > snake[i - 1].y)
        && (snake[i].x > snake[i + 1].x
            && snake[i].y === snake[i + 1].y)
        ||
        snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x > snake[i - 1].x
            && snake[i].y === snake[i - 1].y)
        && (snake[i].x === snake[i + 1].x
            && snake[i].y > snake[i + 1].y)

    )
        ctx.drawImage(BodyLT, snake[i].x, snake[i].y);


    //////////////////////////////// RIGHT TO TOP  ////////////////////////////////
    if (snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x === snake[i - 1].x
            && snake[i].y > snake[i - 1].y)
        && (snake[i].x < snake[i + 1].x
            && snake[i].y === snake[i + 1].y)
        ||
        snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x < snake[i - 1].x
            && snake[i].y === snake[i - 1].y)
        && (snake[i].x === snake[i + 1].x
            && snake[i].y > snake[i + 1].y)
    )
        ctx.drawImage(BodyRT, snake[i].x, snake[i].y);



    ////////////////////////////// LEFT TO BOTTOM //////////////////////////////////
    if (snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x === snake[i - 1].x
            && snake[i].y < snake[i - 1].y)
        && (snake[i].x > snake[i + 1].x
            && snake[i].y === snake[i + 1].y)
        ||
        snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x > snake[i - 1].x
            && snake[i].y === snake[i - 1].y)
        && (snake[i].x === snake[i + 1].x
            && snake[i].y < snake[i + 1].y)
    )
        ctx.drawImage(BodyLB, snake[i].x, snake[i].y);



    ////////////////////////////////RIGHT TO BOTTOB //////////////////////////////////////////////////////////////////
    if (snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x === snake[i - 1].x
            && snake[i].y < snake[i - 1].y)
        && (snake[i].x < snake[i + 1].x
            && snake[i].y === snake[i + 1].y)
        ||
        snake.indexOf(snake[i + 1]) != -1
        && (snake[i].x < snake[i - 1].x
            && snake[i].y === snake[i - 1].y)
        && (snake[i].x === snake[i + 1].x
            && snake[i].y < snake[i + 1].y)
    )
        ctx.drawImage(BodyRB, snake[i].x, snake[i].y);

}
let moviesBodyEnd = (i) => {
    //////////////////// END TOP //////////////////
    if (snake[i].x === snake[i - 1].x
        && snake[i].y > snake[i - 1].y)
        ctx.drawImage(BodyEndVerticT, snake[i].x, snake[i].y)

    //////////////////// END BOTTOM //////////////////
    if (snake[i].x === snake[i - 1].x
        && snake[i].y < snake[i - 1].y)
        ctx.drawImage(BodyEndVerticB, snake[i].x, snake[i].y)

    //////////////////// END RIGHT //////////////////
    if (snake[i].x < snake[i - 1].x
        && snake[i].y === snake[i - 1].y)
        ctx.drawImage(snakeEndGorizontalRight, snake[i].x, snake[i].y)

    //////////////////// END RIGHT //////////////////
    if (snake[i].x > snake[i - 1].x
        && snake[i].y === snake[i - 1].y)
        ctx.drawImage(snakeEndGorizontalLeft, snake[i].x, snake[i].y)

}
const ifSnakeCrash = () => {
    snake.forEach((element, i) => {
        if ((0 > snake[i].x) || (12 * box < snake[i].x) || (12 * box < snake[i].y) || (snake[i].y < 71)) {
            resetSnake()
            params = -1
        }
        if (i !== 0 && i > 2 && snake[i].x !== undefined) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y && dir !== undefined) {
                params = -1
                resetSnake();
            }
        }
        //  Проверка на врезание с камнем
        stone.forEach((element, index) => {
            if (snake[i].x === stone[index].x && snake[i].y === stone[index].y) {
                resetSnake();
                params = -1;
            }
        })
    })
}
const ifSnakeWeryBig = () => {
    if (score > 130) {
        params = 1;
        resetSnake();
    }
}
let textScores = () => {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, 1.6 * box, box / 1.3);

}
let Win = () => {
    ctx.drawImage(fonWin, 0, 0);

    // Создаем линейный градиент
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#9A5F01'); // Начальный цвет
    gradient.addColorStop(1, '#FF9E01'); // Конечный цвет
    ctx.font = "30px Montserrat Bold";
    ctx.fillStyle = gradient;
    // Рисуем черную окантовку текста
    ctx.strokeStyle = 'black'; // Цвет окантовки
    ctx.lineWidth = 6; // Толщина окантовки
    ctx.strokeText(score, 420, 766); // Рисуем окантовку
    ctx.fillText(score, 420, 766);
}
let Lose = () => {
    ctx.drawImage(fonLose, 0, 0);


    // Создаем линейный градиент
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#9A5F01'); // Начальный цвет
    gradient.addColorStop(1, '#FF9E01'); // Конечный цвет
    ctx.font = "30px Montserrat Bold";
    ctx.fillStyle = gradient;
    // Рисуем черную окантовку текста
    ctx.strokeStyle = 'black'; // Цвет окантовки
    ctx.lineWidth = 6; // Толщина окантовки
    ctx.strokeText(score, 420, 766); // Рисуем окантовку
    ctx.fillText(score, 420, 766);
}

const drawGame = () => {

    ctx.drawImage(fon, 0, 0);

    stone.forEach((element, i) => {
        ctx.drawImage(Stone, stone[i].x, stone[i].y);
    })

    ctx.drawImage(foodImg, food.x, food.y);

    snake.forEach((element, i) => {
        if (i === 0)
            ctx.drawImage(snakeHead, snake[i].x, snake[i].y);

        else if (i !== 0 && i !== snake.length - 1) {
            movies(i);
        }
        else {
            moviesBodyEnd(i);
        }
    });

    textScores()

    if (AreSpawnStone === false) {
        spawnStoneInMap();
        AreSpawnStone = true;
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        respawnFood();
        snake.forEach((val, index) => {
            stone.forEach((element, i) => {
                if (snake[index].x === food.x && snake[index].y === food.y || (stone[i].x === food.x && stone[i].y === food.y))
                    respawnFood();
            })
        })
    } else {
        snake.forEach((val, index) => {
            stone.forEach((element, i) => {
                if (snake[index].x === food.x && snake[index].y === food.y || (stone[i].x === food.x && stone[i].y === food.y))
                    respawnFood();
            })
        })
        if (dir !== "space")
            snake.pop();
    }

    if (dir === "left") snakeX -= box;
    if (dir === "right") snakeX += box;
    if (dir === "up") snakeY -= box;
    if (dir === "down") snakeY += box;



    areSnakeTurn()
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (dir !== "space")
        snake.unshift(newHead);

    ifSnakeCrash();
    ifSnakeWeryBig();
    if (dir === "space") {
        // AreSpawnStone = false;
        resetSnake();
        params = 0
        score = 0;
    }
    if (params === -1)
        Lose()

    if (params === 1)
        Win()
}



setInterval(drawGame, 200);

