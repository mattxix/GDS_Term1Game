/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000 / 60
var timer = setInterval(main, fps)

ctx.font = "20pt Arial"
ctx.fillStyle = "#32dae6"
ctx.textAlign = "center"

/*------------Declare Variables Here--------*/

//Declare WASD (Red) player and its visual properties/location
//Declare Arrows (Blue) player and its visual properties/location

const images = {
    "redSquare" : document.getElementById("redSquare"),
    "redButton" : document.getElementById("redButton"),
    "blueSquare" : document.getElementById("blueSquare"),
    "blueButton" : document.getElementById("blueButton"),
    "gate" : document.getElementById("gate"),
    "finish" : document.getElementById("finish"),
    "enemy" : document.getElementById("enemy"),
    "background" : document.getElementById("background"),
}

var redSquare = document.getElementById("redSquare")

var playerOne = new GameObject();
playerOne.color = "red"
playerOne.w = 20
playerOne.h = 20


var playerTwo = new GameObject();
playerTwo.color = "blue"
playerTwo.w = 20
playerTwo.h = 20

var buttonOne = new GameObject();
buttonOne.color = "#ff4747"
buttonOne.w = 30
buttonOne.h = 30
buttonOne.x = 275
buttonOne.y = 125

var buttonTwo = new GameObject();
buttonTwo.color = "#3659c9"
buttonTwo.w = 30
buttonTwo.h = 30
buttonTwo.x = 525
buttonTwo.y = 375

var gate = new GameObject();
gate.color = "black"
gate.w = 25
gate.h = 250
gate.x = 375
gate.y = c.height/2

var end = new GameObject();
end.color = "lime"
end.w = 50
end.h = 100
end.x = 725;

function restartPlayers() {
    playerOne.vx = 0;
    playerOne.vx = 0;
    playerTwo.vy = 0;
    playerTwo.vx = 0;
    playerOne.x = 100
    playerOne.y = 380
    playerTwo.x = 130
    playerTwo.y = 380
}

restartPlayers()

//Declare friction and speed variables
var playerSpeed = 8;
var enemySpeed = 3;

//Declare array of enemies
//Declare number of enemies
var numEnemies = 5;
var enemies = [];

//Loop through the number of enemies and create a new GameObject for the enemy, scattering them in different parts in the level

for (let i = 0; i < numEnemies; i++) {
    let enemy = new GameObject();
    enemies[i] = enemy;
    enemy.color = "orange"
    enemy.x = 220 + (i * 102);
    enemy.y = c.height / 2
    enemy.w = 20;
    enemy.h = 20;
    enemy.vy = enemySpeed;
    if (i % 2 == 0) {
        enemy.vy *= -1
    }
}



var wallsData = [
    {
        "width": c.width,
        "height": 100,
        "x": c.width / 2,
        "y": 100 / 2,
    },
    {
        "width": c.width,
        "height": 100,
        "x": c.width / 2,
        "y": c.height - 100 / 2,
    },
    {
        "width": 50,
        "height": c.height,
        "x": 25,
        "y": c.height / 2,
    },
    {
        "width": 50,
        "height": c.height,
        "x": c.width - 25,
        "y": c.height / 2,
    },

    {
        "width": 200,
        "height": 50,
        "x": 150,
        "y": 125,
    },

    {
        "width": 450,
        "height": 50,
        "x": 525,
        "y": 125,
    },

    {
        "width": 300,
        "height": 50,
        "x": 350,
        "y": 375,
    },

    {
        "width": 250,
        "height": 50,
        "x": 675,
        "y": 375,
    },

]

var walls = []

for (let i = 0; i < wallsData.length; i++) {
    walls[i] = new GameObject();
    let wall = walls[i]
    let data = wallsData[i]
    wall.x = data.x
    wall.y = data.y
    wall.w = data.width
    wall.h = data.height
    wall.color = "#2b2b2b"
    console.log(data)
}

console.log(walls)

