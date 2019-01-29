// useful to have them as global variables
var canvas, ctx, w, h; 
var mousePos;

// an empty array!
var balls = []; 
var globalSpeedMutiplier = 1;
var perdu = false;

var player = {
  x:10,
  y:10,
  width:50,
  height:50,
  color:'blue'
}

var bordInterdit = {
  x:Math.random()<0.5 ? 0 : 600,
  y:Math.random()<0.5 ? 0 : 600,
  width:600,
  height:30,
  color:'red'
}



window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;
  
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    // start game with 10 balls, balls to eat = red balls
    //startGame(1);
  
    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // ready to go !
    mainLoop();

};

window.onclick = processClick;

function processClick(evt) {
 startGame(1);
  
  evt.stopPropagation(); // try commenting it and click on the button or div
}


function startGame(nb) {
  finished = false;
  clearInterval(counter);
  count = 30;
  
    balls = createBalls(nb);
    
    
  
  // timer interval is every second (1000ms)
  setInterval(counter, 1000);

}


 

function changeBallSpeed(coef) {
    globalSpeedMutiplier = coef;
}

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
  if(mousePos !== undefined) {
    player.x = mousePos.x;
    player.y = mousePos.y;
  }
}
// how many seconds the game lasts for - default 30
var count = 30;
var finished = false;
var counter =function(){
 count=count-1; // countown by 1 every second
 
 // when count reaches 0 clear the timer and finish the game
   if (count <= 0)
   {
     // stop the timer
      clearInterval(counter);
      // set game to finished
      finished = true;
      perdu = false;
      count=0;
      
   }

   
}


function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);
  
  // draw the ball and the player
  drawFilledRectangle(player);
  drawFilledBord();
  drawAllBalls(balls);
  //drawBallNumbers(balls);

  // animate the ball that is bouncing all over the walls
  moveAllBalls(balls);
  
  movePlayerWithMouse();
  
  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
   var testX=cx;
   var testY=cy;
   if (testX < x0) testX=x0;
   if (testX > (x0+w0)) testX=(x0+w0);
   if (testY < y0) testY=y0;
   if (testY > (y0+h0)) testY=(y0+h0);
   return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

function createBalls(n) {
  // empty array
  var ballArray = [];
  
  // create n balls
  for(var i=0; i < n; i++) {
     var b = {
        x:w/2,
        y:h/2,
        radius: 35, // between 5 and 35
        speedX: -5 + 10 * Math.random(), // between -5 and + 5
        speedY: -5 + 10 * Math.random(), // between -5 and + 5
        color:"green",
      }
     // add ball b to the array
     ballArray.push(b);
    }
  // returns the array full of randomly created balls
  return ballArray;
}


function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
      drawFilledCircle(b);
    });

// Display time 
 ctx.fillStyle = "rgb(200, 200, 200)";
 ctx.font = "24px Helvetica";
 ctx.textAlign = "left";
 ctx.textBaseline = "top";
 ctx.fillText("Time: " + count, 50, 50);
 // Display game over message when timer finished
 if(finished==true && perdu == false){
   ctx.fillText("Bravo !!!", 220, 250);
   ctx.fillText("Vous avez empecher Macron de piquer votre argent !", 30, 280);
   ballArray.forEach(function(b) {
    b.speedX = 0;
    b.speedY =0;
  });
  if(finished==true && perdu == true){
    ctx.fillText("Game over!", 200, 220);
    ballArray.forEach(function(b) {
     b.speedX = 0;
     b.speedY =0;
   });
   
 }
}
}

function moveAllBalls(ballArray) {
  // iterate on all balls in array
  balls.forEach(function(b, index) {
      // b is the current ball in the array
      b.x += (b.speedX * globalSpeedMutiplier);
      b.y += (b.speedY * globalSpeedMutiplier);
      testCollisionBallWithBord(b);
      testCollisionBallWithWalls(b); 
    
      testCollisionWithPlayer(b, index);
      
  });
}

