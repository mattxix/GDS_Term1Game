/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)


/*------------Declare Variables Here--------*/

//Declare WASD (Red) player and its visual properties/location
//Declare Arrows (Blue) player and its visual properties/location
//Declare friction and speed variables
//Declare array of enemies
//Declare number of enemies

//Loop through the number of enemies and create a new GameObject for the enemy, scattering them in different parts in the level


/*--------------main()------------------------
This is the function that makes the game work
---------------------------------------------*/

function main()
{
    //erases the screen
    ctx.clearRect(0,0,c.width,c.height); 

    //Draw the map walls using fillRect
    //Draw the gate using fillRect in the middle of the map
    
    //Check if a key is pressed and changed the player's velocity to the corresponding speed

    //For loop through all enemies
    //Enemy.move and Enemy.render
    //If the enemy x value is past a certain point, invert the velocity for both ways

    //Check of the player overlaps with the walls/gate, if they do send both of them back to the start

    //If the red player or blue player stands on (overlaps) their corresponding button, the gate will be open and be moved off screen
    //If they aren't overlapping, move the gate to the center of the screen
    //If both the players overlap with the exit, the game ends

    //If the player is coliding with an enemy, move both players back to the start and shut the gate

    //Player render and player move
}

//random number generator
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg)
{
    return _deg * Math.PI/180
}

//Converts radians to degrees
function degrees(_rad)
{
    return _rad * 180/Math.PI
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