/*--------------main()------------------------
This is the function that makes the game work
---------------------------------------------*/



function main() {
    //erases the screen
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(images.background, 0, 0, c.width, c.height)

    
    //Check if a key is pressed and changed the player's velocity to the corresponding speed
    getVelocity();


    //Check of the player overlaps with the walls/gate, if they do send both of them back to the start
    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i]
        //Draw the map walls using fillRect
        wall.render();
        if (playerOne.overlaps(wall) || playerTwo.overlaps(wall)) {
            restartPlayers()
        }
    }

    if (playerOne.overlaps(gate) || playerTwo.overlaps(gate)) {
        restartPlayers();
    }

    buttonOne.renderImage(images.redButton);
    buttonTwo.renderImage(images.blueButton);

    //If the red player or blue player stands on (overlaps) their corresponding button, the gate will be open and be moved off screen
    if (playerOne.overlaps(buttonOne) || playerTwo.overlaps(buttonTwo)) {
        gate.y = 500
    } else {
        gate.y = c.height / 2
    }
    //Draw the gate using fillRect in the middle of the map
    gate.renderImage(images.gate);


    //If both the players overlap with the exit, the game ends
    end.renderImage(images.finish);
    if (playerOne.overlaps(end) && playerTwo.overlaps(end)) {
        ctx.fillText("You Win!", c.width / 2, 50, 800)
    } else {
        ctx.fillText("Use WASD to control red, Arrow keys to control blue.", c.width / 2, 50, 800)
    }


    //If they aren't overlapping, move the gate to the center of the screen


    //For loop through all enemies
    //Enemy.move and Enemy.render
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i]
        enemy.move();
        enemy.renderImage(images.enemy);

        //If the enemy y value is past a certain point, invert the velocity for both ways
        if (enemy.y > 340) {
            enemy.vy *= -1;
        }
        if (enemy.y < 160) {
            enemy.vy *= -1;
        }
        //If the player is coliding with an enemy, move both players back to the start and shut the gate

        if (playerOne.overlaps(enemy) || playerTwo.overlaps(enemy)) {
            restartPlayers()
        }
    }



    //Player render and player move
    playerOne.move();
    playerTwo.move();
    playerOne.renderImage(images.redSquare);
    playerTwo.render(images.blueSquare);
}

function getVelocity() {
    if (a == true) {
        playerOne.vx = -playerSpeed;
    }
    if (d == true) {
        playerOne.vx = playerSpeed;
    }
    if (w == true) {
        playerOne.vy = -playerSpeed;
    }
    if (s == true) {
        playerOne.vy = playerSpeed;
    }

    playerOne.vx *= playerOne.friction;
    playerOne.vy *= playerOne.friction;

    if (left == true) {
        playerTwo.vx = -playerSpeed;
    }
    if (right == true) {
        playerTwo.vx = playerSpeed;
    }
    if (up == true) {
        playerTwo.vy = -playerSpeed;
    }
    if (down == true) {
        playerTwo.vy = playerSpeed;
    }

    playerTwo.vx *= playerTwo.friction;
    playerTwo.vy *= playerTwo.friction;
}

//random number generator
function rand(_low, _high) {
    return Math.random() * (_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg) {
    return _deg * Math.PI / 180;
}

//Converts radians to degrees
function degrees(_rad) {
    return _rad * 180 / Math.PI
}

/*-------Diagram--------

               /|        c = the hypoteneuse
            c / |        b = height
             /  | b      a = width
            /   |        T = arch tangent angle
           /T___|
             a

--------------------------

To get a and b (displacement) when you know two points
  
    a = destination.x - starting.x
    b = destination.y - starting.y

To get the total distance (hypotenuese) between two points
    c = Math.sqrt(_a*_a + _b*_b)

To get the arc tangent angle (labeled T in the diagram)
    radians = Math.atan2(b, a)

To find a and b if you know c and T
    a = Math.cos(T) * c
    b = Math.sin(T) * c

*/