function testCollisionWithPlayer(b, index) {
  if (finished == false){
  if(circRectsOverlap(player.x , player.y,
                     player.width, player.height,
                     b.x, b.y, b.radius)) {
    
    b.speedY = -b.speedY;

    b.speedX = (b.x - (player.x + player.width/2)) * 0.05;

    bordInterdit.x=Math.random()<0.5 ? 0 : 600;
    bordInterdit.y=Math.random()<0.5 ? 0 : 600;
    
    drawFilledBord();
    
                     }

  }
}


 function testCollisionBallWithBord(b) {
  ctx.font="20px Arial";
    if (bordInterdit.x == 0 && bordInterdit.y == 0){
      if ((b.x - b.radius) <= (bordInterdit.x + bordInterdit.height)){
        perdu = true;
        ctx.fillText("Macron a piqué l'argent!", 200, 250);
        finished = true;
        b.speedX = 0;
        b.speedY = 0;
        clearInterval(counter);
        
      }
    }
    else if(bordInterdit.x == 600 && bordInterdit.y == 0){
      if ((b.y - b.radius) < (bordInterdit.y + bordInterdit.height )){
        perdu = true;
        ctx.fillText("Macron a piqué l'argent!", 200, 250);
        finished = true;
        b.speedX = 0;
        b.speedY = 0;
        clearInterval(counter);
        
      }
    }
    if(bordInterdit.x == 0 && bordInterdit.y == 600){
      if ((b.y + b.radius) > (bordInterdit.y - bordInterdit.height)){
        perdu = true;
        ctx.fillText("Macron a piqué l'argent!", 200, 250);
        finished = true;
        b.speedX = 0;
        b.speedY = 0;
        clearInterval(counter);
      }
      

    }

    else if(bordInterdit.x == 600 && bordInterdit.y == 600){
      if ((b.x + b.radius) > (bordInterdit.x - bordInterdit.height)){
        perdu = true;
        ctx.fillText("Macron a piqué l'argent!", 200, 250);
        finished = true;
        b.speedX = 0;
        b.speedY = 0;
        clearInterval(counter);
      }
        
    }
    
   
}
function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if((b.x + b.radius) > w) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = w - b.radius;
  } else if((b.x -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = b.radius;
  }
  
  // COLLISIONS WTH HORIZONTAL WALLS ?
  // Not in the else as the ball can touch both
  // vertical and horizontal walls in corners
  if((b.y + b.radius) > h) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.y = h - b.radius;
  } else if((b.y -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.Y = b.radius;
  }  
}

function drawFilledRectangle(r) {
    // GOOD practice: save the context, use 2D trasnformations
    var img = document.getElementById("image");
    
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(r.x, r.y);
  
    ctx.fillStyle = r.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.drawImage(img,0,0, r.width, r.height);  //draw gilet jaune
  
    // GOOD practice: restore the context
    ctx.restore();
}

function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    var image = document.getElementById("imagemac");
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);
  
    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image,-35,-35,70,70); //draw macron
    // GOOD practice: restore the context
    ctx.restore();

    }

function drawFilledBord() {
    // GOOD practice: save the context, use 2D trasnformations
    var img = document.getElementById("imagemoney");
    var img1 = document.getElementById("imagemoney1");
    
    ctx.save();
    
  
    // translate the coordinate system, draw relative to it
    ctx.translate(bordInterdit.x, bordInterdit.y);
  
    ctx.fillStyle = "white";
    // (0, 0) is the top left corner of the monster.
    if (bordInterdit.x == 0 && bordInterdit.y == 0){
        ctx.restore();
        ctx.fillRect(bordInterdit.x, bordInterdit.y, bordInterdit.height,bordInterdit.width);
        ctx.drawImage(img1,bordInterdit.x, bordInterdit.y, bordInterdit.height,bordInterdit.width);
        
        
    }
    else if(bordInterdit.x == 600 && bordInterdit.y == 0){
        ctx.restore();
        ctx.fillRect(bordInterdit.x, bordInterdit.y,-600,30);
        ctx.drawImage(img,bordInterdit.x, bordInterdit.y,-600,30);
    }
    else if(bordInterdit.x == 0 && bordInterdit.y == 600){
        ctx.restore();
        ctx.fillRect(bordInterdit.x, bordInterdit.y-30,600,30);
        ctx.drawImage(img,bordInterdit.x, bordInterdit.y-30,600,30);
    }

    else if(bordInterdit.x == 600 && bordInterdit.y == 600){
        ctx.restore();
        ctx.fillRect(bordInterdit.x-30, bordInterdit.y,30,-600);
        ctx.drawImage(img1,bordInterdit.x-30, bordInterdit.y,30,-600);
    }
    
  
    // GOOD practice: restore the context
    ctx.restore();
}

